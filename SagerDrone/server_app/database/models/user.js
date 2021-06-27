
module.exports = (sequelize,DataTypes)=>{
  const User  = sequelize.define("tblUser",{
    intUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },             
    strUserName: {
      type: DataTypes.STRING,
    },
    strUserEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    strUserPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strUserImgName:{
      type:DataTypes.STRING,
    },
    strUserPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strUserCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    defaultScope: {
      attributes: { exclude: ['strUserPassword'] },
    }
  })
  return User
}