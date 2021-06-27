const Sequelize = require('sequelize');
const Db = require('../../database/database');
const vewStudenCourseTrainer = Db.vewStudenCourseTrainer;

module.exports = {
  getStudentCourseTrainerByStudent:async(args) =>{
    try{
      return await vewStudenCourseTrainer.findAll({
        where:{strStudent:args.strStudent}
      });
    }
    catch(err){
      throw err;
    }
  },
  getStudentCourseTrainerByTrainer:async(args) =>{
    try{
      return await vewStudenCourseTrainer.findAll({
        where:{strTrainer:args.strTrainer}
      });
    }
    catch(err){
      throw err;
    }
  },
  getStudentCourseTrainerByCourse:async(args) =>{
    try{
      return await vewStudenCourseTrainer.findAll({
        where:{strCourse:args.strCourse}
      })
    }
    catch(err){
      throw err;
    }
  },
  getAllStudentCourseTrainer:async(args) =>{
    try{
      return await vewStudenCourseTrainer.findAll();
    }
    catch(err){
      throw err;
    }
  },
}