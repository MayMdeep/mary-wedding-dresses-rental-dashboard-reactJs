import React , {useState , useEffect , Fragment} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditReservation = () => {

    const { reservationid } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [openDialog1, setOpenDialog1] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
    const [ShowButton, setShowButton] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const [DetailsInfo, setDetailsInfo] = useState({});
    const navigate = useNavigate()

    useEffect(()=>{
        
        get_Details()
          
       },[])

    const get_Details = async()=>{
        const {response, message} = await Helper.Get({
        url:api_Routes.reservation.getOne(reservationid),
        hasToken:true,
    })

    if(response.data.confirmed==1 || response.data.confirmed==2 ){
        setShowButton(true);
    }
    if(response){
        setDetailsInfo(response.data)         
    }
    else{
        console.log(message);
    }

    
}

    const handleOpenDialog1 = (id) => {
        setRecordIdToDelete(id);
        setOpenDialog1(true);
    };
    const handleOpenDialog2 = (id) => {
        setRecordIdToDelete(id);
        setOpenDialog2(true);
    };

    
    const handleCloseDialog1 = () => {
        setOpenDialog1(false);
    };
    const handleCloseDialog2 = () => {
        setOpenDialog2(false);
    };

    
    const handleDeleteConfirmed = async () => {
        const {response, message} = await Helper.Post({
        url:api_Routes.reservation.update(reservationid),
        hasToken:true,
        data:{
            confirmed:recordIdToDelete
        }
        })
        if(response){
        enqueueSnackbar(message,{variant:"success",anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        }}) 
        navigate('/reservations')
        }else{
        enqueueSnackbar(message,{variant:"error",anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        }})
        }
        setOpenDialog1(false);
        setOpenDialog2(false);
        setOpenDialog3(false);
    };

    return(<>

            <Dialog open={openDialog1} onClose={handleCloseDialog1}>
                <DialogTitle sx={{color:"blue"}}>Confirm Accept</DialogTitle>
                <DialogContent>
                  <Typography>Are you sure you want to Accept this Reservation?</Typography>
                </DialogContent>
                <DialogActions>
                  <Button sx={{color:"black"}} onClick={handleCloseDialog1}>Cancel</Button>
                  <Button sx={{color:"blue"}} onClick={handleDeleteConfirmed}>Yes, Accept</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialog2} onClose={handleCloseDialog2}>
                <DialogTitle sx={{color:"#d50000"}}>Confirm Rejected</DialogTitle>
                <DialogContent>
                  <Typography>Are you sure you want to Rejecte this Reservation?</Typography>
                </DialogContent>
                <DialogActions>
                  <Button sx={{color:"black"}} onClick={handleCloseDialog2}>Cancel</Button>
                  <Button sx={{color:"#d50000"}} onClick={handleDeleteConfirmed}>Yes, Rejecte</Button>
                </DialogActions>
            </Dialog>

            <Container sx={{marginBottom:"20px"}}>
                <Grid container sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Grid item>
                      <Typography sx={{fontSize:"28px" , fontWeight:"600" , color:"#1e1b1b"}} >Edit Reservation</Typography>
                    </Grid>
                    {/* <Grid item >
                      <Button variant="contained" startIcon={<AddIcon />} sx={{backgroundColor:"#244729",fontSize:"13px",borderRadius:"7px",height:"38px",'&:hover': { backgroundColor: "#244710"  }}} onClick={(e)=>{navigate('/addFarm')}}>
                        Add Farm
                      </Button>
                    </Grid> */}
                </Grid>
                <Card sx={{marginTop:"20px"}}>
          <CardContent>
             <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item  xs={12} sm={12} sx={{marginTop:"5px" , display:"flex"}} >
                   <h3>Status is : </h3>   <h4 style={{color:"gray",paddingLeft:"5px"}}>{DetailsInfo.confirmed ===0 ? "Pending" : DetailsInfo.confirmed == 1 ? "Accepted" : DetailsInfo.confirmed == 2 ?"Rejected" :"" }</h4>
                     </Grid>

                    <Grid item  xs={12} sm={3} sx={{ display:"flex"}} >
                        <h3 style={{color:"#244729"}}>Edit To</h3>
                     </Grid>

                    <Grid item  xs={12} sm={3} sx={{marginTop:"5px"}} >
                        <Button variant="contained"   sx={{textAlign:"right" ,fontSize:"13px",borderRadius:"7px",height:"38px"}} onClick={()=> {handleOpenDialog1(1)}}>
                            Accepted
                        </Button>
                     </Grid>

                    <Grid item  xs={12} sm={3} sx={{marginTop:"5px"}} >
                        <Button variant="contained" sx={{backgroundColor:"#d50000",textAlign:"right" ,fontSize:"13px",borderRadius:"7px",height:"38px",'&:hover': {  backgroundColor: "#d50019"  }}} onClick={()=> {handleOpenDialog2(2)}}>
                           Rejected
                        </Button>
                     </Grid>
                  
                
                </Grid>
                </Box>
                </CardContent>
            </Card>
        </Container>
    
    </>)
}
export default EditReservation