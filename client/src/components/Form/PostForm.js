import React from 'react'
import {Form, Input, Button} from "antd"
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../gql/mutations'

export default function PostForm() {
    const [form] = Form.useForm() 

    const onFinish = (values)=>{
        const {title, body} = values
        addPost({variables:{title, body}})
    }
    const [addPost] = useMutation(CREATE_POST, {update: (proxy, result)=>{
        console.log(result);
    },
    onError:(err)=> console.log(err),
    context: "dasjlk"
})
    return (
        <Form  form={form} name="post" onFinish={onFinish} scrollToFirstError >
            <Form.Item 
        name="title"
        label="Post Title "
        rules={[
          {
            required: true,
            message: 'Please Give post a title',
          },
        ]}
      >
        <Input />
      </Form.Item>
            <Form.Item 
        name="body"
        label="Post Body "
        rules={[
          {
            required: true,
            message: 'Please Give post Body',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </Form.Item>
        </Form>
    )
}
