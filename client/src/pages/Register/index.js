import React, {useState} from 'react';
import {useMutation} from "@apollo/client"
import {useHistory} from "react-router-dom";

import {
  Form,
  Input,
  Button,
} from 'antd';
import Notification from "../../components/Notification";
import { REGISTER_MUTATION } from '../../gql/mutations';


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const RegistrationForm = () => {
  let history  = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  // TODO: Error Handling with Context API
  const [addUser] = useMutation(REGISTER_MUTATION, {
    update:(proxy, result)=>{
      // TODO:  Generate a success notification with user's name and email
      history.push('/login')
      console.log(result);
    },
    onError: error =>  setError(error)}  );

  const onFinish =  (values) => {
    const {name, email, password} = values;
     addUser({variables:{name, email, password}})
  };
  return (
    <>
    {error && <Notification type={error.name} message={error.message}   />}
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      
      <Form.Item
        name="name"
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input your Full Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      
      
         <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
export default RegistrationForm