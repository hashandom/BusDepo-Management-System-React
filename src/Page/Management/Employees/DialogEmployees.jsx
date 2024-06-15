import { Add, Close, Delete, Recycling, Update } from "@mui/icons-material";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Icon, IconButton, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import { getEndpoint } from "../../../Api/endpoints";

export default function DialogEmployees({entity, trigger, setTrigger}){
    const [defaultEntityData, setDefaultEntityData] = useState(
        {
            id: entity.id,
            nic_number: entity.nic_number,
            first_name: entity.first_name,
            last_name: entity.last_name,
            address_line_1: entity.address_line_1,
            address_line_2: entity.address_line_2,
            city: entity.city,
            telephone: entity.telephone,
            email: entity.email,
            designation: entity.designation,
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
        const userConfirmed = window.confirm(`Are you sure you want to delete ${entity.first_name} ${entity.last_name}?`);
        if (userConfirmed) {
            const result = await loadDataFromApi(
                getEndpoint(`employee/${entity.id}`),
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
        setOpen(false)
        const result = await loadDataFromApi(
            getEndpoint(`employee${entity.id==0 ? "" : `/${entity.id}` }`),
            entity.id == 0 ? "POST" : "PUT",
            apiRequest
        )
        setTrigger(!trigger)
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
                        {entity.id == 0 ? "Create Employee" : "Update Employee"}
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
                        <TextField 
                            label="NIC Number" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.nic_number}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        nic_number: e.target.value
                                      }
                                }));
                            }}                            
                        />
                        <TextField 
                            label="First Name" 
                            size="small" 
                            variant="outlined" 
                            value={apiRequest.data.first_name}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        first_name: e.target.value
                                      }
                                }));
                            }}                            
                        />
                        <TextField
                            label="Last Name" 
                            size="small" 
                            variant="outlined"
                            value={apiRequest.data.last_name}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        last_name: e.target.value
                                      }
                                }));
                            }}
                        />
                        <TextField
                            label="Address Line 01" 
                            size="small" 
                            variant="outlined"
                            value={apiRequest.data.address_line_1}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        address_line_1: e.target.value
                                      }
                                }));
                            }}
                        />
                        <TextField
                            label="Address Line 02" 
                            size="small" 
                            variant="outlined"
                            value={apiRequest.data.address_line_2}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        address_line_2: e.target.value
                                      }
                                }));
                            }}
                        />
                        <TextField
                            label="City" 
                            size="small" 
                            variant="outlined"
                            value={apiRequest.data.city}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        city: e.target.value
                                      }
                                }));
                            }}
                        />
                        <TextField
                            label="Telephone" 
                            size="small" 
                            variant="outlined"
                            value={apiRequest.data.telephone}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        telephone: e.target.value
                                      }
                                }));
                            }}
                        />
                        <TextField
                            label="Email" 
                            size="small" 
                            variant="outlined"
                            value={apiRequest.data.email}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        email: e.target.value
                                      }
                                }));
                            }}
                        />
                        <TextField
                            label="Designation" 
                            size="small" 
                            variant="outlined"
                            value={apiRequest.data.designation}
                            onChange={(e)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        designation: e.target.value
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
                                        }));
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