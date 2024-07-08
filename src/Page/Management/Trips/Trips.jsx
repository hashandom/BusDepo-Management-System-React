import { Box } from "@mui/material";
import SideBar from "../../../Component/SideBar";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import { getEndpoint } from "../../../Api/endpoints";
import TableTrips from "./TableTrips";
import DialogTrips from "./DialogTrips";

export default function ManageTrips(){
    const [trigger, setTrigger] = useState(false)
    const [entityData,setEntityData] = useState([])
    const [apiRequest,setApiRequest] = useState({
        token: localStorage.getItem("token"),
        data:{}
    })

    const [vehicleData, setVehicleData] = useState([])
    const [routeData, setRouteData] = useState([])

    useEffect(() => {
        async function loadData(){
            //loading vehicle details and modifying to load in autocomplete elements
            const responseVehicles = await loadDataFromApi(getEndpoint(`vehicle`),"PATCH",apiRequest);
            setVehicleData(responseVehicles.map(vehicle => ({
                ...vehicle,
                label: `${vehicle.make}-${vehicle.model} ${vehicle.registration_number}`
            })))

            //loading route details and modifying to load in autocomplete elements
            const responseRoutes = await loadDataFromApi(getEndpoint(`route`),"PATCH",apiRequest);
            setRouteData(responseRoutes.map(route => ({
                ...route,
                label: `${route.route_number}-${route.route_name}`
            })))

            //loading trip details
            const response = await loadDataFromApi(getEndpoint(`trip`),"PATCH",apiRequest);
            setEntityData(response)
        }
        loadData()
    }, [trigger]); 

    return(
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar/>
                <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "50px" }}>
                    <h3>Trip Management</h3>
                    <DialogTrips
                        entity={{
                            id: 0,
                            vehicle_id: 0,
                            route_id: 0,
                            trip_number: 0,
                            fuel_consumed: 0,
                            distance_traveled: 0,
                            cash_collected: 0,
                            is_final: false,
                            is_active: true,
                            is_deleted: false
                        }}
                        vehicleData={vehicleData}
                        routeData={routeData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                    <TableTrips
                        vehicleData={vehicleData}
                        routeData={routeData}
                        entityData={entityData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                </Box>
            </Box>
        </>
    )
}

