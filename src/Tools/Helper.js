import axios from "axios";


const token = () =>{
    if(localStorage.hasOwnProperty("user")){
        return `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
    return ""
}
export const Helper = {
    Get : async ({url, hasToken, data=null}) => {
       
        try{
            const response = await axios.get(url,hasToken?{
                headers:{
                    Authorization: token() ,
                },
                params : data ? data : {}
                
            }:{
                headers:{
                },
                params : data ? data : {}
            }
            )
            if(response.success && response.status === 200){
                
                return {message:response.data.message,
                    response:response.data}  
            }else{
                return {message:response.data.message,
                    response:response.data}
            }
            
            
        }catch(err){
            console.log(err);
            const err_response = err.response.data
            if(err_response.success !== undefined && err_response.data !== undefined){
                
                if(err_response.data.length>0){
                    return { message:err_response.data}
                }else{
                    return { message:err_response.message}
                }
                
            }else{
                return { message:err.message}
            }
           
    
        
        }
    
    },
    Get_Abort : async ({url, hasToken, data=null,signal}) => {
       
        try{
            const response = await axios.get(url,hasToken?{
                headers:{
                    Authorization: token(),
                },
                params : data ? data : {},
                signal : signal
                
            }:{params : data ? data : {},
                signal : signal,
                headers:{
                }
            }
            )
            if(response.success && response.status === 200){
                return {message:response.data.message,
                    response:response.data}  
            }else{
                return {message:response.data.message,
                    response:response.data}
            }
            
            
        }catch(err){
            console.log(err);
            if(!err.response?.data){
                return { message:err.message}
            }else{
                const err_response = err.response.data
            if(err_response.success !== undefined && err_response.data !== undefined){
                
                if(err_response.data.length>0){
                    return { message:err_response.data}
                }else{
                    return { message:err_response.message}
                }
                
            }else{
                return { message:err.message}
            }
            }
            
           
    
        
        }
    
    },
    Post: async ({url, hasToken, data=null}) => {
       
        try{
            const response = await axios.post(url,data,hasToken?{
                headers:{
                    Authorization: token(),
                }
            }:{
                headers:{
                 
                },
         
            }
            )
            
            
            if(response.success && response.status === 200){
                return {message:response.data.message,
                    response:response.data
                }  
            }else{
                return {message:response.data.message,
                    response:response.data,
                }
            }
            
            
        }catch(err){

            console.log(err);
            const err_response = err.response.data
            if(err_response.success !== undefined && err_response.data !== undefined){
                
                if(err_response.data.length>0){
                    return { message:err_response.data}
                }else{
                    return { message:err_response.message}
                }
                
            }else{
                return { message:err.message}
            }
    
        
        }
    
    },
    Put: async({url, hasToken, data=null}) => {
        try{
            const response = await axios.put(url,data,hasToken?{
                headers:{
                    Authorization: token(),
                }
            }:{
                headers:{
                }
            }
            )   
            if(response.success && response.status === 200){
                return {message:response.data.message,
                    response:response.data,
                }  
            }else{
                return {message:response.data.message,
                    response:response.data,
                }
            }
            
        }catch(err){
            console.log(err);
            const err_response = err.response.data
            if(err_response.success !== undefined && err_response.data !== undefined){
                
                if(err_response.data.length>0){
                    return { message:err_response.data}
                }else{
                    return { message:err_response.message}
                }
                
            }else{
                return { message:err.message}
            }
        }

    },
    Delete: async({url, hasToken, data=null}) => {
        try{
            const response = await axios.delete(url,hasToken?{
                headers:{
                    Authorization: token(),
                },
            }:{
                headers:{
                }
            }
           ,data )
            
            
            if(response.success && response.status === 200){
                return {message:response.data.message,
                    response:response.data,
                }  
            }else{
                return {message:response.data.message,
                    response:response.data,
                }
            }
        }catch(err){
            console.log(err);
            const err_response = err.response.data
            if(err_response.success !== undefined && err_response.data !== undefined){
                
                if(err_response.data.length>0){
                    return { message:err_response.data}
                }else{
                    return { message:err_response.message}
                }
                
            }else{
                return { message:err.message}
            }
        }

    }
}
