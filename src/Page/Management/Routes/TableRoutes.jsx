import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import DialogRoutes from "./DialogRoutes";
import { useEffect, useState } from "react";
import getColor from "../../../Theme/colors";

export default function TableRoutes({entityData, routeTypeData, trigger, setTrigger}) {
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
                        <TableCell>Route Type</TableCell>
                        <TableCell>Route Number</TableCell>
                        <TableCell>Route Name</TableCell>
                        <TableCell>Route Description</TableCell>
                        <TableCell>Route Length</TableCell>
                        <TableCell></TableCell>
                    </TableRow>                    
                </TableHead>
                <TableBody>
                    {entityData && entityData.map((entity,index) => (
                        routeTypeData.filter(routeType => {
                            const routeTypeName = routeType.route_type_name.toLowerCase();
                            const routeNumber = entity.route_number.toLowerCase();
                            const routeName = entity.route_name.toLowerCase();
                            const routeDescription = entity.route_description.toLowerCase();
                            const search = searchText.toLowerCase();
                            return (
                                (routeTypeName.includes(search) ||
                                routeNumber.includes(search) ||
                                routeName.includes(search) ||
                                routeDescription.includes(search)
                                )&& routeType.id == entity.route_type_id
                            )                            
                        }).map((routeType)=>(
                             <TableRow
                                key={entity.id}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{routeType.route_type_name}</TableCell>
                                <TableCell>{entity.route_number}</TableCell>
                                <TableCell>{entity.route_name}</TableCell>
                                <TableCell>{entity.route_description}</TableCell>
                                <TableCell>{entity.route_length}m</TableCell>
                                <TableCell>
                                    <DialogRoutes
                                        entity={entity}
                                        routeTypeData={routeTypeData}
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