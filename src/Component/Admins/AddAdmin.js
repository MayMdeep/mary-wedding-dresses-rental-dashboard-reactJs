import React, { useState, useEffect, Fragment , useRef} from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Switch } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Autocomplete } from '@mui/material';

import Files from 'react-files';

const AddAdmin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [isLoadingDetiales, setIsLoadingDetailes] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [role, setrole] = useState([])
    const controllerRef = useRef(null)
    const [isLoadingRoles, setIsLoadingRoles] = useState(false); // New state for role loading
    const [formData, setFormData] = useState({
        username: "",
        name:"",
        password: "",
        role_id:"",
        password_confirmation: "",
        active: 0,
        email: "",
    })

    useEffect(() => {

        get_role()

    }, []);

    const get_role = async (keyword) => {
        setIsLoadingRoles(true); // Start loading

        if(controllerRef.current){
            controllerRef.current.abort()
        }
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal

        const { response, message } = await Helper.Get_Abort({
            url: api_Routes.role.view,
            signal:signal,
            data:{keywords:keyword},
            hasToken: true,
        })
        if (response) {
            setrole([])
            response.data.forEach(ele => {
                setrole(prev => [...prev, {
                    label: ele.name,
                    value: ele.id
                }])
            })
            setIsLoadingRoles(false);
        } else {
            console.log(message);
        }
       

    }

    const handleChange = (key, value) => {

        setFormData(prev => ({ ...prev, [key]: value }));

    };

    const handleSubmit = async () => {

        const requiredFields = [
            "username",
            "password",
            "password_confirmation",
            "role_id",
        ];

        const missingFields = requiredFields.filter((field) => !formData[field]);

        if (missingFields.length > 0 || !formData.photo) {
            let errorMessage = "";

            if (missingFields.length > 0) {
                errorMessage += `Please fill in all required fields: ${missingFields.join(", ")}. `;
            }

            if (!formData.photo) {
                errorMessage += `Please upload a photo.`;
            }

            enqueueSnackbar(errorMessage, {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
            });

            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        var form_data = new FormData();
        var updatedFormData = { ...formData };
        var valueTemp = ''

        Object.keys(updatedFormData).forEach((key) => {
            if (key === "photo")
                form_data.append("file", updatedFormData.photo);
            else
                form_data.append(key, updatedFormData[key]);
        });


        form_data.append("_method", "PUT");



        const { response, message } = await Helper.Post({
            url: api_Routes.admin.add,
            data: form_data,
            hasToken: true
        });

        if (response) {
            enqueueSnackbar(message, {
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            navigate(`/admins`);
            setIsLoading(false);
        } else {
            let errorMessage = '';
            if (typeof message === "string") {
                errorMessage = message;
            } else if (typeof message === "object") {
                errorMessage = Object.values(message).flat().join(', ');
            }
            enqueueSnackbar(errorMessage, {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            setIsLoading(false);
        }
    };

    const [files, setFiles] = useState([]);

    function deleteFile(e) {
        setFiles([]);
        setFormData(prev => ({ ...prev, ["photo"]: "" }))
        return files

    }
    const onFilesChange = (files) => {
        setFiles(files)
        setFormData(prev => ({ ...prev, ["photo"]: files[0] }))
        console.log(files);
    }
    const onFilesError = (error, file) => {
        setFormData(prev => ({ ...prev, ["photo"]: "" }))
        setFiles(file)
    }


    return (
        <>
            <Container sx={{ marginBottom: "20px" }}>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <Grid item>
                        <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Add Admin</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={isLoading ? <CircularProgress sx={{color:"white"}} size={22} /> : <AddIcon />}
                            sx={{
                                backgroundColor: "#0A722E",
                                fontSize: "13px",
                                borderRadius: "7px",
                                height: "38px",
                                '&:hover': {
                                    backgroundColor: "#0A722E" // Green color on hover
                                }
                            }}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
                <Card>
                    <CardContent>
                        <h3>Basic information</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Username</InputLabel>
                                    <TextField
                                        sx={{ width: { xs: "100%", sm: "auto" } }}
                                        label="username"
                                        variant="outlined"
                                        size="small"
                                        value={formData.username}
                                        onChange={(e) => { handleChange("username", e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Name</InputLabel>
                                    <TextField
                                        sx={{ width: { xs: "100%", sm: "auto" } }}
                                        label="name"
                                        variant="outlined"
                                        size="small"
                                        value={formData.name}
                                        onChange={(e) => { handleChange("name", e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Email </InputLabel>
                                    <TextField
                                        label="email"
                                        size="small"
                                        variant="outlined"
                                        sx={{ width: { xs: "100%", sm: "auto" } }}
                                        value={formData.email}
                                        onChange={(e) => { handleChange("email", e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Password</InputLabel>
                                    <TextField
                                        label="password"
                                        size="small"
                                        variant="outlined"
                                        sx={{ width: { xs: "100%", sm: "auto" } }}
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => { handleChange("password", e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Password Confirmation</InputLabel>
                                    <TextField
                                        label="password confirmation"
                                        variant="outlined"
                                        sx={{ width: { xs: "100%", sm: "auto" } }}
                                        type="password"
                                        size="small"
                                        value={formData.password_confirmation}
                                        onChange={(e) => { handleChange("password_confirmation", e.target.value) }}
                                    />
                                </Grid>
                               
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Role</InputLabel>
                                    <FormControl sx={{ width: "100%" }}>
                                        <Autocomplete
                                            options={role}
                                            size="small"
                                            getOptionLabel={(option) => option.label}
                                            value={role.find((r) => r.value === formData.role_id) || null}
                                            onChange={(event, newValue) => {
                                                handleChange("role_id", newValue ? newValue.value : '');
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                get_role(newInputValue); // Fetch roles based on input
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="role"
                                                    sx={{ width: { xs: "100%", sm: "90%", md: "90%", lg: "65%" } }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {isLoadingRoles ? (
                                                                    <CircularProgress color="inherit" size={20} />
                                                                ) : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable" >Active</InputLabel>
                                    <Switch sx={{ color: "#D80621" }} checked={formData.active == "1"} onChange={(e) => { handleChange("active", e.target.checked ? 1 : 0) }} />
                                </Grid>
                               
                                <Grid item xs={12} sm={4}>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{ marginBottom: "50px" }}>
                <Card>
                    <CardContent>
                        <h3>Upload Image</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Files
                                        className='files-dropzone fileContainer'
                                        onChange={onFilesChange}
                                        onError={onFilesError}
                                        accepts={['image/*']}
                                        multiple={false}
                                        maxFileSize={10000000}
                                        minFileSize={0}
                                        clickable
                                    >
                                        {
                                            files.length > 0
                                                ? <div style={{ textAlign: "center" }}>
                                                    {files.map((file, index) =>
                                                        <div key={index}>
                                                            <img width="400px" height="200px" alt="img" src={`${file.preview.url}`} />
                                                        </div>
                                                    )}
                                                </div>

                                                : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                                                    <Button sx={{ backgroundColor: "#0A722E", color: "white", padding: "10px", '&:hover': { backgroundColor: "#0A722E", color: "white" } }} >Upload Image</Button>
                                                </div>
                                        }
                                    </Files>
                                    {files.length > 0 ?
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                                            <Button onClick={() => deleteFile(files)} sx={{ backgroundColor: "red", color: "white", padding: "8px 16px", '&:hover': { backgroundColor: "red", color: "white" } }}    >
                                                Delete
                                            </Button>
                                        </div> : ''
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    )


}
export default AddAdmin