import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Col, Card } from "antd"
import { CommentOutlined, DeleteOutlined } from "@ant-design/icons";
import { AuthContext } from '../../context/auth';
import PostLike from '../PostLike';


const { Meta } = Card;

export default function PostCard({ post: { _id, title, body,likeCount, likes, user: { _id: authorId } } }) {
    // console.log(_id);
    // console.log(authorId);
    const { user  } = useContext(AuthContext);
    return (
        <Col>
            <Card
                actions={[
                    <PostLike _id={_id} likes={likes} likeCount={likeCount} /> ,
                    <Link to={`posts/${_id}`}><CommentOutlined /></Link>,
                   user &&   <DeleteOutlined />

                ]}
                style={{ width: 300 }}>
                <Meta title={title} description={body} />
            </Card>
        </Col>
    )
}
