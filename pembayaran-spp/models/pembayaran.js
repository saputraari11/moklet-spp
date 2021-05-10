'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.siswa,{
        foreignKey:"nisn",as:"siswa"
      })
      this.belongsTo(models.siswa,{
        foreignKey:"id_spp",as:"spp"
      })
      this.belongsTo(models.petugas,{
        foreignKey:"id_petugas",as:"petugas"
      })
    }
  }
  pembayaran.init({
    id_pembayaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_petugas: 
    {type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true},
    nisn: 
    {type: DataTypes.INTEGER,
      allowNull: false,},
    tgl_bayar: DataTypes.DATE,
    bulan_bayar: DataTypes.STRING,
    tahun_bayar: DataTypes.STRING,
    id_spp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jumlah_bayar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pembayaran',
    tableName:"pembayaran"
  });
  return pembayaran;
};