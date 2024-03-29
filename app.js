const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

const pageRouter = require('./routes/page');
const authRouter =require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const {sequelize} = require('./models');
const passportConfig = require('./passport');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port',process.env.PORT || 8001);

app.use(morgan('dev'));
console.log("여기가 가장 먼저 app.js?")
app.use(express.static(path.join(__dirname,'public')));
app.use('/img',express.static(path.join(__dirname,'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// ? Router 등록 과정 
// ? '/' 로 시작되는 URL은 pageRouter에서 처리한다  
// ? 가장 많은 경로가 여기서 처리 되기 때문에 가장 앞에 놔두는게 효율적 
app.use('/',pageRouter);
// ? '/auth' 로 시작되는 URL은 pageRouter에서 처리한다 
console.log("메인('/') 여기서 나온다 이제 auth로 가고 싶어 ")
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/user',userRouter);
app.use((req,res,next)=>{
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});


app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err:{ };
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
})