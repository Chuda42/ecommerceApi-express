/* imports */
import mongoose from "mongoose";
import Utils from '../utils.js'

export default class CartDao {
  constructor(persistenceController, productPersistenceController){
    this.persistenceController = persistenceController;
    this.productPersistenceController = productPersistenceController;
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
      const cart = await this.persistenceController.getObjectById(cid);
      
      if(!cart){
        throw new Error('Cart not found');
      }

      const onlyProducts = cart.products;
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
  
        const existProduct = await this.productPersistenceController.existProduct(objPid);
        if(!existProduct){
          throw new Error('Product not found');
        }
  
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
  
        
        const cart = await this.persistenceController.updateObject(objCid ,query);
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

      const existProduct = await this.productPersistenceController.existProduct(objPid);
      if(!existProduct){
        throw new Error('Product not found');
      }

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

      const cart = await this.persistenceController.updateObject(objCid ,query);
      return cart
    } catch (error) {
      throw error;
    }
  }

  async udateProductQuantityInCart(cid, pid, quantity){
    try {
      const objCid = mongoose.Types.ObjectId(cid);
      const objPid = mongoose.Types.ObjectId(pid);

      const existProduct = await this.productPersistenceController.existProduct(objPid);
      if(!existProduct){
        throw new Error('Product not found');
      }

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

      const cart = await this.persistenceController.updateObject(objCid ,query);

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

      const cart = await this.persistenceController.updateObject(objCid ,query);

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
      const cart = await this.persistenceController.updateObject(objCid ,query);

      if(!cart){
        throw new Error('Cart not found');
      }

      return cart
    } catch (error) {
      throw error;
    }
  }

  async getCartsIds(){
    try {
      const carts = await this.persistenceController.getObjects();
      const ids = carts.map(cart => cart._id);
      return ids;
    } catch (error) {
      throw error;
    }
  }

}