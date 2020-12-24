const { UserInputError, AuthenticationError } = require("apollo-server");
const Comment = require("../../models/commentSchema");
const Post = require("../../models/postSchema");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
    Query:{
        comments: async(parent, args, context)=>{
            console.log("args",args);
            if (args.userId){
                return Comment.find({user: args.userId})            
            }
            else{
                return Comment.find({post: args.postId})            
            }
        }
    },

    Mutation: {
        createComment: async (_, {postId, body}, context)=>{
            const {_id} = checkAuth(context)

            try{
                if(body.trim() === "") throw new UserInputError("Empty Comment", { errors: {
                    body:"Comment Body must not be empty"
                }})

                const comment = new Comment({post:postId, user:_id, body})
                const newComment = await comment.save();
                return newComment
            }
            catch(err){
                 throw new Error(err)
            }
        },
        deleteComment: async (_, {postId, commentId}, context)=>{
                const {_id } =checkAuth(context);
            
                const post = await Post.findById(postId);

                if(post) {

            const commentIndex = post.comments.findIndex(c => String(c._id) ===  String(commentId));
            if(commentIndex === -1){
                throw new UserInputError('Comment Does not exist')
            }
                if(String(post.comments[commentIndex].user) === String(_id)){
                    post.comments.splice(commentIndex, 1);
                    await post.save()
                    return post
                }
             else {
                throw new AuthenticationError("Action Not Allowed");
            }
        } else{
            throw new UserInputError("Post Not Found") 
            
        }
        }
    }
}