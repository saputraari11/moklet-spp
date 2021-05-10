'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('siswa', {
      nisn: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      nis: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"kelas",
          key:"id_kelas"
        }
      },
      alamat: {
        type: Sequelize.TEXT
      },
      no_telp: {
        type: Sequelize.STRING
      },
      id_spp: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"spp",
          key:"id_spp"
        }
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('siswas');
  }
};