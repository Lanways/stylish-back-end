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
  definitions: {
    postProduct: {
      status: "200",
      message: "OK",
      data: {
        id: 8,
        name: 'Cape Lion',
        price: 999,
        image: "http://123123",
        sizeOptions: "S",
        quantity: 2,
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
      sizeOptions: "S",
      quantity: 2,
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
        sizeOptions: "S",
        quantity: 1,
        description: "Viduo verecundia ambitus convoco aestas.Civis utrimque conturbo.",
        additionalImage: "https://loremflickr.com/640/480/clothing?lock=122186496999424",
        categoryId: 2
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
          sizeOptions: "S",
          quantity: 1,
          description: "Viduo verecundia ambitus convoco aestas.Civis utrimque conturbo.",
          additionalImage: "https://loremflickr.com/640/480/clothing?lock=122186496999424",
          categoryId: 2
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
        sizeOptions: "S",
        quantity: 1,
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
    }
  }
};

const outputFile = './src/swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);


