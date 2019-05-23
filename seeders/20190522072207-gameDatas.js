'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Games', [{
        level : 'halloween',
        time : 10,
        BoardId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'valentine',
        time : 10,
        BoardId: 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'ramadhan',
        time : 10,
        BoardId: 3,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'christmas',
        time : 10,
        BoardId: 4,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'worldCup',
        time : 10,
        BoardId: 5,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'easter',
        time : 10,
        BoardId: 6,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'avengers',
        time : 10,
        BoardId: 7,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'DC-Comics',
        time : 10,
        BoardId: 8,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'instruments',
        time : 10,
        BoardId: 9,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        level : 'harryPotter',
        time : 10,
        BoardId: 10,
        createdAt : new Date(),
        updatedAt : new Date()
      }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Games', null, {})
  }
};
