module.exports = {
  async up(queryInterface: any) {

    const productsId = await queryInterface.sequelize.query(
      `SELECT id FROM "Products";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const skus = []
    for (let i = 0; i < 100; i++) {
      const colorArr = ['black', 'white', 'blue', 'red', 'pink']
      const sizeArr = ['S', 'M', 'L']
      const product_id = productsId[Math.floor(Math.random() * productsId.length)].id
      const color = colorArr[Math.floor(Math.random() * 5)]
      const size = sizeArr[Math.floor(Math.random() * 3)]
      const sku_code = `SKU-${product_id}-${color}-${size}`

      const existing = await queryInterface.sequelize.query(
        `SELECT * FROM "Skus" WHERE "sku_code" = :skuCode`,
        {
          replacements: { skuCode: sku_code },
          type: queryInterface.sequelize.QueryTypes.SELECT
        }
      )
      if (existing.length > 0) continue
      const sku = {
        product_id,
        sku_code,
        price: Math.floor(Math.random() * 999),
        inventory_quantity: Math.floor(Math.random() * 10),
        color,
        size,
        created_at: new Date(),
        updated_at: new Date(),
      }
      skus.push(sku)
    }
    await queryInterface.bulkInsert('Skus', skus)
  },
  async down(queryInterface: any) {
    await queryInterface.bulkDelete('Skus', {})
  }
}