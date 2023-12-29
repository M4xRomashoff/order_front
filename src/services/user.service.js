import axios from "axios";
import env from "react-dotenv";
import authHeader from "./auth-header";
import api from "./api";

// const API_URL = "http://localhost:8080/api/user/";

const API_URL = env.API_URL+"/api/user/";

const getPublicContent = () => {
  return api.get(API_URL + "all");
};

const getUserBoard = (userId, level) => {
  return api.get(API_URL + "board",{ headers: authHeader(), params: { userId, level } });
};

const getScore = (userId) => {
  return api.get(API_URL + "score",{ headers: authHeader(), params: { userId } });
};

const getModeratorBoard = () => {
  return api.get(API_URL + "mod",{headers: authHeader()});
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", {headers: authHeader()});
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getScore,
}

export default UserService;
