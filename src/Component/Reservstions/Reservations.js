import React , {useState , useEffect , Fragment} from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import {Typography,Container,Card,CardContent,Box,Grid,Button,  TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TablePagination from '@mui/material/TablePagination';

const Reservations = () => {

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const [ perPage, setPerPage ] = useState(10)
    const [ page, setPage ] = useState(1)
    const [values,setValues] = useState({})
    const [values_Filter, setFilter_Values] = useState({})
    const [ totalItems, setTotalItems ] = useState(0)
    const [reservation, setreservation] = useState([])

    const BaseApi = api_Routes.reservation.view


    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal
  
        get_Reservations(signal)
  
         return()=>{
          controller.abort()
        }
  
        },[values_Filter,page,perPage])

    const get_Reservations = async (signal) => {

        let url = BaseApi + '?1=1';

        if (values_Filter.name ) {
          url = url + `&name=${values_Filter.name}`;
        }
  
          setIsLoading(true)
        
        const {response, message} = await Helper.Get_Abort({
        
            url: url,
            hasToken:true,
            signal:signal,
           
              data:{
                results:perPage,
                page:page,
              }
        })
        if(response){

            setreservation([])
            setTotalItems(response.meta.total)

              response.data.forEach(elem => {
                setreservation(prev=>[...prev,{
                    id:elem.id,
                    user_name:elem.user_name,
                    dress_name:elem.dress_name,
                    rental_duration:elem.rental_duration,
                    reservation_date:elem.reservation_date,
                    confirmed:elem.confirmed == 1 ? "Confirmed" : "Canceled",
                    action: (
                        <div>

                          <span style={{paddingLeft:"15px"}} onClick={()=>{navigate(`/EditReservation/${elem.id}`)}}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="edit-icon">
                            <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#141414" fill-opacity="0.6"/>
                            <path d="M8.50008 17.69C7.89008 17.69 7.33008 17.47 6.92008 17.07C6.43008 16.58 6.22008 15.87 6.33008 15.12L6.76008 12.11C6.84008 11.53 7.22008 10.78 7.63008 10.37L15.5101 2.49C17.5001 0.499998 19.5201 0.499998 21.5101 2.49C22.6001 3.58 23.0901 4.69 22.9901 5.8C22.9001 6.7 22.4201 7.58 21.5101 8.48L13.6301 16.36C13.2201 16.77 12.4701 17.15 11.8901 17.23L8.88008 17.66C8.75008 17.69 8.62008 17.69 8.50008 17.69ZM16.5701 3.55L8.69008 11.43C8.50008 11.62 8.28008 12.06 8.24008 12.32L7.81008 15.33C7.77008 15.62 7.83008 15.86 7.98008 16.01C8.13008 16.16 8.37008 16.22 8.66008 16.18L11.6701 15.75C11.9301 15.71 12.3801 15.49 12.5601 15.3L20.4401 7.42C21.0901 6.77 21.4301 6.19 21.4801 5.65C21.5401 5 21.2001 4.31 20.4401 3.54C18.8401 1.94 17.7401 2.39 16.5701 3.55Z" fill="#141414" fill-opacity="0.6"/>
                            <path d="M19.8501 9.83003C19.7801 9.83003 19.7101 9.82003 19.6501 9.80003C17.0201 9.06003 14.9301 6.97003 14.1901 4.34003C14.0801 3.94003 14.3101 3.53003 14.7101 3.41003C15.1101 3.30003 15.5201 3.53003 15.6301 3.93003C16.2301 6.06003 17.9201 7.75003 20.0501 8.35003C20.4501 8.46003 20.6801 8.88003 20.5701 9.28003C20.4801 9.62003 20.1801 9.83003 19.8501 9.83003Z" fill="#141414" fill-opacity="0.6"/>
                            </svg>
                          </span>

                        </div>
                      ),
                    }])});

            setIsLoading(false)
          }else{
              console.log(message);
          }


    }

    const handleChangePage = (value)=>{
        console.log("per_pages",value);
        setPerPage(value)
    }

    const handlePage =(e)=>{
        setPage(e)
    }

    const handleChange = (key, value) => {
        setValues(prev => ({ ...prev, [key]:value }));
     }

    const handleFilter = ()=>{
        setFilter_Values(values)
    }

    const handleOpenDialog = (id) => {
      setRecordIdToDelete(id);
      setOpenDialog(true);
    };
      
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
    
    const handleDeleteConfirmed = async () => {
        const {response, message} = await Helper.Delete({
          url:api_Routes.role.bulkDelete(recordIdToDelete),
          hasToken:true,
        })
        if(response){
          enqueueSnackbar(message,{variant:"success",anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }}) 
          get_Reservations()
        }else{
          enqueueSnackbar(message,{variant:"error",anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
        }
        setOpenDialog(false);
    };

    return(
         <>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{color:"red"}}>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this Reservation?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button sx={{color:"red"}} onClick={handleDeleteConfirmed}>Yes, Delete</Button>
          </DialogActions>
        </Dialog>

        <Container sx={{marginBottom:"20px"}}>
            <Grid container sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Grid item>
                  <Typography sx={{fontSize:"28px" , fontWeight:"600" , color:"#1e1b1b"}} >Reservations</Typography>
                </Grid>
            </Grid>
            <Card sx={{marginTop:"20px"}}>
          <CardContent>
             <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                          <TextField 
                              id="filled-basic"
                              label="Search By Name" 
                              variant="standard" 
                              name="origin" 
                              color="primary"
                              size="small"
                              onChange={(e)=>{handleChange("name",e.target.value)}} 
                          />
                  </Grid>                 
                  <Grid item  xs={12} sm={8} >
                      
                  </Grid>
                  <Grid item  xs={12} sm={1} sx={{marginTop:"5px"}} >
                      <Button variant="contained" sx={{backgroundColor:"#0A722E",textAlign:"right" ,fontSize:"13px",borderRadius:"7px",height:"38px",'&:hover': {  backgroundColor: "#0A722E"  }}} onClick={()=> {handleFilter()}}>
                         <ManageSearchIcon />
                      </Button>
                  </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        </Container>

        {isLoading ? <LinearProgress color="success" sx={{marginTop:"30px"}} /> : 
        <Container fluid={true}>
                  <Card>
                    <CardContent>
                        <Fragment>
                            <TableContainer component={Paper} sx={{ marginTop: '30px' }} >
                                <Table>
                                    <TableHead sx={{backgroundColor:"#0A722E !important", color:"white !important"}}>
                                        <TableRow>
                                            <TableCell> Id </TableCell>
                                            <TableCell> UserName </TableCell>
                                            <TableCell> Dress Name </TableCell>
                                            <TableCell> Rental Duration </TableCell>
                                            <TableCell> Reservation Date </TableCell>
                                            <TableCell> Status </TableCell>
                                            <TableCell> Action </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reservation.map((reservation) => (
                                            <TableRow key={reservation.id}>
                                                <TableCell>{reservation.id}</TableCell>
                                                <TableCell>{reservation.user_name}</TableCell>
                                                <TableCell>{reservation.dress_name}</TableCell>
                                                <TableCell>{reservation.rental_duration}</TableCell>
                                                <TableCell>{reservation.reservation_date}</TableCell>
                                                <TableCell>{reservation.confirmed}</TableCell>
                                                <TableCell>{reservation.action  }</TableCell>               
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 25, 50 , 100]}
                              component="div"
                              count={totalItems} 
                              rowsPerPage={perPage} 
                              page={page - 1} 
                              onPageChange={(event, newPage) => handlePage(newPage + 1)} 
                              onRowsPerPageChange={(event) => {
                                setPerPage(parseInt(event.target.value, 10));
                                setPage(1); 
                              }}
                            />                         
                        </Fragment>
                    </CardContent>
                </Card>
        </Container>
      }
    
    
    
    
    
    </>)

}
export default Reservations;