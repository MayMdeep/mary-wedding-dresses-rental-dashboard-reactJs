import React, { Fragment, useState, useEffect } from "react";
import { Helper } from "../Tools/Helper";
import { api_Routes } from "../api_Route";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Route/AuthContext";
import Avatar from '@mui/material/Avatar';  
import Button from '@mui/material/Button';  
import Checkbox from '@mui/material/Checkbox';  
import Container from '@mui/material/Container';  
import FormControlLabel from '@mui/material/FormControlLabel';  
import Grid from '@mui/material/Grid';  
import Icon from '@mui/material/Icon';  
import Link from '@mui/material/Link';  
import Paper from '@mui/material/Paper';  
import Stack from '@mui/material/Stack';  
import TextField from '@mui/material/TextField';  
import Typography from '@mui/material/Typography';  
import Box from '@mui/material/Box';  
import photo from "../assets/dress.jpeg"
import CircularProgress from '@mui/material/CircularProgress';


export default function Login() {  
    const [email, setEmail] = React.useState('');  
    const [password, setPassword] = React.useState('');  
    const [isloading, setisloading] = useState(false);
    const navigate = useNavigate() 
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useAuth();

    useEffect(() => {

        const contentElement = document.querySelector('.content');
       
            contentElement.style.paddingLeft = '0';
    
    }, []);

    const loginAuth = async (e) => {
        e.preventDefault();
        setisloading(true)
        
        
        const {response,message} = await Helper.Post({
          url:api_Routes.auth.login,
          data:{
            username:email,
            password:password
          }
       
        })
        if(response){
          setisloading(false)
            localStorage.setItem("user",JSON.stringify({
                user_id:response.data?.id,
                token:response.data?.token,
                username:response.data?.username,
                userphoto:response.data?.photo,
                permission:response.data?.permissions,
            }))
            login(response.data.token);

            enqueueSnackbar(message,{variant:"success",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
           
        }else{
            setisloading(false)
            enqueueSnackbar(message,{variant:"error",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
    
        }
      };


    return (  
        <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
        <Paper elevation={8} sx={{ padding: '32px', textAlign: 'center' }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={2} alignItems="center">
                        <img src={photo} alt="Logo" style={{ width: "150px", height: "auto" }} />
                        <Typography variant="h5" fontWeight="bold">
                            Mary Wedding Dresses
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Sign In
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <TextField
                            fullWidth
                            label="Email"
                            required
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            required
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#244729",
                            color: "white",
                            width: "100%",
                            marginTop: "20px",
                            "&:hover": {
                                color: "#244729",
                                backgroundColor: "white",
                                border: "1px solid #244729"
                            }
                        }}
                        onClick={(e) => loginAuth(e)}
                        disabled={isloading}
                    >
                        {isloading ? <CircularProgress color="success" size={22} /> : "Login"}
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Container>
    );  
}