const { Router } = require("express");
const path = require("path");
require("../controladores/userController.js");
require("../controladores/authController.js");
const router = Router();
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const User = require("../modelos/usuario.js")
const { v4: uuidv4 } = require('uuid');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

async function escribirImagen(req, res, next) {
    try {
        const { email } = req.body
        const emailFound = await User.findOne({ email })
        
        if (emailFound) {
            return res.status(401).send({ message: "Mail ya tiene una cuenta" })
        }
        // Obtener el hash y la fecha del cuerpo de la solicitud
        const hash = uuidv4();
        const currentDate = new Date();
    
        // Obtener el día, mes y año por separado
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
        const year = currentDate.getFullYear();
        
        // Obtener los dos últimos dígitos del año
        const lastTwoDigitsOfYear = year.toString().slice(-2);
    
        // Cargar la imagen original
        const image = await loadImage('./uploads/certificado.jpeg'); // Reemplaza con la ruta de tu imagen
    
        // Crear un lienzo (canvas) con el mismo tamaño que la imagen original
        const canvas = createCanvas(image.width, image.height);
        const context = canvas.getContext('2d');
    
        // Dibujar la imagen original en el lienzo
        context.drawImage(image, 0, 0, image.width, image.height);
    
        // Configurar el estilo del texto
        context.fillStyle = 'black';
        context.font = '40px sans-serif';
    
        // Escribir el hash en la parte superior de la imagen
        context.fillText(hash, 420, 400);
    
        // Escribir la fecha en la parte inferior de la imagen
        context.fillText(day, 500, image.height - 310);
        context.fillText(month, 585, image.height - 310);
        context.fillText(lastTwoDigitsOfYear, 675, image.height - 310);
    
        // Convertir el lienzo a una imagen base64
        const imageBase64 = canvas.toDataURL('image/jpeg');
        const nameDate = uuidv4();
        // Guardar la imagen en el sistema de archivos
        const outputFilePath = `./uploads/${nameDate}.png`
        req.body.imagePath = `${nameDate}.png`;
        req.body.hash = hash;
        const outputStream = fs.createWriteStream(outputFilePath);
        const buffer = Buffer.from(imageBase64.split(',')[1], 'base64');
        outputStream.write(buffer);
        outputStream.end();
    
        console.log('Imagen guardada exitosamente:', outputFilePath);
        next();
    
    } catch (error) {
        console.error(error);
    }
}

router.get("/:id", getUser);

router.get("/", getUsers);

router.post("/", escribirImagen, createUser);

router.post("/signin", signinHandler);

router.delete("/:id", deleteUser);

router.post("/consulta", consultarCertificado)

module.exports = router;