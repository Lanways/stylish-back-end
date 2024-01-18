'use strict';
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface: any) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM "Categories";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const products = []
    for (let i = 0; i < 50; i++) {
      const clothingImage = faker.image.urlLoremFlickr({ category: 'clothing' })
      const random = Math.floor(Math.random() * categories.length)
      const product = {
        name: faker.animal.lion(),
        price: faker.number.int(999),
        created_at: new Date(),
        updated_at: new Date(),
        image: faker.image.urlLoremFlickr({ category: 'clothing' }),
        description: faker.lorem.lines(),
        additional_image: `${clothingImage}, ${clothingImage}, ${clothingImage}`,
        category_id: categories[random].id
      }
      products.push(product)
    }
    await queryInterface.bulkInsert('Products', products)
  },

  async down(queryInterface: any) {
    await queryInterface.bulkDelete('Products', {})
  }
};
