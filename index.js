/**
 * Created by zdy on 2018/10/31.
 */
const express =require('express')

require('./db')

const route=require('./routers')

const app=express()

app.use(route)




app.listen(4000,function (err) {
  
  if(!err)console.log('服務器啓動成功');
  
  else console.log(err)
  
})