const jwt = require("jsonwebtoken");
const User = require("../modelos/usuario.js");
const Role = require("../modelos/Role.js");
const Reset = require("../modelos/ResetPassword.js")
const VerificacionEmail = require("../modelos/VerificacionEmail.js")
const { enviarLinkReset, enviarLinkVerificacion } = require("../enviarEmail.js")
const bcrypt = require("bcryptjs")
const { v1: uuidv1 } = require('uuid');
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

verificacionEmail = async (req, res) => {
    const { id } = req.params;

    const userReset =  await VerificacionEmail.findOne({ id });

    if(!userReset) return res.status(400).send({message: "Usuario no encontrado"});

    const user = await User.findOne({ email: userReset.email });

    if(user.verificado === true) return res.status(400).send({message: "Usuario ya esta verificado"});

    const newUser = await User.findOneAndUpdate({ _id : user.id}, {verificado : true}, { new: true });
    await VerificacionEmail.findOneAndDelete({ id });
    return res.status(200).send({message: "Email verificado correctamente"})
};

forgot = async (req, res) => {
    const { email } = req.body;
    const userFound = await User.findOne({ email });
    
    if(!userFound) return res.status(400).send({message: "no se encontro el usuario"});

    const id = uuidv1();
    const request = new Reset({id: id, email: req.body.email});
    await request.save()
    enviarLinkReset(userFound.email, id)
    res.status(200).send({message: "email mandado con exito. ID: " + id})
}

resetPassword = async (req, res) => {
    const { id } = req.params;

    const userReset =  await Reset.findOne({ id })

    if(!userReset) return res.status(400).send({message: "Usuario no encontrado"})

    const user = await User.findOne({ email: userReset.email })

    bcrypt.hash(req.body.password, 10).then( async (hashed) =>{
        const newUser = await User.findOneAndUpdate({ _id : user.id}, {password : hashed}, { new: true })
        console.log(newUser)
        await Reset.findOneAndDelete({ id });
        return res.status(200).send({message: "Contraseña cambiada correctamente"})
    })

}