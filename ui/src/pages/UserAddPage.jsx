import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { addUser } from "../api/api";

const UserAddPage = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      message.success("Kullanıcı başarıyla eklendi");
      form.resetFields();
    },
    onError: () => {
      message.error("Kullanıcı eklenirken bir hata oluştu");
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="İsim"
        rules={[{ required: true, message: "Lütfen isminizi girin" }]}
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
        <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
          Kullanıcı Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserAddPage;
