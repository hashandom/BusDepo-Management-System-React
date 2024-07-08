import { Add, Close, Delete, Recycling, Update } from "@mui/icons-material";
import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Icon, IconButton, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { loadDataFromApi } from "../../../Api/loadDataFromApi";
import { getEndpoint } from "../../../Api/endpoints";

export default function DialogDrivers({entity, employeeData, trigger, setTrigger}){
    const [defaultEntityData, setDefaultEntityData] = useState(
        {
            id: entity.id,
            employee_id: entity.employee_id,
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
                getEndpoint(`driver/${entity.id}`),
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
        if(apiRequest.data.employee_id > 0){
            setOpen(false)
            const result = await loadDataFromApi(
                getEndpoint(`driver${entity.id==0 ? "" : `/${entity.id}` }`),
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
                        {entity.id == 0 ? "Create Driver" : "Update Driver"}
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
                            options={employeeData

                            }
                            renderInput={(params) => <TextField {...params} label="Employee"/>}
                            onChange={(e,val)=>{
                                setApiRequest((prevApiRequest) => ({
                                    ...prevApiRequest,
                                    data: {
                                        ...prevApiRequest.data,
                                        employee_id: val===null ? 0 : val.id
                                      }
                                }))
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