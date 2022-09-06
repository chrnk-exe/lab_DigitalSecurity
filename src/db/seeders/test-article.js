'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let mockup = []
    for(let i = 1; i < 23; i++){
      mockup.push({
        title: `Cool article №${i}!`,
        body: `Cool article №${i} body! AAAAAAAAAAAAAAAAA`,
        date_of_creation: new Date(),
        creatorid: '1',
        comments: '[]',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert("Articles", mockup, {})

    // await queryInterface.bulkInsert('Articles', [{
    //     title: 'Test article!',
    //     body: 'Cool article body!',
    //     date_of_creation: new Date(),
    //     creatorid: '1',
    //     comments: '[]',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    // }], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Articles', null, {});
  }
};
