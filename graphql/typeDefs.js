const {gql} = require("apollo-server-express");
module.exports = gql`
type Post{
        _id: ID!
        body: String!
        title: String!
        user: User!
        createdAt: String!
        comments:[Comment]!
        likes:[Like]!
        likeCount: Int!
        commentCount: String!
        updatedAt: String!

    }

type Comment {
    _id: ID!
    body: String!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
}
 type Like {
     _id:ID!
    user: User!
 }

type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    post:[Post]
    comment:[Comment]!
    createdAt:  String!
    updatedAt:String!
}

type ValidUser {
    user : User!
    token: String!
}

input CreateUserInput {
    name: String!
    password: String!
    email: String!
}
type Query{
    posts: [Post]
    post(postId: ID!):Post!

}

type Mutation{
    createUser(createUserInput: CreateUserInput): User!
    login(email:String!, password:String!): ValidUser! 
    createPost(title: String!, body: String!) : Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID! ): Post!
    likePost(postId:ID!):Post!

}

type Subscription {
    newPost:Post!
}
`