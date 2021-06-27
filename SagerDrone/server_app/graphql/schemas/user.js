exports.User = `
   scalar Date
   type User{
    intUserId:Int
    strUserName:String
    strUserEmail:String
    strUserPassword:String
    strUserImgName:String
    strUserPhone:String
    strUserCountry:String
   }
`
exports.UserInput = `
   input UserInput{
    intUserId:Int
    strUserName:String
    strUserEmail:String
    strUserPassword:String
    strUserImgName:String
    strUserPhone:String
    strUserCountry:String
    }
`
exports.UserQueries = `
    loginUser(strUserEmail:String!, strUserPassword:String!):User
    getUsersByCountry(strUserCountry:String!):[User]
    `
exports.UserMutation = `
    addUser(userInput:UserInput):User
    `