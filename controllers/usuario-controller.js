const mysql  = require('../mysql');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const { response } = require('express');
const emailService = require('../services/email');


exports.createUser = async(req,res,next) =>{

    try{

        var query = 'SELECT * FROM usuario WHERE email = ?';

        var result = await mysql.execute(query,[req.body.email]);

        if(result.length > 0){
            return res.status(401).send({message:'Acesso negado'});
        }

        var hash = await bcrypt.hashSync(req.body.password,5);

        console.log("Data ="+req);

        const token = jwt.sign({
            nome: req.body.nome,
            sobrenome:req.body.sobrenome,
            email:req.body.email,
            data_nascimento:req.body.data_nascimento,
            password:hash
            },
            process.env.JWT_KEY,
            {expiresIn: '24h' }
        );
        
        var ulrConfirmar = "http://localhost:3000/usuario/confirm/?token="+token;
        const response = {
            message:'Confirme seu cadastro no email!',    
        } 

        var bodyEmail = `
        <html>
        <body></body>
        </html>
        <strong>Acesse o link a baixo para confirma seu cadastro <a>{0}</a></strong>
        `;

        bodyEmail = bodyEmail.replace('{0}',ulrConfirmar);

    

        emailService.sendEmail(req.body.email,bodyEmail);
        
        
        return res.status(200).send(response);
            

    }
    catch(error){
        res.status(500).send();
        console.log(error)
        
    }

};

exports.login = async(req,resp,next)=>{

    try{
        
        const query  = 'SELECT * FROM usuario WHERE email =?';
        var result = await mysql.execute(query,[req.body.email]); 

        if(result < 1){
            return resp.status(401).send({message :' 1 Falha na autenticação!'});
        }

        if (await bcrypt.compareSync(req.body.password, result[0].password)) {

            const token = jwt.sign({
                name:result[0].nome,
                userId: result[0].usuario_id,
                email: result[0].email,
                dataNasicmento: result[0].data_nascimento
            },
            process.env.JWT_KEY
            );

            return resp.status(200).send({
                name:result[0].nome,
                userId: result[0].usuario_id,
                email: result[0].email,
                dataNasicmento: result[0].data_nascimento,
                message: 'Autenticado com sucesso',
                token: token
            });
        }

        return resp.status(401).send({message :'Falha na autenticação!'});


    }catch(error){
        console.log(error);
        return resp.status(500).send();
    }

};

exports.confirmeRegister = async(req,res,next)=>{

    try{
        var dadosUsuario;
        var validToken;
        // console.log(process.env.JWT_KEY);
        // console.log(req.query.token);
        jwt.verify(req.query.token,process.env.JWT_KEY,(err,decoded)=>{
            
            // if(err){
            //     validToken = false;
            // }
            dadosUsuario = decoded;
        });
        
        if(!dadosUsuario)
            return res.status(404).send();
        
        var query = 'SELECT * FROM usuario WHERE email = ?';

        var result = await mysql.execute(query,[dadosUsuario.email]);

        if(result.length > 0){
            return res.status(401).send({message:'Link de confirmação inválido!'});
        }

        var query  = 'INSERT INTO usuario (nome,sobrenome,email,data_nascimento,password) VALUES(?,?,?,?,?)';
        result = await mysql.execute(query,
            [dadosUsuario.nome,
            dadosUsuario.sobrenome,
            dadosUsuario.email,
            dadosUsuario.data_nascimento,
            dadosUsuario.password]
        );

        const response ={
            message : 'Usuario criado com sucesso',
            createdUser :{
                userId : result.insertId,
                email: req.body.email
}
        }
        return res.status(200).send(response);
 
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }
    


};

exports.changeMail = async(req,res,next)=>{
    res.status(200).send('changeMail');
};