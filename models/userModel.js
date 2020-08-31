var users = [];

function findIndexById(id){
    for(var index=0;index<users.length;index++){
      if(users[index].id===parseInt(id)){
        return index;
      }
    }
    return -1;
  }
module.exports = {users,findIndexById};