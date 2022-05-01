module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already in use!",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userfname: {
      type: DataTypes.STRING,
    },
    userlname: {
      type: DataTypes.STRING,
    },
    userRole: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    userclassroomIDGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Users;
};
