import { Box } from "@mui/material";
import SideBar from "../../../Component/SideBar";
import DialogEmployees from "./DialogEmployees";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import TableEmployees from "./TableEmployees";
import { getEndpoint } from "../../../Api/endpoints";

export default function ManageEmployees(){
    const [trigger, setTrigger] = useState(false)
    const [entityData,setEntityData] = useState([])
    const [apiRequest,setApiRequest] = useState({
        token: localStorage.getItem("token"),
        data:{}
    })

    useEffect(() => {
        async function loadData(){
            const response = await loadDataFromApi(getEndpoint(`employee`),"PATCH",apiRequest);
            setEntityData(response)
        }
        loadData()
    }, [trigger]); 

    return(
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar/>
                <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "50px" }}>
                    <h3>Employee Management</h3>
                    <DialogEmployees
                        entity={{
                            id: 0,
                            nic_number: "",
                            first_name: "",
                            last_name: "",
                            address_line_1: "",
                            address_line_2: "",
                            city: "",
                            telephone: "",
                            email: "",
                            designation: "",
                            is_active: true,
                            is_deleted: false
                        }}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                    <TableEmployees
                        entityData={entityData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                </Box>
            </Box>
        </>
    )
}

