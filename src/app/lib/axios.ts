import Axios, {AxiosInstance} from 'axios'
import {AuthData} from "~/lib/auth-types";
import {AuthError} from "~/lib/custom_errors";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: false,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
});

export default axios


export function getAxiosInstance (needs_auth: boolean = false): AxiosInstance|never {
    const localUser = localStorage.getItem('auth');

    const instance = Axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        withCredentials: false,
        headers: {
            common: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    });

    if (localUser === null){
        if(needs_auth) throw new AuthError("Unauthenticated.")
        else return instance;
    }
    const authData: AuthData = JSON.parse(localUser) as AuthData;
    if (!authData.token){
        if(needs_auth) throw new AuthError("Unauthenticated.")
        else return instance;
    }

    //TODO Validate that the token hasn't expired

    instance.defaults.headers.Authorization = 'Bearer ' + authData.token;

    return instance;
}