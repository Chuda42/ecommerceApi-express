import mongoose from "mongoose";
import Utils from "../utils.js";

import PersistenceController from "../dao/mongo.container.js";
import ProductSchema from "../dao/models/product.schema.js";

export default class CartService{
  constructor(persistenceController){
    this.persistenceController = persistenceController;
  }

  async addCart(){
    try{
      const cart = {
        products: []
      }
      const newCart = await this.persistenceController.saveObject(cart);
      return newCart;
    }catch (error) {
      throw error;
    }
  }

  async getProductsCart(cid){
    try {
      const objCid =  mongoose.Types.ObjectId(cid)
      const productsCollection = Utils.DB_COLLECTION_PRODUCTS;
      const query = [
        { $match: { _id: objCid } },

        //join products
        {
          $lookup: {
            from: productsCollection,
            localField: 'products.product',
            foreignField: '_id',
            pipeline: [
              { $project: { 
                  _id: 1,
                  title: 1,
                  description: 1,
                  price: 1,
                  stock: 1,
                  code: 1,
                  thumbnail: 1,
                  category: 1,
                  status: 1
                }
              }
            ],
            as: 'productsList'
          }
        },
        
        //returned list
        {
          $project: {
            products: {
              $map: {
                input: '$products',
                as: 'product',
                in: {
                  product: {
                    _id: '$$product.product',
                    title: { $arrayElemAt: ['$productsList.title', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                    description: { $arrayElemAt: ['$productsList.description', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                    price: { $arrayElemAt: ['$productsList.price', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                    stock: { $arrayElemAt: ['$productsList.stock', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                    code: { $arrayElemAt: ['$productsList.code', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                    thumbnail: { $arrayElemAt: ['$productsList.thumbnail', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                    category: { $arrayElemAt: ['$productsList.category', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                    status: { $arrayElemAt: ['$productsList.status', { $indexOfArray: ['$productsList._id', '$$product.product'] }] },
                  },
                  quantity: '$$product.quantity'
                }
              }
            }
          }
        }
      ]
      const cartJoinedProducts = await this.persistenceController.aggregateQuery(query); //array of one element with the cart joined with the products
      const onlyProducts = cartJoinedProducts[0].products;
      return onlyProducts
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid){
    try {
      const objPid = mongoose.Types.ObjectId(pid);

      const perControlerProduct = new PersistenceController(Utils.DB_COLLECTION_PRODUCTS ,ProductSchema);
      const product = await perControlerProduct.getObjectById(pid);
      if(!product){
        throw new Error('Product not found');
      }

      const query = [
        { $project: { 
            products: { 
              $map: { 
                input: '$products',
                as: 'product',
                in: {
                  $cond: [
                    { $eq: ['$$product.product', objPid] },
                    { product: '$$product.product', quantity: { $add: ['$$product.quantity', 1] } },
                    "$$product"
                  ]
                    
                }
              } 
            } 
          } 
        },

        { $addFields: {
            products: {
              $concatArrays: [
                {
                  $cond: [
                    {$anyElementTrue: {
                      $map: {
                        input: "$products",
                        as: "item",
                        in: {
                          $eq: [ "$$item.product", objPid ]
                        }
                      }
                    }
                    },
                    [],
                    [ { product: objPid, quantity: 1 } ]
                    
                  ]
                },
                '$products'
              ]
            }
          }
        }
      ]

      const cart = await this.persistenceController.updateObject(cid ,query);
      return cart
    } catch (error) {
      throw error;
    }
  }
}