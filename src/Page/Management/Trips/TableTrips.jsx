import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import getColor from "../../../Theme/colors";
import DialogTrips from "./DialogTrips";


export default function TableTrips({entityData, vehicleData, routeData, trigger, setTrigger}) {
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
                        <TableCell>Trip Number</TableCell>
                        <TableCell>Vehicle</TableCell>
                        <TableCell>Route</TableCell>
                        <TableCell>Fuel Consumption</TableCell>
                        <TableCell>Distance Travelled</TableCell>
                        <TableCell>Cash Collected</TableCell>
                        <TableCell>Expenses</TableCell>
                        <TableCell></TableCell>
                    </TableRow>                    
                </TableHead>
                <TableBody>
                    {entityData && entityData.map((entity,index) => (
                        vehicleData.filter(vehicle => {
                            const vehicleRegistrationNumber = vehicle.registration_number.toLowerCase();
                            const vehicleMake = vehicle.make.toLowerCase();
                            const vehicleModel = vehicle.model.toLowerCase();
                            const search = searchText.toLowerCase();
                            return (
                                (vehicleRegistrationNumber.includes(search) || vehicleMake.includes(search) || vehicleModel.includes(search))
                                && vehicle.id == entity.vehicle_id
                            )                            
                        }).map((vehicle)=>(
                            routeData.filter(route => {
                                const routeName = route.route_name.toLowerCase();
                                const search = searchText.toLowerCase();
                                return (
                                    (routeName.includes(search))
                                    && route.id == entity.route_id
                                )                            
                            }).map((route) => (
                                <TableRow
                                    key={entity.id}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{entity.trip_number}</TableCell>
                                    <TableCell>{vehicle.registration_number}</TableCell>
                                    <TableCell>{route.route_name}</TableCell>
                                    <TableCell>{entity.fuel_consumed}</TableCell>
                                    <TableCell>{entity.distance_traveled}</TableCell>
                                    <TableCell>{entity.cash_collected}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <DialogTrips
                                            entity={entity}
                                            vehicleData={vehicleData}
                                            routeData={routeData}
                                            trigger={trigger}
                                            setTrigger={setTrigger}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ))
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
