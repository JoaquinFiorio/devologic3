const jwt = require("jsonwebtoken");
const User = require("../modelos/usuario.js");
const bcrypt = require("bcryptjs")
require("dotenv").config()

signinHandler = async (req, res) => {
    try {
        // Request body email can be an email or nombre
        const userFound = await User.findOne({ email: req.body.email })

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });

        const token = jwt.sign({ id: userFound._id }, "process.env.SECRET", {
            expiresIn: 86400, // 24 hours
        });

        res.json({ token, userFound });
    } catch (error) {
        console.log(error);
    }
};