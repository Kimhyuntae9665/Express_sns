const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport)=>{
    // ? passport를 지지고 볶고 serializeUser, deserializerUser를 해서 passport를 조작하고 local(passport) local방식의 함수에 매개변수로 넘긴다 
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findOne({where:{id}})
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });

    local(passport);
    kakao(passport);
}