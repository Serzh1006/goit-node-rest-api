import sequelize from "./connect_db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email is exist",
    },
    isEmail: true,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

export default User;
