import React,{useContext} from 'react'
import PropTypes from "prop-types"
import moment from "moment";
import {useMutation} from "@apollo/client";
import { Comment, List } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { AuthContext } from '../../context/auth';
import { DELETE_COMMENT } from '../../gql/mutations';

export default function PostComments({commentCount, comments, postId }) {
 const {user} = useContext(AuthContext);
  const [delcomment] = useMutation(DELETE_COMMENT, {
    update:async (proxy, result)=>{
      console.log(result.data);
    },
    onError: (error)=> console.log(error)
  })
 const deleteComment = (commentId)=>{
    delcomment({variables:{postId, commentId}})
 }
  return (
        <List
    className="comment-list"
    header={`${commentCount} replies`}
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={item => (
      <li>
        <Comment
          actions={item.actions}
          author={item.user.name}
          avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          content={item.body}
          datetime={moment().fromNow(item.createdAt)}
        />
        {user && user._id===item.user._id  && <DeleteFilled onClick={()=>deleteComment(item._id)}  /> }

      </li>
    )}
  />
  
    )
}
PostComments.propTypes = {
    commentCount: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
}