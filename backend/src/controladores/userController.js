const User = require("../modelos/usuario.js");
const Role = require("../modelos/Role.js");

createUser = async (req, res) => {
    try {
        const { email, hash } = req.body;
        const emailFound = await User.findOne({ email })
        
        if (emailFound) {
            return res.status(401).send({ message: "Mail ya tiene una cuenta" })
        }

        // creating a new User
        const user = new User({
            email,
            hash,
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