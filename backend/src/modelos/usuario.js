const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: String,
        password: String,
        hash: String,
        imagePath: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//para encriptar la password
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//comparar la password para loguear
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

//Esta función es un middleware que se ejecuta antes de guardar un documento de usuario en una base de datos. 
//Utiliza la biblioteca bcrypt para realizar el hash de la contraseña antes de almacenarla.
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

module.exports = mongoose.model('usuario', userSchema);