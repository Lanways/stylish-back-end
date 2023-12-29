import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const categories = [
      {
        name: '所有商品',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '本月新品',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '連線商品',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: '夏日度假風',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: '熱銷商品',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: '現貨商品區',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: '鞋子 配件等',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: '限時優惠',
        created_at: new Date(),
        updated_at: new Date()
      },

    ]



    await queryInterface.bulkInsert('Categories', categories)
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Categories', {})
  }
};
