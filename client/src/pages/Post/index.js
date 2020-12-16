import { useQuery } from '@apollo/client';
import React from 'react';
import {Link, useParams} from  'react-router-dom';
import { Card, Col, Row } from 'antd';

import { FETCH_POST } from '../../gql/queries';
import PostLike from '../../components/PostLike';
import PostComment from '../../components/Comments';
import CommentForm from '../../components/Form/CommentForm';


export default function Post(props) {
    const {postId} = useParams();
    const {loading, data :post } = useQuery(FETCH_POST, {
        variables: {postId},
        fetchPolicy:"no-cache"
    })
    if(loading){ 
    return (<h1>Loading ...</h1>)}
    else{
        console.log(post.post)
        const {title, _id,body, commentCount, createdAt,comments, likeCount, likes, user :{name, _id:uid}} = post.post
        return (
            <Row>
                <Col span={24}>
                    <Card type="inner" title={title}
                        actions={[<PostLike _id={_id} likeCount={likeCount} likes={likes}  />]}
                        extra={<>By <Link to={`/user/${uid}`}>{name}</Link></>}>
                        {body}
                        </Card>
                </Col>
                <Col span={24} >
                    <PostComment postId={_id} commentCount={commentCount} comments={comments}  />
                    <CommentForm postId={postId} name={name}  />
                </Col>
            </Row>
        )
    }
}