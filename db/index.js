/**
 * Created by zdy on 2018/10/31.
 */

  const mongoose= require('mongoose')


  mongoose.connect('mongodb://localhost:27017/gzhiqin',{useNewUrlParser:true});

  
  mongoose.connection.once('open',function (err) {
  
    if(!err){
      console.log('数据库连接成功')
  
    }else{
      console.log(err)

      }
  })
  
