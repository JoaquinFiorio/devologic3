const Role = require("../modelos/Role.js");
const User = require("../modelos/usuario.js");
require("dotenv")

createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: "joaquin.fiorio1@hotmail.com" });
  if (userFound) return;

  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  // create a new admin user
  const newUser = await User.create({
    email: "info@devologic3.com",
    password: "@09101982Abc"
  });

  console.log(`new user created: ${newUser.email}`);
};

createRoles();
createAdmin();
