module.exports = (sequelize, DataTypes) => {
  const Classrooms = sequelize.define("Classrooms", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gradetypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    students: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  });

  return Classrooms;
};
