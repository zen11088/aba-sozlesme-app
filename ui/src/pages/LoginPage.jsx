import React from "react";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "../context/useAuth";
import { useMutation } from "react-query";
import { login } from "../api/api";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user, login: authLogin } = useAuth();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      console.log("Login successful:", data);
      authLogin({ token: data.token });
      Cookies.set("token", data.token, { expires: 1 }); // Token'ı çerez olarak sakla (1 gün)
      message.success("Giriş başarılı");
      navigate("/add-user");
    },
    onError: () => {
      message.error("Geçersiz telefon numarası veya şifre");
    },
  });

  const onFinish = (values) => {
    console.log("Form values:", values);
    mutate(values);
  };

  if (user && user.token) {
    return <Navigate to="/add-user" />;
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="phone"
        label="Telefon Numarası"
        rules={[{ required: true, message: "Lütfen telefon numaranızı girin" }]}
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
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Giriş Yap
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
