import sequelize from "./sequelize.js";

const connectDB = async () => {
  try {
    console.log();
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
