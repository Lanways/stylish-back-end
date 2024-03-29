import swaggerAutogen from 'swagger-autogen'
import dotenv from 'dotenv'
dotenv.config()

const host = process.env.SWAGGER_HOST
const doc = {
  info: {
    title: 'Stylish',
    description: 'Description'
  },
  host: host,
  schemes: ['http', 'https'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'Enter your bearer token in the format "Bearer &lt;token&gt;"'
    }
  },
  definitions: {
    postProduct: {
      status: "200",
      message: "OK",
      data: {
        id: 8,
        name: 'Cape Lion',
        price: 999,
        image: "http://123123",
        description: "123",
        additionalImage: "http://232323.456",
        categoryId: 2,
        updatedAt: "2023-12-20T18:02:15.641Z",
        createdAt: "2023-12-20T18:02:15.641Z"
      }
    },
    productBody: {
      name: 'Cape Lion',
      price: 999,
      image: "http://123123",
      description: "123",
      additionalImage: "http://232323.456",
      categoryId: 2
    },
    getProductById: {
      status: "200",
      message: "OK",
      data: {
        id: 7,
        name: "Cape lion",
        price: "192",
        createdAt: "2023-12-14T06:47:26.000Z",
        updatedAt: "2023-12-14T06:47:26.000Z",
        image: "https://loremflickr.com/640/480/clothing?lock=1957181607903232",
        description: "Viduo verecundia ambitus convoco aestas.Civis utrimque conturbo.",
        additionalImage: "https://loremflickr.com/640/480/clothing?lock=122186496999424",
        categoryId: 2,
        Skus: [
          {
            id: 82,
            productId: 250,
            skuCode: "SKU-250-black-L",
            price: 294,
            inventoryQuantity: 8,
            color: "black",
            size: "L",
            createdAt: "2024-01-19T08:15:11.657Z",
            updatedAt: "2024-01-19T08:15:11.657Z"
          }
        ]
      }
    },
    getProducts: {
      status: "200",
      message: "OK",
      data: {
        products: [{
          id: 7,
          name: "Cape lion",
          price: "192",
          createdAt: "2023-12-14T06:47:26.000Z",
          updatedAt: "2023-12-14T06:47:26.000Z",
          image: "https://loremflickr.com/640/480/clothing?lock=1957181607903232",
          description: "Viduo verecundia ambitus convoco aestas.Civis utrimque conturbo.",
          additionalImage: "https://loremflickr.com/640/480/clothing?lock=122186496999424",
          categoryId: 2,
          Skus: [
            {
              id: 84,
              price: 988,
              skuCode: "SKU-221-red-L"
            },
          ]
        },],
        pagination: {
          pages: [
            1
          ],
          totalPage: 1,
          currentPage: 1,
          prev: 1,
          next: 1
        }
      }
    },
    removeProduct: {
      status: "200",
      message: "OK",
      data: {
        id: 7,
        name: "Cape lion",
        price: "192",
        createdAt: "2023-12-14T06:47:26.000Z",
        updatedAt: "2023-12-14T06:47:26.000Z",
        image: "https://loremflickr.com/640/480/clothing?lock=1957181607903232",
        description: "Viduo verecundia ambitus convoco aestas.",
        additionalImage: "https://loremflickr.com/640/480/clothing?lock=122186496999424",
        categoryId: 2
      }
    },
    getCategoryById: {
      status: "200",
      message: "OK",
      data: {
        "id": 5,
        "name": "熱銷商品",
        "createdAt": "2023-12-30T07:44:05.941Z",
        "updatedAt": "2023-12-30T07:44:05.941Z"
      }
    },
    getCategories: {
      status: "200",
      message: "OK",
      data: [
        {
          "id": 1,
          "name": "所有商品",
          "createdAt": "2023-12-30T07:44:05.941Z",
          "updatedAt": "2023-12-30T07:44:05.941Z"
        },]
    },
    categoryBody: {
      name: 'categoryName'
    },
    postCategory: {
      status: "200",
      message: "OK",
      data: {
        "id": 19,
        "name": "冬季限定",
        "updatedAt": "2024-01-02T08:05:24.082Z",
        "createdAt": "2024-01-02T08:05:24.082Z"
      }
    },
    userBody: {
      name: "Cape Lion",
      account: 'user1',
      email: "user1@gmail.com",
      password: "12345678",
      phone: '00000001',
      address: "台北市",
    },
    signInBody: {
      email: "user1@gmail.com",
      password: "12345678"
    },
    signIn: {
      status: "200",
      message: "OK",
      data: {
        userObject: {
          id: 11,
          name: "Cape Lion",
          account: "user1",
          email: "user1@gmail.com",
          phone: 1,
          address: "台北市",
          isAdmin: true,
          createdAt: "2024-01-11T20:09:20.684Z",
          updatedAt: "2024-01-11T20:09:20.684Z"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiJDYXBlIExpb24iLCJhY2NvdW50IjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInBob25lIjoxLCJhZGRyZXNzIjoi5Y-w5YyX5biCIiwiaXNBZG1pbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyNC0wMS0xMVQyMDowOToyMC42ODRaIiwidXBkYXRlZEF0IjoiMjAyNC0wMS0xMVQyMDowOToyMC42ODRaIiwiaWF0IjoxNzA1MDAzOTU0LCJleHAiOjE3MDUwMDQwNzR9.9ItoMj43OYWlyKrIqV9LJp71A0W6lciYwKwpA6UDc18"
      }
    },
    signUp: {
      status: "200",
      message: "OK",
      data: {
        id: 7,
        name: "Cape Lion",
        account: "user2",
        email: "user2@gmail.com",
        phone: 919123457,
        address: "台北市",
        updatedAt: "2024-01-09T11:02:04.772Z",
        createdAt: "2024-01-09T11:02:04.772Z",
        isAdmin: false
      }
    },
    getUser: {
      status: "200",
      message: "OK",
      data: {
        id: 6,
        name: "Cape Lion",
        account: "user1",
        email: "user1@gmail.com",
        phone: 919123456,
        address: "台北市",
        isAdmin: false,
        createdAt: "2024-01-09T09:42:52.065Z",
        updatedAt: "2024-01-09T09:42:52.065Z"
      }
    },
    getUsers: {
      status: "200",
      message: "OK",
      data: {
        users: [
          {
            id: 7,
            name: "Cape Lion",
            account: "user2",
            email: "user2@gmail.com",
            password: "$2b$10$zDitNpXNi2ZKNKo/XcByLewRyR0qfSO.lCHVDSvmohyWfdcowJKqi",
            phone: 919123457,
            address: "台北市",
            isAdmin: true,
            createdAt: "2024-01-09T11:02:04.772Z",
            updatedAt: "2024-01-09T11:02:04.772Z"
          }
        ],
        pagination: {
          pages: [
            1
          ],
          totalPage: 1,
          currentPage: 1,
          prev: 1,
          next: 1
        }
      }
    },
    putUserBody: {
      name: "Cape Lion",
      account: 'user1',
      password: "user1",
      address: "台北市"
    },
    getCart: {
      status: "200",
      message: "OK",
      data: {
        id: 2,
        userId: 3,
        createdAt: "2024-01-15T15:49:18.758Z",
        updatedAt: "2024-01-15T15:49:18.758Z",
        CartItems: [
          {
            id: 4,
            cartId: 2,
            skuId: 2,
            quantity: 1,
            createdAt: "2024-01-17T15:37:39.656Z",
            updatedAt: "2024-01-17T15:37:39.656Z"
          }
        ]
      }
    },
    putCartItemBody: {
      quantity: "5"
    },
    putCartItemRes: {
      status: "200",
      message: "OK",
      data: {
        id: 4,
        cartId: 2,
        skuId: 2,
        quantity: 5,
        createdAt: "2024-01-17T15:37:39.656Z",
        updatedAt: "2024-01-17T15:53:53.906Z",
        Cart: {
          id: 2,
          userId: 3,
          createdAt: "2024-01-15T15:49:18.758Z",
          updatedAt: "2024-01-15T15:49:18.758Z"
        }
      }
    },
    postCartItemBody: {
      skuId: "2",
      quantity: "1"
    },
    postCartItemRes: {
      status: "200",
      message: "OK",
      data: {
        id: 4,
        cartId: 2,
        skuId: 2,
        quantity: 1,
        updatedAt: "2024-01-17T15:37:39.656Z",
        createdAt: "2024-01-17T15:37:39.656Z"
      }
    },
    getSku: {
      status: "200",
      message: "OK",
      data: {
        id: 24,
        productId: 170,
        skuCode: "SKU-170-white-S",
        price: 1,
        inventoryQuantity: 1,
        color: "white",
        size: "S",
        createdAt: "2024-01-18T20:38:41.329Z",
        updatedAt: "2024-01-18T20:38:41.329Z"
      }
    },
    skuPutBody: {
      productId: 170,
      price: 1,
      inventoryQuantity: 1,
      color: "black",
      size: "L"
    },
    getSkus: {
      status: "200",
      message: "OK",
      data: {
        skus: [
          {
            id: 24,
            productId: 170,
            skuCode: "SKU-170-white-S",
            price: 1,
            inventoryQuantity: 1,
            color: "white",
            size: "S",
            createdAt: "2024-01-18T20:38:41.329Z",
            updatedAt: "2024-01-18T20:38:41.329Z"
          }
        ]
      }
    },
    getShippingFee: {
      status: "200",
      message: "OK",
      data: {
        skus: [
          {
            id: 1,
            country: "台灣",
            paymentMethod: "信用卡",
            shippingMethod: "超商取貨",
            fee: "70",
            createdAt: "2024-02-27T17:30:12.701Z",
            updatedAt: "2024-02-27T17:30:12.701Z"
          }
        ]
      }
    },
    postOrderBody: {
      order: {
        totalPrice: 150.00,
        status: "Pending"
      },
      shipping: {
        recipient: "John Doe",
        address: "123 Main St, Anytown, AT 12345",
        telephone: "123-456-7890"
      },
      payment: {
        amount: 150.00,
        provider: "Credit Card",
        status: "Pending"
      },
      orderItems: [
        {
          skuId: 1,
          quantity: 2
        },
        {
          skuId: 2,
          quantity: 1
        }
      ],
      shippingFeeId: 789
    },
    postOrderRes: {
      status: "200",
      message: "OK",
      data: {
        id: 20,
        totalPrice: "150",
        status: "Pending",
        userId: 1,
        shippingFeeId: 789,
        updatedAt: "2024-03-01T12:45:32.568Z",
        createdAt: "2024-03-01T12:45:32.568Z"
      }
    },
    getOrders: {
      status: "200",
      message: "Ok",
      data: [
        {
          id: 9,
          userId: 2,
          shippingFeeId: 789,
          totalPrice: "150",
          status: "Pending",
          createdAt: "2024-02-28T16:05:38.200Z",
          updatedAt: "2024-02-28T16:05:38.200Z",
          Payment: {
            id: 9,
            status: "Pending"
          },
          Shipping: {
            id: 9
          },
          OrderItems: [
            {
              id: 18,
              skuId: 2,
              quantity: 1
            },
            {
              id: 17,
              skuId: 1,
              quantity: 2
            }
          ]
        },]
    },
    getTokenRes: {
      status: "200",
      message: "OK",
      data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InJvb3QiLCJhY2NvdW50IjpudWxsLCJlbWFpbCI6InJvb3RAZ21haWwuY29tIiwicGhvbmUiOiIwMDAwMDAwMCIsImFkZHJlc3MiOm51bGwsImlzQW"
    }
  }
};

const outputFile = './src/swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);


