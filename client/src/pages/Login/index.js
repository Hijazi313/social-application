import React, {useState, useContext} from 'react';
import {useMutation} from "@apollo/client"
import {
  Form,
  Input,
  Button,
} from 'antd';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth";

import Notification from "../../components/Notification";
import { LOGIN_MUTATION } from '../../gql/mutations';


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
    const context = useContext(AuthContext)

  const [form] = Form.useForm();
  let history = useHistory()
  const [error, setError] = useState(null);
  // TODO: Error Handling with Context API
  const [loginUser] = useMutation(LOGIN_MUTATION, {
    update:(proxy, result)=> {
      // TODO:  Generate a success notification with user's name and email
      context.login(result.data.login)
      history.push("/")
    },
    onError: error => setError(error)  });

  const onFinish =  (values) => {
    const { email, password} = values;
    loginUser({variables:{ email, password}})
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      {error && <Notification type={error.name} message={error.message}   />}
      
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

      
      
         <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm