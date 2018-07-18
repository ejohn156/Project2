module.exports = function (sequelize, DataTypes) {
    var Workouts = sequelize.define("Workouts", {
        workout: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return Workouts;
};

