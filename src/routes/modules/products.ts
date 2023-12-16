import express from 'express'
import productController from '../../controllers/product-controller'

const router = express.Router()

router.get('/:id',
  /* 	#swagger.tags = ['Product']
      #swagger.description = '查詢產品資訊' */
  /* #swagger.responses[200] = {
      schema: {
        "status": "200",
        "message": "OK",
        "data": {
          "id": 7,
          "name": "Cape lion",
          "price": "192",
          "createdAt": "2023-12-14T06:47:26.000Z",
          "updatedAt": "2023-12-14T06:47:26.000Z",
          "image": "https://loremflickr.com/640/480/clothing?     lock=1957181607903232",
          "sizeOptions": "S",
          "quantity": 1,
          "description": "Viduo verecundia ambitus convoco aestas.\nCivis utrimque conturbo.\nAutus nihil terra statim astrum admitto tonsor tam cubo.\nVero at contigo necessitatibus vesica aspernatur modi agnosco crux.",
          "additionalImage": "https://loremflickr.com/640/480/clothing?lock=122186496999424"
        }
      },
    description: "get Product successfully." } */
  productController.getProduct
)
router.get('/',
  /* 	#swagger.tags = ['Product']
      #swagger.description = '查詢所有產品' */
  /* #swagger.responses[200] = {
      schema: [{
        "status": "200",
        "message": "OK",
        "data": {
            "id": 7,
            "name": "Cape lion",
            "price": "192",
            "createdAt": "2023-12-14T06:47:26.000Z",
            "updatedAt": "2023-12-14T06:47:26.000Z",
            "image": "https://loremflickr.com/640/480/clothing?       lock=1957181607903232",
            "sizeOptions": "S",
            "quantity": 1,
            "description": "Viduo verecundia ambitus convoco aestas.    \nCivis     utrimque conturbo.\nAutus nihil terra statim astrum     admitto tonsor    tam cubo.\nVero at contigo necessitatibus     vesica aspernatur modi    agnosco crux.",
            "additionalImage": "https://loremflickr.com/640/480/clothing?lock=122186496999424"
        }
      }],
      description: "get Products successfully." } */
  productController.getProducts
)


export default router