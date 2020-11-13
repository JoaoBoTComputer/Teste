const mysql  = require('../mysql');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const { response } = require('express');


exports.createUser = async(req,res,next) =>{

    try{
    
        
        console.log(req.body);
        // var query = 'SELECT * FROM usuario WHERE email = ?';

        // var result = await mysql.execute(query,[req.body.email]);

        // if(result.length > 0){
        //     return res.status(401).send({message:'Acesso negado'});
        // }

        // var hash = await bcrypt.hashSync(req.body.password,5);

        // query  = 'INSERT INTO usuario (nome,sobrenome,email,data_nascimento,password) VALUES(?,?,?,?,?)';
        // result = await mysql.execute(query,
        //     [req.body.nome,
        //     req.body.sobrenome,
        //     req.body.email,
        //     req.body.data_nascimento,
        //     hash]);

        // const response ={
        //     message : 'Usuario criado com sucesso',
        //     createdUser :{
        //         userId : result.insertId,
        //         email: req.body.email
        //     }
        // }
            
        return res.status(201).send(response);
            

    }
    catch(error){
        console.log(error)
        return res.status(500).send({ error: error });
    }

};

exports.login = async(req,resp,next)=>{

    try{
        

        const query  = 'SELECT * FROM usuario WHERE email =?';
        var result = await mysql.execute(query,[req.body.email]); 

        if(result < 1){
            return resp.status(401).send({message :'Falha na autenticação!'});
        }

        if (await bcrypt.compareSync(req.body.password, result[0].password)) {

            const token = jwt.sign({
                userId: result[0].usuario_id,
                email: result[0].email,
                dataNasicmento: result[0].data_nascimento
            },
            process.env.JWT_KEY
            );

            return resp.status(200).send({
                message: 'Autenticado com sucesso',
                token: token
            });
        }

        return resp.status(401).send({message :'Falha na autenticação!'});


    }catch(error){
        return resp.status(500).send({error:error});
    }

};