module.exports = function(sequelize, DataTypes) {
  var Progress = sequelize.define("Progress", {
    progressString: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Progress.associate = function(models) {
    models.Progress.belongsTo(models.UserLogin, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Progress;
};
