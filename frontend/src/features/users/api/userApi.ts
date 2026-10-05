import api from "../../../app/api/axiosInstance";

export const allUser = (_payload?: void,signal?:AbortSignal) => {
    return api.get("/user/users",{signal});
}

export const createUser = (payload?:{email:string, password:string}) => {
    return api.post("/user", payload);
}

export const updateUserRole = (payload?:{id:string; changeRole:string | null}) => {
    if(payload){
        return api.put(`/role/${payload.id}`,payload.changeRole)
    }
    
}

// export const getUser = (id:string) => {
//     return axiosInstance.get("/user/id");
// }