const post = require("./postResolver")
const user = require("./userResolver")
const comment = require("./commentResolver")

const User = require("../../models/userSchema")
const Comment = require("../../models/commentSchema");
const Post = require("../../models/postSchema");

module.exports = {
    // MODIFIERS
    Post:{
        likeCount:async (parent)=> parent.likes.length,
        commentCount: async ({_id})=> await Comment.find({post:_id}).countDocuments(),
        user: async (parent) =>  await User.findById(parent.user),
        comments: async ({_id}) => await Comment.find({post:_id}).sort("-createdAt")

     },
     Like:{
        user: async (parent) =>  await User.findById(parent.user)},
        Comment: {
            user: async ({user}) => await User.findById(user),
            post: async ({post}) => await Post.findById(post)
        },
      User:{
        post: async ({_id})=>  await Post.find({user: _id}).sort("-createdAt"),
        comment:async ({_id})=> await Comment.find({user: _id}).sort("-createdAt")
      },    
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
