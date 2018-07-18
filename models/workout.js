module.exports = function(sequelize, DataTypes) {
    var Workouts = sequelize.define("Workouts", {
      workout: {
        type: DataTypes.OBJECT,
        allowNull: false,
        validate: {
          len: [1]
        }
    }
    });
    return Workouts;
  };
  