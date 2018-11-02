
/**
 * Created by zdy on 2018/10/31.
 */


const mongoose =require('mongoose')

const Schema=mongoose.Schema

const usersSchema=new Schema({
   username:{
   type:String,
   unique:true,
   isRequired:true,
 },
  password:{
    type:String,
    isRequired:true
 },
 type:{
   type:String,
   isRequired:true
 },
})
const Users=mongoose.model('Users',usersSchema)

module.exports=Users;