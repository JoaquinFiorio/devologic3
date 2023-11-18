const User = require("../modelos/usuario.js");
require("dotenv")

createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: "info@devologic3.com" });
  if (userFound) return;

  // create a new admin user
  const newUser = await User.create({
    email: "info@devologic3.com",
    password: "@09101982Abc"
  });

  console.log(`new user created: ${newUser.email}`);
};

createAdmin();
