'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'librarians',
      'libTitle',{
        type: Sequelize.STRING(7),
        allowNull: false,
        defaultValue: "Mr."
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'librarians',
      'libTitle',{
        type: Sequelize.STRING(7),
        allowNull: false
      }
    )
  }
};
