const errorHandler=(err,req,res,next)=>
    {
    
        const statusCode=res.statusCode?res.statusCode:500;
        switch(statusCode)
        {
    
            case 400:
            res.json({title:"Validation Error",
            message:err.message,
            stackTrace:err.stack
            });break;
    
            case 401:
            res.json({title:"Unauthorized access",
            message:err.message,
            stackTrace:err.stackTrace
            });break;
    
            case 403:
            res.json({title:"Forbidden Aceess",
            message:err.message,
            stackTrace:err.stackTrace
            });break;
    
            case 404:
            res.jason({title:"Not Found Error",
            message:err.message,
            stackTrace:err.stackTrace
            });break;
    
            case 500:
            res.json({title:"Server Error",
            message:err.message,
            stackTrace:err.stackTrace
            });break;
    
            default:
                res.json("No error");
                break;
        }
    
    };
    
    module.exports=errorHandler;
    
    