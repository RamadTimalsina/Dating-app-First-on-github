const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required:false,
      },
      verified: {
        type: Date,
       required:false,
      },
      resettokenExpiration: {
        type: String,
        required: false,
      },
      resettoken: {
        type: String,
        required: false,
      },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateofBirth: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    hometown: {
        type: String,
        required: true
    },
    datingPreferences: [
        {
            type: String,
        },
    ],
    lookingFor: {
        type: String,
        required: true
    },
    imageUrls: [
        {
            type: String,
        },
    ],
    prompts: [
        {
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
        },
    ],
    likedProfiles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    receivedLikes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,

            },
            image: {
                type: String,
                required: true
            },
            Comment: {
                type: String,

            },

        },
    ],
    matches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    blockedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});


const User = mongoose.model('User',userSchema);

module.exports = User;