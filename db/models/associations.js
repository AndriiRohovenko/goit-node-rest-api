import User from "./Users.js";
import Contact from "./Contacts.js";

User.hasMany(Contact, {
  foreignKey: "owner",
  as: "contacts",
  onDelete: "CASCADE",
});

Contact.belongsTo(User, {
  foreignKey: "owner",
  as: "user",
});

export { User, Contact };
