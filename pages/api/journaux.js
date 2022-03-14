import dbConnect from "../../utils/dbConnect"
import Article from "../../models/Articles"

dbConnect();

export default async function journaux(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                let journaux = await Article.find();
                res.status(200).json({ message: "success", journaux: journaux });
                break;

            }
            catch (e) {
                res.status(400).json({ message: "error" })
                break;
            }
        case 'PUT':
            try {
                let article = await Article.create({ candidate: req.body.id, positivity: req.body.positivity, template: req.body.template, news: req.body.news, createdAt: new Date().getTime() })
                res.status(400).json({ message: "success" });
                break;
            } catch (e) {
                res.status(400).json({ message: "failed" })
                break;
            }
        default:
            break;


    }



}


