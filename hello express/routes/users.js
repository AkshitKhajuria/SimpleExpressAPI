var express = require('express');
var router = express.Router();
var usr_module = require('../modules/userModule');

router.post('/test',usr_module.foo);
router.post('/sample',usr_module.bar);

// user "database"
var users = [];

function findIndexById(id){
  for(var index=0;index<users.length;index++){
    if(users[index].id===parseInt(id)){
      return index;
    }
  }
  return -1;
}

/* GET users listing. */
router.get('/', (req, res, next)=>{
  res.send({users});
});

// insert/update a user
router.put('/', (req, res, next)=>{
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
});

// insert a new user, ignore if id already exists
router.post('/', (req, res, next)=>{
  let new_user = req.body;
  let index = findIndexById(new_user.id);
  if(index!==-1){
    res.status(400).send({message:"User already exists",status:"ignored"});
  }
  else{
    users.push(req.body);
    res.status(201).send({message:"Created user.",status:"sucess"});
  }
});

//delete a user
router.delete('/',(req, res, next)=>{
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
});

module.exports = router;
