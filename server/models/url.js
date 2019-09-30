'use strict';
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {
    realUrl: DataTypes.STRING,
    shortUrl: DataTypes.STRING
  }, {});
  Url.associate = function(models) {
    // associations can be defined here
  };
  return Url;
};