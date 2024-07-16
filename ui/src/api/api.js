import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true // Çerezlerin otomatik gönderilmesi için, bunu kullanmıyoruz
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Çerezden token'ı al
  console.log("Adding token to headers:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  const { data } = await api.post("/login", credentials);
  return data;
};

export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const addUser = async (user) => {
  const { data } = await api.post("/users", user);
  return data;
};