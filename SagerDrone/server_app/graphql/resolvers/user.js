const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../../database/database")
const tblUser = db.tblUser

module.exports ={

    loginUser:async(args,req)=>{
        try {
            return await tblUser.findOne({
                where: {
                  strUserEmail:  args.strUserEmail,
                  strUserPassword: args.strUserPassword
                }
              });
        }catch(err){
            throw err;
        }
    },

    getUsersByCountry:async(args,req)=>{

        try {
            return await tblUser.findAll({
                attributes: {
                    exclude: ['strUserPassword']
                },
                where: {
                    strUserCountry: {
                      [Op.like]: '%'+ args.strUserCountry +'%'
                    }
                }
            });
        }catch(err){
            throw err;
        }  
    },
  // mutation
  addUser:async(args,req)=>{
    try{
      const userExists = await tblUser.findOne({
        where:{
          strUserEmail:args.userInput.strUserEmail
        }
      });
      if(userExists){
        throw new Error('User already exists');
      }
      const newUser = new tblUser({
        strUserName:args.userInput.strUserName,
        strUserEmail:args.userInput.strUserEmail,
        strUserPassword:args.userInput.strUserPassword,
        strUserPhone:args.userInput.strUserPhone,
        strUserCountry:args.userInput.strUserCountry,
        strUserImgName:args.userInput.strUserImgName
      });
      newUser.then
      return await newUser.save();
    }
    catch(err){
      throw err;
    }
  },
}