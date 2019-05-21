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
    return queryInterface.bulkInsert('Boards', [{
      jsFile : '../js/halloween.js',
      cssFile : '/game/css/halloween.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/valentine.js',
      cssFile : '/game/css/valentine.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/ramadhan.js',
      cssFile : '/game/css/ramadhan.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/christmas.js',
      cssFile : '/game/css/christmas.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/worldCup.js',
      cssFile : '/game/css/worldCup.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/paskah.js',
      cssFile : '/game/css/paskah.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/avengers.js',
      cssFile : '/game/css/avengers.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/DC.js',
      cssFile : '/game/css/DC.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/instrument.js',
      cssFile : '/game/css/instrument.css',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      jsFile : '../js/harryPotter.js',
      cssFile : '/game/css/harryPotter.css',
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
    return queryInterface.bulkDelete('Boards', null, {});
  }
};
