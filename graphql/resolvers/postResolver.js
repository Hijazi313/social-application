const {UserInputError, AuthenticationError} = require("apollo-server-express");
const Post = require("../../models/postSchema");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
        Query: {
            posts: async (parent, args, context, info)=>{
            try{
                const posts = await Post.find().sort({createdAt: -1})
                return posts
            }catch(error){
                throw new Error(error)
            }
        },
        post: async (parent, {postId : _id}) => {
            try{
                const post =  await Post.findById(_id);
                if(!post) throw new Error('Post Not Found')
                return post
            }catch(error){
                throw new Error(error)
            }

        }
    },
    Mutation: {
        createPost: async (parent, {title, body}, context)=>{
            const user = checkAuth(context);
            console.log(user);
            const post = new Post({title, body, user:user._id})

            const newPost = await post.save()

            context.pubsub.publish('NEW_POST', {
                newPost
            })
            return newPost

        },
        deletePost: async (parent, {postId:_id}, context)=>{
            const user = checkAuth(context);
            try{
                const post =  await Post.findById(_id);
                
                if(!post){
                    throw new UserInputError("This Post Doesn't exist ")
                }

                if(user._id == post.user){
                    await post.delete();
                    return "Post Deleted Successfully"
                }

                throw new AuthenticationError("Action Not Allowed")

            } catch(error){
                throw new Error(error)
            }
        },
        likePost: async (parent, {postId}, context)=>{
            const {_id} = checkAuth(context);
            const post = await Post.findById(postId);

            if(post){
                if(post.likes.find(like=> String(like.user) === String(_id))){
                    // POST already liked then unlike it
                    post.likes = post.likes.filter(like => String(like.user) !== String(_id));
                }else{
                    // Like Post
                    post.likes.push( {user:_id})
                }
                await post.save() 
                return post
            
        } else   throw new UserInputError("Post does not exist");   
        }
    },
    Subscription: {
        newPost: {
            subscribe:(parent,args,{pubsub})=> pubsub.asyncIterator('NEW_POST')
        }
    }

}