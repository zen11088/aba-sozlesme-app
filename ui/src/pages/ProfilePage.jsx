import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Descriptions, message } from "antd";
import { fetchProfile } from "../api/api";

const ProfilePage = () => {
  const { data, error, isLoading } = useQuery(["profile"], fetchProfile);

  useEffect(() => {
    if (error) {
      message.error("Profil bilgileri yüklenirken bir hata oluştu");
    }
  }, [error]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Card title="Kullanıcı Profili">
      <Descriptions bordered>
        <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
        <Descriptions.Item label="İsim">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Telefon Numarası">
          {data.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Rol">{data.role}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProfilePage;
