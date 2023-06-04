module.exports = (sequelize,DataTypes)=>(
    sequelize.define('hashtag',{
        // ? 테그의 이름을 저장한다 
        title:{
            type:DataTypes.STRING(15),
            allowNull:false,
            unique:true,

        },
    },{
        timestamps:true,
        paranoid:true,
    })
);