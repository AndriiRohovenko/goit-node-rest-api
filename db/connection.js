import sequelize from "./sequelize.js";

const connectDB = async () => {
  try {
    console.log();
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default connectDB;
