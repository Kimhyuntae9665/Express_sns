const express = require('express');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const {Post,User} = require('../models');

const router = express.Router();

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile',{title:'내 정보 - NodeBird',user:req.user});
});

router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{
        title:'회원가입 - NodeBird',
        user:req.user,
        joinError:req.flash('joinError'),
    });
});

router.get('/',(req,res,next)=>{
    console.log("여기가 메인 화면 렌더링 가장 먼저: 로그인 전 ")
    Post.findAll({
        include:{
            model:User,
            attributes:['id','nick'],
        },
        order:[['createdAt','DESC']],
    })
    .then((posts)=>{
        console.log("여기서 main 화면에 보여주는 게시물")
        res.render('main',{
            title:'NodeBird',
            twits:posts,
            user:req.user,
            loginError:req.flash('loginError'),
        });
    })
    .catch((error)=>{
        console.error(error);
        next(error);
    });
    
});

module.exports = router;