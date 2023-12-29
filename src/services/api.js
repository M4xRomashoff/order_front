import axios from "axios";
import TokenService from "./token.service";
import env from "react-dotenv";


const API_URL = env.API_URL+"/api";
const needNewSignIn =[
    "Refresh token was expired. Please make a new signin request",
    "Refresh token is not in database!",
]


const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/signin" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await instance.post("/auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const { accessToken } = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);

                    return instance(originalConfig);
                } catch (_error) {

                    console.log('_!error',_error);
                    console.log('_!error',_error.response);
                    console.log('_!error',_error.response.data);
                    console.log('_!error',_error.response.data.message);
                    if (needNewSignIn.includes(_error.response.data.message)){

                        console.log(' need new signIn !!!');
                        localStorage.removeItem("user");
                        window.alert(_error.response.data.message);
                        window.location.href = '/login';
                    }




                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;