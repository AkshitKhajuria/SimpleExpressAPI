// user "database"
var userModel = require("../models/userModel")
var users = userModel.users;
var findIndexById = userModel.findIndexById;

function foo(req,res) {
    let {num} = req.body;
    res.status(200).send({num});
}

function bar(req,res) {
    let {num} = req.body;
    res.status(200).send({num:num*-1});
}

function getUser(req, res, next){
    res.send({users});
  }

function putUser(req, res, next){
    let new_user = req.body;
    let index = findIndexById(new_user.id);
    if(index!==-1){
      if(JSON.stringify(users[index])===JSON.stringify(new_user)){
        res.status(400).send({message:"User already exists",status:"ignored"});
      }
      else{
        users[index]=new_user;
        res.status(201).send({message:"User updated.",status:"sucess"});
      }
    }
    else{
      users.push(req.body);
      res.status(201).send({message:"Created user.",status:"sucess"});
    }
  }

function postUser(req, res, next){
    let new_user = req.body;
    let index = findIndexById(new_user.id);
    if(index!==-1){
      res.status(400).send({message:"User already exists",status:"ignored"});
    }
    else{
      users.push(req.body);
      res.status(201).send({message:"Created user.",status:"sucess"});
    }
  }

  function deleteUser(req, res, next){
    if(users.length===0){
      res.status(400).send({message:"Empty database!",status:"failed"});
    }
    else{
      let id = req.query.id;
      let index = findIndexById(id);
      if(index!==-1){
        let temp = users[index];
        users.splice(index,1);
        res.status(200).send({message:`Deleted user: ${temp.fname}`,status:"sucess"});
      }
      else{
        res.status(400).send({message:"No such user found.",status:"failed"});
      }
    }
  }

module.exports = {foo,bar,getUser,putUser,postUser,deleteUser};