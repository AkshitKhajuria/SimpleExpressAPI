var express = require('express');
var router = express.Router();
var usr_module = require('../modules/userModule');

router.post('/test',usr_module.foo);
router.post('/sample',usr_module.bar);
// Get all users
router.get('/', usr_module.getUser);
// insert/update a user
router.put('/', usr_module.putUser);
// insert a new user, ignore if id already exists
router.post('/', usr_module.postUser);
//delete a user
router.delete('/',usr_module.deleteUser);

module.exports = router;
