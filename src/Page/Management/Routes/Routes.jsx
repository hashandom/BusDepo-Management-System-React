import { Box } from "@mui/material";
import SideBar from "../../../Component/SideBar";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import { getEndpoint } from "../../../Api/endpoints";
import DialogRoutes from "./DialogRoutes";
import TableRoutes from "./TableRoutes";

export default function ManageRoutes(){
    const [trigger, setTrigger] = useState(false)
    const [entityData,setEntityData] = useState([])
    const [apiRequest,setApiRequest] = useState({
        token: localStorage.getItem("token"),
        data:{}
    })

    const [routeTypeData, setRouteTypeData] = useState([])

    useEffect(() => {
        async function loadData(){
            //loading route type details and modifying to load in autocomplete elements
            const responseRouteTypes = await loadDataFromApi(getEndpoint(`route_type`),"PATCH",apiRequest);
            setRouteTypeData(responseRouteTypes.map(routeType => ({
                ...routeType,
                label: `${routeType.route_type_name}`
            })))

            //loading route details
            const response = await loadDataFromApi(getEndpoint(`route`),"PATCH",apiRequest);
            setEntityData(response)
        }
        loadData()
    }, [trigger]); 

    return(
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar/>
                <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "50px" }}>
                    <h3>Route Management</h3>
                    <DialogRoutes
                        entity={{
                            id: 0,
                            route_type_id: 0,
                            route_number: "",
                            route_name: "",
                            route_description: "",
                            route_length: 0,
                            is_active: true,
                            is_deleted: false
                        }}
                        routeTypeData={routeTypeData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                    <TableRoutes
                        routeTypeData={routeTypeData}
                        entityData={entityData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                </Box>
            </Box>
        </>
    )
}

