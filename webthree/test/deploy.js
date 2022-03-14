const { expect } = require("chai");
const { ethers } = require("hardhat");


let candidates = ["JADOT", "POUTOU", "PHILIPPOT", "MELENCHON", "TAUBIRAT", "LE_PEN", "ASSELINEAU", "HIDALGO", "PECRESSE", "MACRON", "ZEMMOUR", "LEBLANC"]

describe("Elections", async function () {
  it("check that voters paid for voting", async function () {
    const Elections = await ethers.getContractFactory("Elections2022");
    const elections = await Elections.deploy();
    await elections.deployed();
    const [owner, addr1, addr2, addr3, addr4, addr5, addr6] = await ethers.getSigners();



    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST VOTES");
    for (voter of [owner, addr1, addr2, addr3, addr4, addr5, addr6]) {
      for (i = 0; i < 12; i++) {
        let number_votes = Math.floor(Math.random() * 2 + 1);
        let votesBefore = await elections.provider.getBalance(voter.address);
        let v = ethers.utils.parseEther(String(7 * number_votes)).toString();
        console.log("Before : ", votesBefore);
        let tr = await elections.connect(voter).Vote(i, number_votes, { value: v });
        //console.log("transaction : ", tr);
        let fees = ethers.BigNumber.from(tr.gasPrice).mul(tr.gasLimit);
        let votesAfter = await elections.provider.getBalance(voter.address);
        console.log("After : ", votesAfter);
        let votesAfterCalculated = ethers.BigNumber.from(votesBefore).sub(v).sub(fees)
        console.log("Voted : ", votesAfterCalculated);
      }
      console.log("Funds : ", await elections.provider.getBalance(voter.address));
    }
    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST CHECK VOTES PER CANDIDATES");

    await Promise.all(
      candidates.map(async (e, index) => {
        return e + " : " + await elections.TotalVotesPerCandidates(index)
      })
    ).then(e => {
      console.log(e)
    });
    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST CHECK VOTES PER VOTER");

    await Promise.all(
      [owner, addr1, addr2, addr3, addr4, addr5, addr6].map(async e => {
        return candidates.map(async (c, inde) => {
          return e + " a voté : " + await elections.connect(e).GetVotesPerVoter(inde) + " fois pour " + c
        })
      })
    ).then(e => {
      console.log("votes per voters", e)
    });
    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST EDIT ARTICLES");
    for (i = 0; i < 5; i++) {

      let el = await elections.connect([owner, addr1, addr2, addr3, addr4, addr5, addr6][Math.floor(Math.random() * 6)]).editArticle(Math.random() > 0.5 ? 1 : 0, i, { value: ethers.utils.parseEther(String(3)).toString() });
      console.log(el)
    }

    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST GET ARTICLES");
    await elections.getArticles().then(e => console.log(e));


    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST WHO EDITED");
    await Promise.all(
      [owner, addr1, addr2, addr3, addr4, addr5, addr6].map(async (e, index) => {
        let edited = await elections.connect(e).getWhoEdited()
        if (edited.length > 0) {
          console.log("address " + e.address + " edited " + edited);
        }

      }))


    console.log("Total " + await elections.TotalVotesPerCandidates(3));

    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST BRIBE");
    for (i = 0; i < 3; i++) {

      let judge = Math.floor(Math.random() * 7.9) + 1;
      let cand = Math.floor(Math.random() * 12);
      console.log(candidates[cand] + " : " + await elections.TotalVotesPerCandidates(cand));
      let bribers = [owner, addr1, addr2, addr3, addr4, addr5, addr6];
      let briber = bribers[Math.floor(Math.random() * 5)];
      let inf = await elections.connect(briber).influence(judge, cand, 1, { value: ethers.utils.parseEther(String(judge * 7)).toString() });
      let rec = await inf.wait();
      console.log(rec.events[0].args);
      //await elections.WhoInfluenced(owner.address);
      console.log(briber.address + " corrupted in favor " + candidates[cand] + ": judge :" + judge + " : " + await elections.TotalVotesPerCandidates(cand));
    }
    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST WHO BRIBES");

    [owner, addr1, addr2, addr3, addr4, addr5, addr6].map(async (e, index) => {
      console.log(e.address)
      let cor = await elections.connect(e).getInfluence();
      if (cor > 0) {
        console.log(e.address + " a soudoyé " + cor)
      }

    })
    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST PRESIDENT");

    let totalBalance = String(await elections.connect(owner).BalanceOf());
    console.log(totalBalance);
    console.log("OWNER :", await elections.provider.getBalance(owner.address));

    await elections.connect(owner).presidentElected({ value: String(parseInt(totalBalance / 5)) });

    console.log("OWNER :", await elections.provider.getBalance(owner.address));
    await elections.getPresident().then(e => console.log(candidates[e.index] + " avec " + e.votes + " votes"));


    console.log("montant: " + totalBalance);
    console.log("montant du token: " + await elections.TOKEN());

    console.log("---------------------------------------------------------------------------------------------");
    console.log("TEST WITHDRAW");
    await Promise.all([owner, addr1, addr2, addr3, addr4, addr5, addr6].map(async (e, index) => {
      let amount = await elections.connect(e).howManyDoIget();

      console.log("amount :", amount);
      let token = await elections.TOKEN();
      console.log("test", ethers.BigNumber.from(amount).gt(0));
      if (ethers.BigNumber.from(amount).gt(0)) {
        console.log(e.address + " balance before ", await elections.provider.getBalance(e.address));
        let tr = await elections.connect(e).withdrawToken(e.address, ethers.BigNumber.from(amount).toString())
        console.log(e.address + " balance after ", await elections.provider.getBalance(e.address));
        //console.log("transaction", tr);
      }
    }))
  });
});
