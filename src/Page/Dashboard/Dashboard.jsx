import { Box, Card, Paper, Typography } from "@mui/material";
import SideBar from "../../Component/SideBar";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../Api/loadDataFromApi";
import { getEndpoint } from "../../Api/endpoints";
import DashboardCard from "./DashboardCard";


export default function Dashboard(){
    const [entityData,setEntityData] = useState([])
    const [apiRequest,setApiRequest] = useState({
        token: localStorage.getItem("token"),
        data:{}
    })

    useEffect(() => {
        async function loadData(){
            //loading dashboard details
            const response = await loadDataFromApi(getEndpoint(`dashboard`),"PATCH",apiRequest);
            setEntityData(response[0])
        }
        loadData()
    }, []); 

    return(
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar/>
                <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "50px" }}>
                    <h3>Dashboard</h3>

                    <Paper
                        elevation={0}
                        sx={{
                            display:'flex',
                        }}
                    >
                        <DashboardCard
                            cardTitle={"Vehicles"}
                            cardValue={entityData.vehicle_count}
                        />

                        <DashboardCard
                            cardTitle={"Drivers"}
                            cardValue={entityData.driver_count}
                        />

                        <DashboardCard
                            cardTitle={"Conductors"}
                            cardValue={entityData.conductor_count}
                        />

                        <DashboardCard
                            cardTitle={"Routes"}
                            cardValue={entityData.route_count}
                        />

                    </Paper>

                </Box>
            </Box>
        </>
    )
}