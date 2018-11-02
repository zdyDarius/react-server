/**
 * Created by zdy on 2018/10/31.
 */


const express=require('express')
const Users=require('../modles')
const md5=require('blueimp-md5')
const cookieParser=require('cookie-parser')
const Router  =express.Router
const router=new Router()
router.use(express.urlencoded({extended:true}))
router.use(cookieParser( ))
router.post('/login',async (req,res)=>{
  console.log(req.body)
  try {
    const {username,password}=req.body
    if(!username||!password){
      res.json({
        "code": 2,
        "msg": "用户输入不合法"
      });
      return;
    }
    const data= await Users.findOne({username,password:md5(password)})
    if(data){
      
      res.cookie('userid',data.id,{maxAge:1000*3600*24*7})
      res.json({
        code:0,
        data:{
          _id:data._id,
          username:data.username,
          type:data.type
        }
      });
    
    }else {
      res.json({
        "code": 1,
        "msg": "用户名或密码错误"
      })
    }
    
  }catch (e){
    res.json({
      "code": 3,
      "msg": "网络不稳定，请重新试试~"
    })
    
  }
  
  
})


router.post('/register',async (req,res)=>{
  console.log(req.body)
    try {
      const {username,password,type}=req.body
       if(!username||!password||!type){
         res.json({
           "code": 2,
           "msg": "用户输入不合法"
         });
         return;
       }
     const data= await Users.findOne({username})
      if(data){
        res.json({
          "code": 1,
          "msg": "此用户已存在"
        });
      }else {
      const data=await Users.create({username,password:md5(password),type})
        res.cookie('userid',data.id,{maxAge:1000*3600*24*7})
        res.json({
          code: 0,
          data: {
            _id: data.id,
            username: data.username,
            type: data.type
          }
        })
      }
      
    }catch (e){
      res.json({
        "code": 3,
        "msg": "网络不稳定，请重新试试~"
      })
      
    }
    
  
})



router.post('/updata', (req, res) => {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  // 存在, 根据userid更新对应的user文档数据
  // 得到提交的用户数据
  const user = req.body // 没有_id
  Users.findByIdAndUpdate({_id: userid}, user)
    .then(oldUser => {
      if (!oldUser) {
        // 通知浏览器删除userid cookie
        res.clearCookie('userid')
        // 返回返回一个提示信息
        res.send({code: 1, msg: '请先登陆'})
      } else {
        // 准备一个返回的user数据对象
        const {_id, username, type} = oldUser
        const data = Object.assign({_id, username, type}, user)
        // 返回
        res.send({code: 0, data})
      }
    })
    .catch(error => {
      console.error('登陆异常', error)
      res.send({code: 1, msg: '更新异常, 请重新尝试'})
    })
})

module.exports=router;