import dbConnect from "../../utils/dbConnect"
import Ipsauce from "../../models/Ipsauces"

dbConnect();

export default async function candidates(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            let candidates = await Ipsauce.find();
            res.status(200).json({ candidates: candidates });
            break;
        case 'PUT':
            try {
                let candidate = await Ipsauce.findOne({ candidate: req.body.id });
                let factor = !!req.body.positivity ? 1 : -1;
                candidate.vote += (1 * factor);

                await candidate.save();
                res.status(200).json({ message: "success" });
            }
            catch (e) {
                res.status(400).json({ message: "L'opération a échoué" })
            };
            break;
        case 'POST':
            try {
                let candidate = await Ipsauce.findOne({ candidate: req.body.id });

                candidate.vote += req.body.numberVotes;

                await candidate.save();
                res.status(200).json({ message: "success" });
            }
            catch (e) {
                res.status(400).json({ message: "L'opération a échoué" })
            };
            break;
        default:
            res.status(404).json({ message: "failed" })
    }

}
