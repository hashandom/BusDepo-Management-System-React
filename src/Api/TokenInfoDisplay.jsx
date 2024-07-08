import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"
import readToken from "./tokenReader"

export default function TokenInfoDisplay() {
    const tokenData = readToken()
    if(tokenData){
        const tokenExpired = tokenData.exp - Math.floor(Date.now() / 1000) < 0
        return(
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={tokenExpired}
            >
                <Alert
                    severity="error"
                    variant="filled"
                >
                    Token Expired! please sign in again.
                </Alert>
            </Snackbar>
        )
    }else{
        return(
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={true}
            >
                <Alert
                    severity="error"
                    variant="filled"
                >
                    Token Not Found! please sign in again.
                </Alert>
            </Snackbar>
        )
    }
    
}