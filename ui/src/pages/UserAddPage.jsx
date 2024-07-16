import React from "react";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "react-query";
import { addUser } from "../api/api"; // Doğru yolu kontrol edin

const UserAddPage = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(addUser, {
    onSuccess: () => {
      message.success("Kullanıcı başarıyla eklendi");
      form.resetFields();
    },
    onError: () => {
      message.error("Kullanıcı eklenirken bir hata oluştu");
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Ad"
        rules={[{ required: true, message: "Lütfen adınızı girin" }]}
      >
        <Input />
      </Form.Item>
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
          Kullanıcı Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserAddPage;
