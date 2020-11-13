const jwt = require('jsonwebtoken');

exports.required =(req,res,next)=>{

    try{

        console.log(req.headers.authorization);

        
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.JWT_KEY);
            req.user =decode;
            next();
        }
        catch(err){
            console.log(err);
            res.status(401).send('Falha na autenticação!');
        }
                  
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }

};