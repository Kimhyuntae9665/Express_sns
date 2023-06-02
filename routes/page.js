const express = require('express');

const router = express.Router();

router.get('/profile',(res,req)=>{
    res.render('profile',{title:'내 정보 - NodeBird',user:null})
});

router.get('/join',(req,res)=>{
    console.log("여기가 회원가입")
    res.render('join',{
        title:'회원가입 - NodeBird',
        user:null,
        joinError:req.flash('joinError'),
    });
});

router.get('/',(req,res,next)=>{
    console.log("여기가 작동ㅋ");
    res.render('main',{
        title:'NodeBird',
        twits:[],
        user:null,
        loginError:req.flash('loginError'),
    });
});

module.exports = router;