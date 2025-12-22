import {User} from "../models/user.Model.js"

const store = async (req, res) => {
    try {
        const { image, name, contact } = req.body;
        console.log(req.body, 'this is req.body in controller')
        console.log(req.file.filename, 'this is request file,filename')

        const user = await User.create({
            name, contact,
            image: req?.file?.filename
        })
        if (user) {
            res.json({
                success: true,
                message: 'record has been inserted'
            })
        } else {
            res.json({
                success: false,
                message: "something wrong"
            })
        }
    } catch (error) {
        console.log(error, 'error of controller')
    }
}

module.exports = store