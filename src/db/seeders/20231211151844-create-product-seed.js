'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = []

    for (let i = 0; i < 5; i++) {
      const product = {
        name: faker.animal.lion(),
        price: faker.number.int(999),
        created_at: new Date(),
        updated_at: new Date(),
        image: faker.image.urlLoremFlickr({ category: 'clothing' }),
        size_options: faker.string.fromCharacters('SML'),
        quantity: faker.string.numeric(),
        description: faker.lorem.lines(),
        additional_image: faker.image.urlLoremFlickr({ category: 'clothing' })
      }

      products.push(product)
    }

    await queryInterface.bulkInsert('Products', products)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products')
  }
};
