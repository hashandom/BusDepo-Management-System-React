import { Add, Close, Delete, Recycling, Update } from "@mui/icons-material";
import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Icon, IconButton, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import { getEndpoint } from "../../../Api/endpoints";

export default function DialogRoutes({entity, routeTypeData, trigger, setTrigger}){
    const [defaultEntityData, setDefaultEntityData] = useState(
        {
            id: entity.id,
            route_type_id: entity.route_type_id,
            route_number: entity.route_number,
            route_name: entity.route_name,
            route_description: entity.route_description,
            route_length: entity.route_length,
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
        const userConfirmed = window.confirm(`Are you sure you want to delete Driver?`);
        if (userConfirmed) {
            const result = await loadDataFromApi(
                getEndpoint(`route/${entity.id}`),
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
        if(apiRequest.data.route_type_id > 0){
            setOpen(false)
            const result = await loadDataFromApi(
                getEndpoint(`route${entity.id==0 ? "" : `/${entity.id}` }`),
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
                        {entity.id == 0 ? "Create Route" : "Update Route"}
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
                            options={routeTypeData}
                            renderInput={(params) => <TextField {...params} label="Route Type"/>}
                            onChange={(e,val)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        route_type_id: val===null ? 0 : val.id
                                      }
                                }))
                            }}
                        />

                        <TextField 
                            label="Route Number" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.route_number}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        route_number: e.target.value
                                      }
                                }));
                            }}                            
                        />

                        <TextField 
                            label="Route Name" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.route_name}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        route_name: e.target.value
                                      }
                                }));
                            }}                            
                        />

                        <TextField 
                            label="Route Description" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.route_description}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        route_description: e.target.value
                                      }
                                }));
                            }}                            
                        />

                        <TextField 
                            label="Route Length" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.route_length}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        route_length: isNaN(e.target.value) ? 0 : e.target.value
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
                        startIcon={entity.id == 0 ? <Add/> : <Update/>}
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