import api from '../../../app/api/axiosInstance';
import type {SignInput} from '../type/Authtype'

export const signin = (inputdata?:SignInput) => {
    return api.post("/auth/signin", inputdata);
}

export const signup = (inputdata?:SignInput) => {
    return api.post("/auth/signup", inputdata);
}

export const me = (signal?:AbortSignal) => {
    return api.get("/auth/me",{signal});
}

export const signout = (signal?:AbortSignal) => {
    return api.post("/auth/signout",{signal});
}

export const refresh = () => {
    return api.post("/auth/refresh");
}
