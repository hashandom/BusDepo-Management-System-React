import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import DialogEmployees from "./DialogEmployees";
import { useEffect, useState } from "react";
import getColor from "../../../Theme/colors";


export default function TableEmployees({entityData, trigger, setTrigger}) {
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
                        <TableCell>Address</TableCell>
                        <TableCell></TableCell>
                    </TableRow>                    
                </TableHead>
                <TableBody>
                    {entityData && entityData.filter(entity => {
                        const fullName = `${entity.first_name} ${entity.last_name}`.toLowerCase();
                        const nicNumber = entity.nic_number.toLowerCase();
                        const address = `${entity.address_line_1} ${entity.address_line_2} ${entity.city}`.toLowerCase();
                        const search = searchText.toLowerCase();
                        
                        return (
                            fullName.includes(search) ||
                            nicNumber.includes(search) ||
                            address.includes(search)
                        )
                    }).map((entity,index) => (
                        <TableRow
                            key={entity.id}
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{entity.nic_number}</TableCell>
                            <TableCell>{entity.first_name} {entity.last_name}</TableCell>
                            <TableCell>{entity.address_line_1} {entity.address_line_2 !=="" && `, ${entity.address_line_2}`} {entity.city && `, ${entity.city}`}</TableCell>
                            <TableCell>
                                <DialogEmployees
                                    entity={entity}
                                    trigger={trigger}
                                    setTrigger={setTrigger}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}