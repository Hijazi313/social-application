import React from 'react'
import {useQuery } from "@apollo/client"
import {Row} from "antd"
import PostCard from '../components/PostCard';
import PostForm from '../components/Form/PostForm';
import { FETCH_POSTS } from '../gql/queries';



export default function Home() {
    const {loading, data} = useQuery(FETCH_POSTS);

    return (
        <>
        <PostForm />
        <Row span={8} >
        
        {loading ? <h1>Loading ....</h1> : (
            data.posts.map(post => <PostCard post={post} key={post._id}  /> )
            )}
        </Row>
        </>
    )
}
