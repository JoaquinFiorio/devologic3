const User = require("../modelos/usuario.js");
const fs = require("fs");
const path = require("path");

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