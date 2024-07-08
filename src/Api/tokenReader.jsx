import { jwtDecode } from "jwt-decode"

export default function readToken(){
    const token = localStorage.getItem("token")
    if(token){
        return jwtDecode(token)
    }else{
        return false
    }
}