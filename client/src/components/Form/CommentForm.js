import React,{useContext, useState} from "react";
import { Col, Row, Avatar, Button } from 'antd';
import {useMutation} from "@apollo/client"
import moment from 'moment';
import PropTypes from "prop-types";

import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
import { CREATE_COMMENT } from "../../gql/mutations";


export default function CommentForm({postId, name}){
    const {user} = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const [addComment] = useMutation(CREATE_COMMENT, {
        update:(proxy, result) => {
            console.log(result.data);
        },
        onError: (error)=> console.log(error)
    })

    const handleClick= ()=>{
        addComment({variables: {postId: postId, body:comment}});
    }
        return (
            <Row>
                <Col span={2}>
                <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt={name}
            />
                </Col>
                <Col span={22}>
                    <textarea name="" id="" cols="30" rows="10" style={{width:"100%", resize:"none"}} onChange={e=> setComment(e.target.value)} ></textarea>
                </Col>
                <Col span={4} offset={2}>
                   { user ? 
                       <Button htmlType="submit" type="primary" onClick={handleClick}  >Add Comment</Button>
                    :
                    <><Link to="/login" >Login</Link> to add a comment</>
                   } 
                </Col>
            </Row>
        )
}
CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}