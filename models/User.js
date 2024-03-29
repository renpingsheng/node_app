/**
 * Created by Administrator on 2019/3/14.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    identity: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("users", UserSchema);