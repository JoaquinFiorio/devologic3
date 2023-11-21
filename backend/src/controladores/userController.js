const User = require("../modelos/usuario.js");
const fs = require("fs");
const path = require("path");
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
require("dotenv").config();

const auth = {
    host: 'smtp.ionos.es',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    logger: true,
}

const transporter = nodemailer.createTransport(auth);

createUser = async (req, res) => {
    try {
        const { email, hash, imagePath } = req.body;

        const user = new User({
            email,
            hash,
            imagePath
        });

        const savedUser = await user.save();

        return res.status(200).json(savedUser);
    } catch (error) {
        console.error(error);
    }
};

getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.json(user);
};

getUsers = async (req, res) => {
    const user = await User.find();
    return res.json(user);
};

deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByIdAndRemove(id);
    
        if (usuario) {
            fs.unlink(path.join(__dirname, `../../uploads/${usuario.imagePath}`), (error) => {
            if (error) {
                console.error('Error al eliminar el archivo:', error);
                return res.status(500).json({ error: 'Error al eliminar el archivo' });
            } else {
                return res.json({ message: 'Usuario Deleted' });
            }
            });
        } else {
            return res.status(404).json({ message: 'Usuario not found' });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

consultarCertificado = async (req, res) => {

    try {
        const { email } = req.body;
        if (!fs.existsSync(pdfsFolder)) {
            fs.mkdirSync(pdfsFolder);
        }

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' })
        }

        const imagePath = `./uploads/${user.imagePath}`;
        const doc = new PDFDocument();

        // Crear un archivo PDF con la imagen
        doc.image(imagePath, { fit: [500, 412] });

        // Nombre del archivo PDF
        const pdfPath = './pdfs/certificacion.pdf';

        // Guardar el archivo PDF en el sistema de archivos
        doc.pipe(fs.createWriteStream(pdfPath));
        doc.end();

        // Configurar el correo electrónico
        const mailOptions = {
            from: 'info@devologic3.com',
            to: email,
            subject: 'Adjunto: Archivo PDF con imagen',
            text: 'Se adjunta el archivo PDF con la imagen.',
            attachments: [
            {
                filename: 'certificacion.pdf',
                path: pdfPath,
                encoding: 'base64',
            },
            ],
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                fs.unlinkSync(pdfPath);
                return res.status(200).send({ message: 'Correo enviado con éxito' })
            }
        });
    } catch(error) {
        console.log(error)
    }

}