import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import userToken from '@/components/lib/userToken';
import { useRouter } from 'next/router';

type FieldType = {
  username?: string;
  password?: string;
};


const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      console.log(values);
      const res = await axios.post("/api/auth/login", {
        username: values.username,
        password: values.password
      });
      console.log(res.data.token)
      const token = res.data.token
      if (!token) throw new Error();
      userToken.saveToken(token)
      messageApi.open({
        type: "success",
        content: "Login success"
      });
      router.push("/")
    } catch (err) {
      messageApi.open({
        type: "error", content: "login failed, username or password invalid"
      })
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <div className='p-10'>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
};

export default Login;