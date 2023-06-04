module.exports = (sequelize,DataTypes)=>(
    sequelize.define('post',{
        // ? 게시물의 내용 
        content:{
            type:DataTypes.STRING(140),
            allowNull:false,

        },
        img:{
            // ? 이미지 경로 
            type:DataTypes.STRING(200),
            allowNull:true,

        },
    },{
        timestamps:true,
        paranoid:true,
    })
);