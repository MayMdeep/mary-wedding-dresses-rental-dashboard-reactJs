import React, { useState, useEffect, Fragment,useRef } from "react";
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
import InputLabel from '@mui/material/InputLabel';
import { Switch } from '@mui/material';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import { Autocomplete } from '@mui/material';


const AddSpecificationOption = () => {
    const navigate = useNavigate()
    const controllerRef = useRef(null)

    const [isloading, setIsLoading] = useState(false);
    const [spec, setspec] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        name: "",
        specification_id: "",
        added_price:"0"
    })

    useEffect(()=>{

        get_specifications()
    
        },[])

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };
    const get_specifications = async (keyword) => {
        setIsLoading(true); // Start loading

        if (controllerRef.current) {
            controllerRef.current.abort()
        }
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal

        const { response, message } = await Helper.Get_Abort({
            url: api_Routes.specifications.view,
            signal: signal,
            data: { keywords: keyword },
            hasToken: true,
        })
        if (response) {
            setspec([])
            response.data.forEach(ele => {
                setspec(prev => [...prev, {
                    label: ele.name,
                    value: ele.id
                }])
            })
            setIsLoading(false);
        } else {
            console.log(message);
            setIsLoading(false);
        }


    }
    const handleSubmit = async () => {

        if (!formData.name) {
            enqueueSnackbar("Please add name ", {
                variant: "error", anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            setIsLoading(false);
            return;
        }
        if (!formData.specification_id) {
            enqueueSnackbar("Please add specification option ", {
                variant: "error", anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            setIsLoading(false);
            return;
        }
        setIsLoading(true);

        var form_data = new FormData();
        var updatedFormData = { ...formData };
        var valueTemp = ''



        Object.keys(updatedFormData).forEach((key) => {

            form_data.append(key, updatedFormData[key]);
        });

        form_data.append("_method", "PUT")



        const { response, message } = await Helper.Post({
            url: api_Routes.specificationOptions.add,
            data: form_data,
            hasToken: true
        });

        if (response) {
            enqueueSnackbar(message, {
                variant: "success", anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            setIsLoading(false);
            navigate('/specificationOptions')
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

    return (
        <>
            <Container sx={{ marginBottom: "20px" }}>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <Grid item>
                        <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Add Specification</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={isloading ? <CircularProgress sx={{ color: "white" }} size={22} /> : <AddIcon />}
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
                        <h3 style={{ fontWeight: 500, marginBottom: "30px" }}>Basic Information</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Specification Option Name</InputLabel>
                                    <TextField
                                        sx={{ width: { xs: "100%", sm: "auto" } }}
                                        label=" name"
                                        variant="outlined"
                                        size="small"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => { handleChange("name", e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Specifications</InputLabel>
                                    <FormControl sx={{ width: "100%" }}>
                                        <Autocomplete
                                            options={spec}
                                            size="small"
                                            getOptionLabel={(option) => option.label}
                                            value={spec.find((r) => r.value === formData.specification_id) || null}
                                            onChange={(event, newValue) => {
                                                handleChange("specification_id", newValue ? newValue.value : '');
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                get_specifications(newInputValue); // Fetch roles based on input
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="specification"
                                                    sx={{ width: { xs: "100%", sm: "90%", md: "90%", lg: "65%" } }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {isloading ? (
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
                                    <InputLabel className="inputlable">Added Price</InputLabel>
                                    <TextField
                                        type="number"
                                        sx={{ width: { xs: "100%", sm: "auto" } }}
                                        label="added price"
                                        variant="outlined"
                                        size="small"
                                        name="price"
                                        value={formData.added_price}
                                        onChange={(e) => { handleChange("added_price", e.target.value) }}
                                    />
                                </Grid>

                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

        </>
    )

}
export default AddSpecificationOption;