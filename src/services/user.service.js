
import env from "react-dotenv";
import authHeader from "./auth-header";
import api from "./api";

const API_URL = env.API_URL+"/"



const  requestMessage = (username, email, message) => {
  return api.post(API_URL + "requests", {
    username, email, message
  });
};

const  getRequests = (username, email, message) => {
  return api.get(API_URL + "requests",{ headers: authHeader()});
};

const  getOldRequests = (username, email, message) => {
  return api.get(API_URL + "oldRequests",{ headers: authHeader()});
};

const  saveComment = (id,comment) => {
  return api.put(API_URL + "requests",{ headers: authHeader(), params:{id,comment}});
};



const UserService = {
  saveComment,
  getRequests,
  getOldRequests,
  requestMessage,
}

export default UserService;
