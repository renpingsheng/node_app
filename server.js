/**
 * Created by Administrator on 2019/3/14.
 */
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express();

// 引入users.js
const users = require("./routes/api/users");
const profiles = require('./routes/api/profiles');

//DB config
const db = require("./config/keys").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);


//Connect to mongodb
mongoose.connect(db).then(()=> console.log("MongoDB Connected")).catch(err => console.log(err));

// app.get("/",(req,res) =>{
//     res.send("hello world!!");
// })

// 使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})