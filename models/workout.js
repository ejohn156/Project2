module.exports = function(sequelize, DataTypes) {
  var Workouts = sequelize.define("Workouts", {
    workoutName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    workoutType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    workoutDes: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    workoutString: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Workouts.associate = function(models) {
    models.Workouts.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Workouts;
};
