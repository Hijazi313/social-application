const post = require("./postResolver")
const user = require("./userResolver")
const comment = require("./commentResolver")

module.exports = {
    // MODIFIERS
    Post:{
        likeCount:async (parent)=> parent.likes.length,
        commentCount: async (parent)=> parent.comments.length
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