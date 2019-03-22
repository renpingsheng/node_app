/**
 * Created by Administrator on 2019/3/14.
 * 用于 @login 和 @register
 */
// login & register
const express = require("express");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const router = express.Router();

const User = require("../../models/User");

// $route GET api/users/test
// @desc:返回的json数据
// @access: public
router.get("/test", (req, res) => {
    res.json({msg: "login works"})
})


// $route POST api/users/register
// @desc:返回的json数据
// @access: public
router.post('/register', (req, res) => {
    // 查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({email:'邮箱已被注册!'});
        } else {
            const avatar = gravatar.url(req.body.email,{s:"200",r:"pg",d:"mm"});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;
