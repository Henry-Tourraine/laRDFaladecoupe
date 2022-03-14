//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract Elections2022 {
    event Bribe(uint256 amount);

    struct President {
        uint256 index;
        uint256 votes;
    }

    struct Articles {
        uint256 id;
        bool sentiment;
        uint256 date;
        Elections2022.candidates candidate;
    }

    struct influenceRecord {
        uint256 judge;
        uint256 nudge;
        candidates candidate;
    }

    struct VoterEdited {
        bool _sentiment;
        uint256 date;
        candidates _candidate;
    }

    enum candidates {
        JADOT,
        POUTOU,
        PHILIPPOT,
        MELENCHON,
        TAUBIRAT,
        LE_PEN,
        ASSELINEAU,
        HIDALGO,
        PECRESSE,
        MACRON,
        ZEMMOUR,
        LEBLANC
    }

    uint256 constant MIN_PRICE_VOTE = 7;
    uint256 constant MIN_PRICE_BRIBE = MIN_PRICE_VOTE * 2;
    uint256 constant MIN_PRICE_ARTICLE = 3;
    uint256 ARTICLE_ID = 0;
    uint256 ELECTION_DAY = 1650751201;
    uint256 DAY_AFTER = 1650837600;
    uint256 public TOKEN = 1;
    uint256 FLOATING = 10**18;
    bool internal lock = false;
    President CHOSENONE = President(0, 0);
    Articles[] articlesList;

    mapping(candidates => uint256) public TotalVotesPerCandidates;
    mapping(address => mapping(candidates => uint256)) public VoterToCandidate;
    mapping(candidates => mapping(address => uint256)) CandidateToVoter;
    mapping(uint256 => mapping(candidates => int256)) Judges;
    mapping(address => VoterEdited[]) VoterToArticle;
    mapping(address => influenceRecord[]) WhoInfluenced;

    address payable private owner;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier BeforeElection() {
        require(block.timestamp <= ELECTION_DAY, "It's too late");
        _;
    }
    modifier ElectionDay() {
        require(block.timestamp >= ELECTION_DAY, "Wait until april the 24th ");
        _;
    }

    modifier ElectionAfter() {
        require(
            block.timestamp >= DAY_AFTER,
            "Wait until the president get elected !"
        );
        _;
    }

    function mulUnSigned(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function BalanceOf() public view returns (uint256) {
        require(msg.sender == owner, "Wait for the elections");
        return address(this).balance;
    }

    function Vote(candidates _candidate, uint256 _number)
        external
        payable
        BeforeElection
    {
        require(
            msg.value >= mulUnSigned(MIN_PRICE_VOTE, _number),
            "not enough fund"
        );
        TotalVotesPerCandidates[_candidate] += _number;
        VoterToCandidate[msg.sender][_candidate] += _number;

        CandidateToVoter[_candidate][msg.sender] += 1;
    }

    function GetVotesPerVoter(candidates _candidate)
        public
        view
        returns (uint256)
    {
        return VoterToCandidate[msg.sender][_candidate];
    }

    function GetVotesPerCandidate(candidates _candidate)
        public
        view
        returns (uint256)
    {
        return TotalVotesPerCandidates[_candidate];
    }

    function editArticle(bool _sentiment, candidates _candidate)
        external
        payable
        BeforeElection
    {
        require(msg.value >= MIN_PRICE_ARTICLE, "not enough fund");
        articlesList.push(
            Articles(ARTICLE_ID, _sentiment, block.timestamp, _candidate)
        );
        VoterToArticle[msg.sender].push(
            VoterEdited(_sentiment, block.timestamp, _candidate)
        );
        ARTICLE_ID++;
    }

    // update sql database after
    function getArticles() public view returns (Articles[] memory) {
        //----> registers number of views
        return articlesList;
    }

    function getWhoEdited() public view returns (VoterEdited[] memory) {
        return VoterToArticle[msg.sender];
    }

    function getInfluence() public view returns (influenceRecord[] memory) {
        return WhoInfluenced[msg.sender];
    }

    function influence(
        uint256 _judge,
        candidates _candidate,
        bool _nudge
    ) external payable BeforeElection {
        require(
            msg.value / FLOATING >= mulUnSigned(MIN_PRICE_BRIBE, _judge),
            "not enough"
        );
        require(_judge < 10, "This judge doesn't exist");
        require(_judge > 0, "This judge doesn't exist");

        uint256 newNudge = uint256(msg.value / FLOATING) / MIN_PRICE_BRIBE;
        if (_nudge == false) {
            require(
                TotalVotesPerCandidates[_candidate] >=
                    mulUnSigned(newNudge, _judge),
                "Le candidat a trop peu de voix"
            );
            Judges[_judge][_candidate] -= int256(mulUnSigned(newNudge, _judge));
            TotalVotesPerCandidates[_candidate] -= mulUnSigned(
                newNudge,
                _judge
            );

            WhoInfluenced[msg.sender].push(
                influenceRecord(_judge, newNudge, _candidate)
            );
        } else {
            emit Bribe(newNudge);

            WhoInfluenced[msg.sender].push(
                influenceRecord(_judge, newNudge, _candidate)
            );
            Judges[_judge][_candidate] -= int256(mulUnSigned(newNudge, _judge));
            TotalVotesPerCandidates[_candidate] += mulUnSigned(
                newNudge,
                _judge
            );
        }
    }

    function presidentElected() public payable ElectionDay {
        require(msg.sender == owner, "you will have to wait !");
        require(CHOSENONE.votes == 0, "Already elected");

        owner.transfer(uint256(address(this).balance / 5));

        for (uint256 i = 0; i < 11; i++) {
            if (TotalVotesPerCandidates[candidates(i)] > CHOSENONE.votes) {
                CHOSENONE.index = i;
                CHOSENONE.votes = TotalVotesPerCandidates[candidates(i)];
            }
        }
        TOKEN = uint256(
            address(this).balance /
                uint256(TotalVotesPerCandidates[candidates(CHOSENONE.index)])
        );
    }

    function getPresident() public view returns (President memory) {
        return CHOSENONE;
    }

    function howManyDoIget() public view ElectionAfter returns (uint256) {
        return VoterToCandidate[msg.sender][candidates(CHOSENONE.index)];
    }

    function withdrawToken(address payable _to, uint256 _amount)
        external
        ElectionAfter
    {
        require(VoterToCandidate[msg.sender][candidates(CHOSENONE.index)] > 0);
        require(_amount > 0, "withdraw more !");
        require(
            _amount <=
                VoterToCandidate[msg.sender][candidates(CHOSENONE.index)],
            "You don't have enough tokens"
        );
        require(!lock, "No reentrancy");
        lock = true;
        VoterToCandidate[msg.sender][candidates(CHOSENONE.index)] -= _amount;

        (bool sent, ) = _to.call{value: mulUnSigned(_amount, TOKEN)}("");
        require(sent, "Operation didn't succeed");
        lock = false;
    }

    //if users can't withdraw, owner will be able to  withdraw to manually refund users from 1st may 2022
    function help(address user) external payable {
        require(block.timestamp > 1651356000, "Wait for users to withdraw");
        require(msg.sender == owner, "You're not the owner");
        (bool success, ) = owner.call{
            value: mulUnSigned(
                VoterToCandidate[user][candidates(CHOSENONE.index)],
                TOKEN
            )
        }("");
        require(success == true, "operation failed");
    }

    receive() external payable {}
}
