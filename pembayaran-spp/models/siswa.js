'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.kelas,{
        foreignKey:"id_kelas",
        as:"kelas"
      })
      this.belongsTo(models.spp,{
        foreignKey:"id_spp",
        as:"spp"
      })
    }
  }
  siswa.init({
    nisn: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    nis: DataTypes.CHAR,
    nama: DataTypes.STRING,
    id_kelas: DataTypes.INTEGER,
    alamat: DataTypes.TEXT,
    no_telp: DataTypes.STRING,
    id_spp: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'siswa',
    tableName:"siswa"
  });
  return siswa;
};