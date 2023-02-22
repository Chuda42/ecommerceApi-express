/* imports */
import mongoose from "mongoose";

export default class MongoContainer{
  constructor(collection, schema){
    this.collection = collection;
    this.schema = schema;
    this.model = mongoose.model(this.collection, this.schema);
  }

  async getObjects(){
    try{
      
      //lean: convert mongoose object to json
      let objects = await this.model.find().lean();
      return objects;
    
    }catch(err){
      throw err;
    }
  }

  async saveObject(object){
    try{

      let newObject = await this.model.create(object);
      let newObjectInfo = await this.getObjectById(newObject._id);
      return newObjectInfo;
    
    }catch(err){
      throw err;
    }
    
  }

  async getObjectById(id){
    try{

      let object = await this.model.findOne({"_id": id}).lean();
      return object;

    }catch(err){
      throw err;
    }
  }

  async updateObject(id, object){
    try {

      let updateObject = await this.model.findOneAndUpdate({"_id": id}, object);
      return updateObject;

    }catch (err){
      throw err;
    }
  }

  async deleteObject(id){
    try {
        
      let deleted = await this.model.findOneAndDelete({"_id": id});
    
      return deleted;

    }catch (error) {
      throw error;
    }
  }

  async aggregateQuery(query){
    try {
      const result = await this.model.aggregate(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
}