import { Add, Close, Delete, Recycling, Update } from "@mui/icons-material";
import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Icon, IconButton, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import { getEndpoint } from "../../../Api/endpoints";

export default function DialogTrips({entity, vehicleData, routeData, trigger, setTrigger}){
    const [defaultEntityData, setDefaultEntityData] = useState(
        {
            id: entity.id,
            vehicle_id: entity.vehicle_id,
            route_id: entity.route_id,
            trip_number: entity.trip_number,
            fuel_consumed: entity.fuel_consumed,
            distance_traveled: entity.distance_traveled,
            cash_collected: entity.cash_collected,
            is_final: entity.is_final,
            is_active: entity.is_active,
            is_deleted: entity.is_deleted
        }
    )
    const [open, setOpen] = useState(false);
    const [apiRequest, setApiRequest] = useState({
        token: localStorage.getItem("token"),
        data:defaultEntityData
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () =>{
        setOpen(false)
        const userConfirmed = window.confirm(`Are you sure you want to delete Trip?`);
        if (userConfirmed) {
            const result = await loadDataFromApi(
                getEndpoint(`trip/${entity.id}`),
                "DELETE",
                {
                    token: localStorage.getItem("token"),
                    data: {}
                }
            )
            setTrigger(!trigger)
        }
    }

    const handleSubmit = async () => {
        if(apiRequest.data.vehicle_id > 0 && apiRequest.data.route_id > 0){
            setOpen(false)
            const result = await loadDataFromApi(
                getEndpoint(`trip${entity.id==0 ? "" : `/${entity.id}` }`),
                entity.id == 0 ? "POST" : "PUT",
                apiRequest
            )
            setTrigger(!trigger)
        }
    };

    return(
        <>
            <Button
                variant={entity.id == 0 ? "contained" : "outlined"}
                startIcon={entity.id == 0 ? <Add/> : <Update/>}
                size="small"
                onClick={handleClickOpen}
            >
                {entity.id == 0 ? "Add New" : "Update"}
            </Button>
            <Dialog
                open={open}
                fullWidth
            >
                <DialogTitle
                    sx={{
                        background:"rgba(25, 118, 210, 1)",
                        color:"white"
                    }}
                >
                    <Typography>
                        {entity.id == 0 ? "Create Trip" : "Update Trip"}
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position:'absolute',
                            right:'10px',
                            top:'10px',
                        }}
                    >
                        <Close/>
                    </IconButton>                    
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingY={2}>
                        <Autocomplete
                            disablePortal
                            options={vehicleData}
                            renderInput={(params) => <TextField {...params} label="Vehicle"/>}
                            onChange={(e,val)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        vehicle_id: val===null ? 0 : val.id
                                      }
                                }))
                            }}
                        />

                        <Autocomplete
                            disablePortal
                            options={routeData}
                            renderInput={(params) => <TextField {...params} label="Route"/>}
                            onChange={(e,val)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        route_id: val===null ? 0 : val.id
                                      }
                                }))
                            }}
                        />

                        <TextField 
                            label="Trip Number" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.trip_number}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        trip_number: e.target.value
                                    }
                                }));
                            }}
                        />

                        <TextField 
                            label="Fuel Consumption" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.fuel_consumed}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        fuel_consumed: e.target.value
                                    }
                                }));
                            }}
                        />

                        <TextField
                            label="Distance Traveled" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.distance_traveled}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        distance_traveled: e.target.value
                                    }
                                }));
                            }}
                        />
                        
                        <TextField
                            label="Cash Collected" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.cash_collected}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        cash_collected: e.target.value
                                    }
                                }));
                            }}
                        />

                        <FormControlLabel
                            label="Active"
                            control={
                                <Checkbox 
                                    checked={apiRequest.data.is_active}
                                    onChange={(e)=>{
                                        setApiRequest((prevApiRequest) => ({
                                            ...prevApiRequest,
                                            data: {
                                                ...prevApiRequest.data,
                                                is_active: e.target.checked
                                              }
                                        }))
                                    }}
                                />
                            }
                        />
                    </Stack>
                </DialogContent>
                <DialogActions
                    sx={{
                        background:"whitesmoke"
                    }}
                >
                    {entity.id > 0 && <>
                        <Button
                            variant='contained'
                            color="error"
                            startIcon={<Delete/>}
                            sx={{
                                marginRight:"20px"
                            }}
                            onClick={()=>{
                                handleDelete()
                            }}
                        >
                            Delete
                        </Button>                    
                    </>}                    
                    <Button
                        variant='contained'
                        autoFocus
                        startIcon={<Update/>}
                        onClick={()=>{
                            handleSubmit()
                        }}
                    >
                        {entity.id == 0 ? "Create" : "Update"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}