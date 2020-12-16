import React,{useEffect, useState, useContext} from 'react'
import {useMutation} from "@apollo/client"
import {Button} from "antd"
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { AuthContext } from '../../context/auth';
import { LIKE_POST } from '../../gql/mutations';

export default function PostLike({_id, likeCount, likes,}) {
    const [liked, setLike] = useState(false);
    const {user} = useContext(AuthContext)

    const [likePost] = useMutation(LIKE_POST, {
        update:(proxy, result)=> setLike(result.data.likePost.likes.find(like => {
            return like.user._id === user._id}
            )) ,
        onError:(err)=> console.log(err)
    })

    useEffect(()=>{
        if(user && likes.find(like => like.user._id === user._id)){
            setLike(true)
        }
        else   setLike(false)
    },[user, likes])

    return (
        <>
            { liked ? <Button onClick={()=> likePost({variables: {postId: _id}})} > <HeartFilled /> {likeCount}  </Button> :
            <Button onClick={()=> likePost({variables: {postId: _id}})} ><HeartOutlined /> {likeCount} </Button> }
        </>
    )
}
