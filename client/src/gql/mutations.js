import {gql} from "@apollo/client";


export const LOGIN_MUTATION = gql`
mutation login(
  $email: String!
  $password: String!
){
  login(
    email:$email
    password:$password){
    user {
        _id
        email
        name
    }
    token 
  }
}
`;


export const REGISTER_MUTATION = gql`
mutation createUser(
  $name: String!
  $email: String!
  $password: String!
){
  createUser(createUserInput: {
    name:$name
    email:$email
    password:$password
  }){
    _id
    email
    name
  }
}
`;
export const  CREATE_POST = gql`
mutation createPost(
    $title: String!
    $body: String!
    ){
        createPost(
            title: $title
            body: $body
        ){
            _id
            body
            title
        }
    }
`

export const LIKE_POST = gql`
  mutation likePost ($postId: ID!) {
    likePost(postId:$postId) {
      _id 
      likeCount
      likes {
        user {
          _id name
        }
      }
    }

  }
`


export const CREATE_COMMENT = gql`
  mutation createComment(
    $postId: ID!
    $body: String!){
     createComment(
       postId: $postId
       body:$body
     ){ 
      _id
      title
     }
   }
`;

// export const DELETE_COMMENT = 