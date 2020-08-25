function foo(req,res) {
    let {num} = req.body;
    res.status(200).send({num});
}

function bar(req,res) {
    let {num} = req.body;
    res.status(200).send({num:num*-1});
}
module.exports = {foo,bar};