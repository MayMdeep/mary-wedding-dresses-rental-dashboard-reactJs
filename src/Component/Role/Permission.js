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
import { useParams } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';

const Permission = () => {
    const navigate = useNavigate() 
    const [isloading, setIsLoading] = useState(false);
    const [isloadingsave, setIsLoadingsave] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData]  = useState([])
    const { permissionid } = useParams();
    const { permissionname } = useParams();


    useEffect (() => {
        
             get_permission()
        
    },[])

    const get_permission = async () =>{
        setIsLoading(true)
        
        const { response, message } = await Helper.Get({
            url: api_Routes.permission.getOne(permissionid),
            hasToken: true,
        });

        if (response) {
            setFormData(response.data);
            setIsLoading(false)


        } 
    }

    const handleChange = (id, value) => {
        const newData = formData.map(item => {
            if (item.id === id) {
                return { ...item, has_permission: value };
            }
            return item;
        });
        setFormData(newData);
    }
    const handleSubmit = async () => {
        setIsLoadingsave(true)
        // Filter out the IDs of checkboxes with has_permission set to 1
        const checkedIds = formData.filter(item => item.has_permission === 1).map(item => item.id);
    
        const { response, message } = await Helper.Post({
            url: api_Routes.permission.add,
            data: { ids: checkedIds, id: permissionid }, // Include both sets of data in the request
            hasToken: true
        });
    
        if (response) {
            enqueueSnackbar(message,{variant:"success",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
              setIsLoadingsave(false)
        } 
        else {
            enqueueSnackbar(message,{variant:"error",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
              setIsLoadingsave(false)
        }
    }

    if (isloading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress sx={{color:"#0A722E"}} /></Box>;
    }

    return (<>
              <Container sx={{ marginBottom: "20px" }}>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <Grid item>
                        <Typography sx={{ fontSize: "27px", fontWeight: "600", color: "#1e1b1b" }}> {permissionname} Permissions</Typography>
                    </Grid>
                    <Grid item>
                    <Button 
                        variant="contained" 
                        startIcon={isloadingsave ? <CircularProgress sx={{color:"white"}} size={22}/> : <AddIcon />} 
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
                        save
                    </Button>
                    </Grid>
                </Grid>
                <Card>
            <CardContent>
                <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        {formData.map(({ id, name, has_permission }, index) => (
                            (index % 3 === 0) && (
                                <Grid item xs={12} key={id} style={{ marginBottom: '20px' }}>
                                    <Grid container spacing={3}>
                                        {formData.slice(index, index + 3).map(({ id, name, has_permission }) => (
                                            <Grid item xs={12} sm={4} key={id}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={has_permission === 1}
                                                            onChange={(e) => { handleChange(id, e.target.checked ? 1 : 0); console.log(e.target); }}
                                                        />
                                                    }
                                                    label={name}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            )
                        ))}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
            </Container>
    
    </>)
}
export default Permission