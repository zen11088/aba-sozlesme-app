import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, message } from "antd";
import { fetchUsers } from "../api/api";

const DashboardPage = () => {
  const { data, error, isLoading } = useQuery(["users"], fetchUsers);

  useEffect(() => {
    if (error) {
      message.error("Kullanıcılar yüklenirken bir hata oluştu");
    }
  }, [error]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
  ];

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default DashboardPage;
