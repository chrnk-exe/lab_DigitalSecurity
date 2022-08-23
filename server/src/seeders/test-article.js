'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Articles', [{
        title: 'Test article!',
        body: 'Cool article body!',
        date_of_creation: new Date(),
        creatorid: '1',
        comments: '[]',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Articles', null, {});
  }
};
