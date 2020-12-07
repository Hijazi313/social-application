const post = require("./postResolver")
const user = require("./userResolver")
const comment = require("./commentResolver")

const User = require("../../models/userSchema")

module.exports = {
    // MODIFIERS
    Post:{
        likeCount:async (parent)=> parent.likes.length,
        commentCount: async (parent)=> parent.comments.length,
        user: async (parent) =>  await User.findById(parent.user),

     },
     Like:{
        user: async (parent) =>  await User.findById(parent.user)},
    Query:{
        ...post.Query,
    },
    Mutation: {
        ...user.Mutation,
        ...post.Mutation,
        ...comment.Mutation
    },
    Subscription:{
        ...post.Subscription
    }

}