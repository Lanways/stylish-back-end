'use strict';
/** @type {import('sequelize-cli').Migration} */
import bcrypt from 'bcryptjs'

module.exports = {
  async up(queryInterface: any) {
    const hashed: string = await bcrypt.hash('12345678', 10)
    const users = [
      {
        name: 'root',
        email: 'root@gmail.com',
        password: hashed,
        phone: '00000000',
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user1',
        email: 'user1@gmail.com',
        password: hashed,
        phone: '00000001',
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user2',
        email: 'user2@gmail.com',
        password: hashed,
        phone: '00000002',
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user3',
        email: 'user3@gmail.com',
        password: hashed,
        phone: '00000003',
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user4',
        email: 'user4@gmail.com',
        password: hashed,
        phone: '00000004',
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user5',
        email: 'user5@gmail.com',
        password: hashed,
        phone: '00000005',
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    await queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface: any) {
    await queryInterface.bulkDelete('Users', {})
  }
};
