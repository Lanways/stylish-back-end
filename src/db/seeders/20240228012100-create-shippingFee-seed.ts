'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface: any) {
    const shippingFee = [
      {
        country: '台灣',
        payment_method: '信用卡',
        shipping_method: '超商取貨',
        fee: 70,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country: '台灣',
        payment_method: '信用卡',
        shipping_method: '宅配',
        fee: 120,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country: '台灣',
        payment_method: '貨到付款',
        shipping_method: '超商取貨',
        fee: 70,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country: '台灣',
        payment_method: '貨到付款',
        shipping_method: '宅配',
        fee: 120,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    await queryInterface.bulkInsert('ShippingFees', shippingFee)
  },

  async down(queryInterface: any) {
    await queryInterface.bulkDelete('ShippingFees', {})
  }
};
