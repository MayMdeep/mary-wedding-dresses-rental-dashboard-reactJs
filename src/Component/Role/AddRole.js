import React , {useState , useEffect , Fragment} from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography , TextField } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import InputLabel from '@mui/material/InputLabel';
import { Switch } from '@mui/material';
import { useNavigate } from "react-router-dom";

const AddRole = () => {
    const navigate = useNavigate() 
    const [isloading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData]  = useState({
        name:"",
        website: 0,
    })

    const handleChange = (key , value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

      const handleSubmit = async () => {

        if (!formData.name   ) {
            enqueueSnackbar("Please add name ",{variant:"error",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
    setIsLoading(false);
    return;
}
        setIsLoading(true);

        var form_data = new FormData();
        var updatedFormData = { ...formData };
        var valueTemp = ''
      

        
        Object.keys(updatedFormData).forEach((key) => {
            if (key === "file")
                form_data.append("file", updatedFormData.file);
            else
            form_data.append(key, updatedFormData[key]);
    });
    
         form_data.append("_method","PUT")
        
        

        const { response, message } = await Helper.Post({
            url: api_Routes.role.add,
            data: form_data,
            hasToken: true
        });

        if (response) {
            enqueueSnackbar(message,{variant:"success",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
                setIsLoading(false);
                navigate('/Role')
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
        
        return(
            <>
                <Container sx={{ marginBottom: "20px" }}>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <Grid item>
                        <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Add Role</Typography>
                    </Grid>
                    <Grid item>
                    <Button 
                        variant="contained" 
                        startIcon={isloading ? <CircularProgress sx={{color:"white"}} size={22}/> : <AddIcon />} 
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
                    <h3 style={{fontWeight:500,marginBottom:"30px"}}>Basic Information</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                  <InputLabel className="inputlable">Role Name</InputLabel>
                                    <TextField 
                                    sx={{width:{xs:"100%",sm:"auto"}}}
                                        label=" name" 
                                        variant="outlined" 
                                          size="small"
                                        name="name" 
                                        value={formData.name} 
                                        onChange={(e)=>{handleChange("name",e.target.value)}} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <InputLabel className="inputlable" >Website</InputLabel>
                                      <Switch sx={{color:"#D80621"}} checked={formData.website == "1" } onChange={(e) => { handleChange("website", e.target.checked ? 1 : 0) }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            </>
        )

}
export default AddRole