import React from "react";
import { Button, Form, Input, message, Row, Col, Card } from "antd";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 1 });
      messageApi.success("Giriş başarılı");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },
    onError: () => {
      messageApi.error("Geçersiz telefon numarası veya şifre");
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card title="Login" style={{ width: 300 }}>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="phone"
                label="Telefon Numarası"
                rules={[
                  {
                    required: true,
                    message: "Lütfen telefon numaranızı girin",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Şifre"
                rules={[{ required: true, message: "Lütfen şifrenizi girin" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={mutation.isLoading}
                >
                  Giriş Yap
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
