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

const SpecificationsOptions = () => {

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
    const [dress, setdress] = useState([])

    const BaseApi = api_Routes.specificationOptions.view


    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal
  
        get_Specifications(signal)
  
         return()=>{
          controller.abort()
        }
  
        },[values_Filter,page,perPage])

    const get_Specifications = async (signal) => {

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

            setdress([])
            setTotalItems(response.meta.total)

              response.data.forEach(elem => {
                setdress(prev=>[...prev,{
                    id:elem.id,
                    name:elem.name,
                    spec_name:elem.specification_name,
                    added_price:elem.added_price,

                    action: (
                        <div>
                          <span onClick={() => handleOpenDialog(elem.id)} >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="delete-icon">
                            <path d="M20.9999 6.72998C20.9799 6.72998 20.9499 6.72998 20.9199 6.72998C15.6299 6.19998 10.3499 5.99998 5.11992 6.52998L3.07992 6.72998C2.65992 6.76998 2.28992 6.46998 2.24992 6.04998C2.20992 5.62998 2.50992 5.26998 2.91992 5.22998L4.95992 5.02998C10.2799 4.48998 15.6699 4.69998 21.0699 5.22998C21.4799 5.26998 21.7799 5.63998 21.7399 6.04998C21.7099 6.43998 21.3799 6.72998 20.9999 6.72998Z" fill="#141414" fill-opacity="0.6"/>
                            <path d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z" fill="#141414" fill-opacity="0.6"/>
                            <path d="M15.2099 22.75H8.7899C5.2999 22.75 5.1599 20.82 5.0499 19.26L4.3999 9.19001C4.3699 8.78001 4.6899 8.42001 5.0999 8.39001C5.5199 8.37001 5.8699 8.68001 5.8999 9.09001L6.5499 19.16C6.6599 20.68 6.6999 21.25 8.7899 21.25H15.2099C17.3099 21.25 17.3499 20.68 17.4499 19.16L18.0999 9.09001C18.1299 8.68001 18.4899 8.37001 18.8999 8.39001C19.3099 8.42001 19.6299 8.77001 19.5999 9.19001L18.9499 19.26C18.8399 20.82 18.6999 22.75 15.2099 22.75Z" fill="#141414" fill-opacity="0.6"/>
                            <path d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z" fill="#141414" fill-opacity="0.6"/>
                            <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="#141414" fill-opacity="0.6"/>
                            </svg>
                          </span>

                          <span style={{paddingLeft:"15px"}} onClick={()=>{navigate(`/EditSpecificationOption/${elem.id}`)}}>
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
          url:api_Routes.specificationOptions.bulkDelete(recordIdToDelete),
          hasToken:true,
        })
        if(response){
          enqueueSnackbar(message,{variant:"success",anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }}) 
          get_Specifications()
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
            <Typography>Are you sure you want to delete this Specification Option?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button sx={{color:"red"}} onClick={handleDeleteConfirmed}>Yes, Delete</Button>
          </DialogActions>
        </Dialog>

        <Container sx={{marginBottom:"20px"}}>
            <Grid container sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Grid item>
                  <Typography sx={{fontSize:"28px" , fontWeight:"600" , color:"#1e1b1b"}} >Specifications Options</Typography>
                </Grid>
                <Grid item >
                  <Button variant="contained" startIcon={<AddIcon />} sx={{backgroundColor:"#0A722E",fontSize:"13px",borderRadius:"7px",height:"38px",'&:hover': {  backgroundColor: "#0A722E"  }}} onClick={()=> {navigate('/AddSpecificationOption')}}>
                    Add Specification Option
                  </Button>
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
                                            <TableCell> Name </TableCell>    
                                            <TableCell> Specification Name </TableCell>                                           
                                            <TableCell> Added Price </TableCell>                                           
                                            <TableCell> Action </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dress.map((ad) => (
                                            <TableRow key={ad.id}>
                                                <TableCell>{ad.id}</TableCell>
                                                <TableCell>{ad.name}</TableCell>
                                                <TableCell>{ad.spec_name}</TableCell>
                                                <TableCell>{ad.added_price}</TableCell>
                                                <TableCell>{ad.action}</TableCell>               
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
export default SpecificationsOptions;