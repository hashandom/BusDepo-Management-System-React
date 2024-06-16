import { Box } from "@mui/material";
import SideBar from "../../../Component/SideBar";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import { getEndpoint } from "../../../Api/endpoints";
import TableConductors from "./TableConductors";
import DialogConductors from "./DialogConductors";

export default function ManageConductors(){
    const [trigger, setTrigger] = useState(false)
    const [entityData,setEntityData] = useState([])
    const [apiRequest,setApiRequest] = useState({
        token: localStorage.getItem("token"),
        data:{}
    })

    const [employeeData, setEmployeeData] = useState([])

    useEffect(() => {
        async function loadData(){
            //loading employee details
            const responseEmployees = await loadDataFromApi(getEndpoint(`employee`),"PATCH",apiRequest);
            setEmployeeData(responseEmployees)

            //loading conductor details
            const response = await loadDataFromApi(getEndpoint(`conductor`),"PATCH",apiRequest);
            setEntityData(response)
        }
        loadData()
    }, [trigger]); 

    return(
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar/>
                <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "50px" }}>
                    <h3>Conductor Management</h3>
                    <DialogConductors
                        entity={{
                            id: 0,
                            employee_id: 0,
                            is_active: true,
                            is_deleted: false
                        }}
                        employeeData={employeeData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                    <TableConductors
                        employeeData={employeeData}
                        entityData={entityData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                </Box>
            </Box>
        </>
    )
}

