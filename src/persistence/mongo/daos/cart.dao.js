/* imports */
import mongoose from "mongoose";

import MongooseDao from './mongoose.dao.js'
import CartSchema from '../models/cart.schema.js'

import CartDto from '../../../dtos/cart.dto.js'
import ProductDto from '../../../dtos/product.dto.js'

/* const */
const collection = 'carts';
const schema = CartSchema;

const productCollection = 'products';

export default class CartDao extends MongooseDao{
  constructor(){
    super(collection, schema)
  }

  async addCart(){
    try{
      const cart = {
        products: []
      }
      const newCart = await this.saveObject(cart);
      const cartDto = new CartDto(newCart);
      return cartDto;
    }catch (error) {
      throw error;
    }
  }

  async getProductsCart(cid){
    try {
      const cart = await this.getObjectById(cid);
      
      if(!cart){
        throw new Error('Cart not found');
      }

      let onlyProducts = cart.products;

      onlyProducts = onlyProducts.map( product => {
        const item = {
          product: new ProductDto(product.product),
          quantity: product.quantity
        }
        return item;
      })

      return onlyProducts
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid){
    try{
      const objCid = mongoose.Types.ObjectId(cid);
      try {
        const objPid = mongoose.Types.ObjectId(pid);

        await this.existProduct(objPid);
  
        const query = [
          //if product exist, add 1 to quantity
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
  
          //if product not exist, add product to cart
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
  
        const cart = await this.updateObject(objCid ,query);
        return cart
      } catch (error) {
        throw error;
      }
    }catch (error) {
      throw new Error('invalid cart id');
    }
  }

  async deleteProductFromCart(cid, pid){
    try {
      const objCid = mongoose.Types.ObjectId(cid);
      const objPid = mongoose.Types.ObjectId(pid);

      await this.existProduct(objPid);

      const query = [
        //if product exist, delete product from cart
        { $addFields: {
            products: {
              $filter: {
                input: '$products',
                as: 'product',
                cond: { $not: { $eq: ['$$product.product', objPid] } }
              }
            }
          }
        }
      ]

      const cart = await this.updateObject(objCid ,query);
      return cart
    } catch (error) {
      throw error;
    }
  }

  async udateProductQuantityInCart(cid, pid, quantity){
    try {
      const objCid = mongoose.Types.ObjectId(cid);
      const objPid = mongoose.Types.ObjectId(pid);

      await this.existProduct(objPid);

      const query = [
        //if product exist, update quantity
        { $project: { 
            products: { 
              $map: { 
                input: '$products',
                as: 'product',
                in: {
                  $cond: [
                    { $eq: ['$$product.product', objPid] },
                    { product: '$$product.product', quantity: quantity },
                    "$$product"
                  ]  
                }
              } 
            } 
          } 
        }
      ]

      const cart = await this.updateObject(objCid ,query);

      if(!cart){
        throw new Error('Cart not found');
      }

      return cart
    } catch (error) {
      throw error;
    }
  }

  async deleteAllProductsFromCart(cid){
    try {
      const objCid = mongoose.Types.ObjectId(cid);

      const query = [
        { $set: { products: [] } }
      ]

      const cart = await this.updateObject(objCid ,query);

      if(!cart){
        throw new Error('Cart not found');
      }

      return cart
    } catch (error) {
      throw error;
    }
  }

  async updateProductsToCart(cid, products){
    try {
      
      let productListParsed = products.map(product =>{
        return {
          product: mongoose.Types.ObjectId(product.product),
          quantity: product.quantity
        }
      })

      const query = [
        { $set: { products: productListParsed } }
      ]

      const objCid = mongoose.Types.ObjectId(cid);
      const cart = await this.updateObject(objCid ,query);

      if(!cart){
        throw new Error('Cart not found');
      }

      return cart
    } catch (error) {
      throw error;
    }
  }

  async existProduct(pid){
    try {
      const objPid = mongoose.Types.ObjectId(pid);
      const existProduct = await this.existsOverAll(productCollection, objPid);
      return existProduct;
    } catch (error) {
      throw error;
    }
  }

  async getCartsIds(){
    try {
      const carts = await this.getObjects();
      const ids = carts.map(cart => cart._id);
      return ids;
    } catch (error) {
      throw error;
    }
  }

}