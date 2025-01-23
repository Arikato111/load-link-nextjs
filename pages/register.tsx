import { Button, Form, FormProps, Input, message } from "antd";
import axios, { AxiosError } from "axios";
import Head from "next/head";

type FieldType = {
    name: string, photo: string,
    username: string,
    password: string,
    inviteCode: string
};

export default function Register() {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const res = await axios.post("/api/user", values);
            messageApi.open({
                type: "success",
                content: "สร้างบัญชีสำเร็จ กรุณาเข้าสู่ระบบเพื่อใช้งาน"
            })
            window.location.href = "/login"
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;
                const reason = data?.reason;
                console.log(reason);
                if (reason === "code") {
                    messageApi.open({
                        type: "error",
                        content: "โค้ดเชิญนี้ไม่ถูกต้อง",
                        duration: 2
                    })
                } else if (reason === "username") {
                    messageApi.open({
                        type: "error",
                        content: "ชื่อผู้ใช้นี้ถูกใช้แล้ว",
                        duration: 2
                    })
                }
            }
        }

    }
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (values) => {
        messageApi.open({
            type: "error",
            content: "กรุณาป้อนข้อมูลให้ถูกต้อง"
        })
    }

    return <>
        <Head>
            <title>สร้างบัญชี</title>
        </Head>
        <main>
            {contextHolder}
            <Form
                name="register"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 800 }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="name"
                    name={"name"}
                    rules={[{ required: true, message: 'กรุณาป้อนชื่อ', max: 200 }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="photo"
                    name={"photo"}
                    rules={[{ required: true, message: "กรุณาใส่ลิงก์รูปภาพ" }, { type: "url", min: 10, max: 500 }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="username"
                    name={"username"}
                    rules={[{ required: true, max: 200, pattern: new RegExp(/^[A-Za-z0-9_]+$/), message: "username ไม่ถูกต้อง" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={"password"} label="password"
                    rules={[{ required: true, message: "กรุณาป้อนรหัสผ่าน" }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name={"inviteCode"} label="Invite code"
                    rules={[{ required: true, message: "ต้องมีโค้ดเชิญถึงสามารถสมัครได้" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        สร้างบัญชี
                    </Button>
                </Form.Item>

            </Form>
        </main>


    </>
}