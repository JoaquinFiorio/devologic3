const User = require("../modelos/usuario.js");

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
    const { hash } = req.body;
    const user = await User.findOne({ hash });
    return res.json(user);
};

getUsers = async (req, res) => {
    const user = await User.find();
    return res.json(user);
};

deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ id });
    return res.json(user);
};