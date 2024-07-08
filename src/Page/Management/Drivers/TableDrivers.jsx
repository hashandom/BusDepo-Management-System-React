import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import DialogDrivers from "./DialogDrivers";
import { useEffect, useState } from "react";
import getColor from "../../../Theme/colors";


export default function TableDrivers({entityData, employeeData, trigger, setTrigger}) {
    const [searchText,setSearchText] = useState("")

    useEffect(()=>{},[trigger])

    return(
        <TableContainer>
            <TextField
                variant="standard"
                label="Search"
                size="small"
                sx={{
                    float:"right",
                    marginBottom:"5px",
                }}
                value={searchText}
                onChange={(e)=>{
                    setSearchText(e.target.value)
                }}
            />
            <Table
                size="small"
                stickyHeader
            >
                <TableHead>
                    <TableRow
                        sx={{
                            "& th": {
                                color: getColor("colorTableHeaderFG"),
                                backgroundColor: getColor("colorTableHeaderBG"),
                                fontWeight: 600,
                            }
                        }}
                    >
                        <TableCell>#</TableCell>
                        <TableCell>NIC Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>                    
                </TableHead>
                <TableBody>
                    {entityData && entityData.map((entity,index) => (
                        employeeData.filter(employee => {
                            const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
                            const nicNumber = employee.nic_number.toLowerCase();
                            const search = searchText.toLowerCase();
                            
                            return (
                                (fullName.includes(search) || nicNumber.includes(search)) 
                                && employee.id == entity.employee_id
                            )
                            
                        }).map((employee)=>(
                             <TableRow
                                key={entity.id}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{employee.nic_number}</TableCell>
                                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                                <TableCell>
                                    <DialogDrivers
                                        entity={entity}
                                        employeeData={employeeData}
                                        trigger={trigger}
                                        setTrigger={setTrigger}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}