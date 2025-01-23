import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import userToken from '@/components/lib/userToken';

type FieldType = {
  username?: string;
  password?: string;
};


const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin(!!userToken.isLogined())
  }, [])

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await axios.post("/api/auth/login", {
        username: values.username,
        password: values.password
      });
      const token = res.data.token
      if (!token) throw new Error();
      userToken.saveToken(token)
      messageApi.open({
        type: "success",
        content: "เข้าสู่ระบบสำเร็จ"
      });
      window.location.href = "/"
    } catch (err) {
      messageApi.open({
        type: "error", content: "เข้าสู่ระบบไม่สำเร็จ username หรือ password ไม่ถูกต้อง"
      })
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <main className='p-10'>
    {
      isLogin ? <div className='text-center'>คุณได้เข้าสู่ระบบแล้ว</div> :

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
    }
  </main>
};

export default Login;