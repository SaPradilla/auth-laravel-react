import api from "../api/axios";
import { loginData } from "../types/auth";

export const login = (data:loginData)=>{
    return api.post('auth/login',data)
}