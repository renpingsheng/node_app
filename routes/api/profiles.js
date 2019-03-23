const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');

// @route  GET api/profiles/test
// @desc   返回请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({msg: "profile works"})
});


// @route  POST api/profiles/add
// @desc   创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileFields = {};
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    // 上面的代码也可以这样写
    // const profileFields = {
    //     type: req.body.type || '',
    //     describe: req.body.describe || '',
    //     income: req.body.income || '',
    //     expend: req.body.expend || '',
    //     cash: req.body.cash || '',
    //     remark: req.body.remark || '',
    // };

    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })
});


// // 查询所有信息
// router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
//     Profile.find()
//         .then((profile) => {
//             if (profile) {
//                 res.json(profile)
//             } else {
//                 res.json("获取列表失败")
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });
//
//
// // 查询单条信息
// router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
//     profileModel.findOne({_id: req.params.id})
//         .then((profile) => {
//             if (profile) {
//                 res.json(profile)
//             } else {
//                 res.json("不存在这条信息")
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });
//
//
// // 编辑信息接口
// router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
//         let profileFields = {
//             type: req.body.type || '',
//             describe: req.body.describe || '',
//             income: req.body.income || '',
//             expend: req.body.expend || '',
//             cash: req.body.cash || '',
//             remark: req.body.remark || '',
//         }
//         profileModel.findOneAndUpdate(
//             {_id: req.params.id},
//             {$set: profileFields},
//             {new: true}
//         ).then(profile => res.json(profile));
//     }
// );

// 推荐接口注释格式
// @route  POST api/profile/delete/:id
// @desc   删除信息接口
// @access Private
// router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
//         profileModel.findOneAndDelete({_id: req.params.id})
//             .then(profile => {
//                 profile.save().then(profile => res.json(profile));
//             })
//             .catch(err => res.status(404).json('删除失败!'));
//     }
// );

module.exports = router;