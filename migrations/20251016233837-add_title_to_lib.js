'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.addColumn(
    'members',
    'memTitle',
   {
    type: Sequelize.STRING(7),
    allowNull: false
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'members',
      'memTitle'
    )
  }
};
