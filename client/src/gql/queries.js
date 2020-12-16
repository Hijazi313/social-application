import {gql} from "@apollo/client"
export const FETCH_POSTS = gql`
query posts{
    posts {
        _id
        body
        title
        user {
            _id
            name
        }
        likeCount
        likes {
            user {
                _id
                name
            }
        }
    }
}
`; 

export const FETCH_POST = gql`
    query post($postId: ID!){
        post(postId: $postId){
            _id
            title
            body
            user {
                _id
                name
            }
            commentCount
            comments {
                _id 
                body
                user {
                    name
                    _id
                }
                    createdAt

            }
            likeCount
            likes {
                user {
                    _id 
                    name
                }
            }
            createdAt
        }
    }
`;
