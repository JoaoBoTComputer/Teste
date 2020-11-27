const mysql  = require('../mysql');
const request = require('request');
const Movie = require('../model/movie');
const MOVIEDB_CONFIG = require('../config/moviedb');
const { cookie } = require('request');


exports.searchMovie = async(req,res,next) =>{

    var query = req.query.search;


    const movies =[];
    var total_pages;
    var page = req.query.pag;

    console.log(page);


    if(query){
        var url = MOVIEDB_CONFIG.url_search_movies.replace('{0}',query);
        // console.log(url);
         await request(url,{json:true},(err,resp,body)=>{
            if(err){
                console.log("error");
            }
            
            total_pages = resp.body.total_pages;
            page = resp.body.page;

            var results = resp.body.results;

            for(let i = 0; i < results.length; i++){
                movies.push(createMovie(results[i]));
            }

            // console.log(movies.length);

            var response = {
                pages : total_pages,
                movies : movies
            }




            return res.status(200).send(JSON.stringify(response));

        });
    }
    else 
        res.status(404).send("not if");

}

exports.searchDatailsMovie = async(req,res,next) =>{
    let id = req.query.id;


    await request(MOVIEDB_CONFIG.url_search_datails_movies.replace('{id}',id),{json:true},(err2,resp2,body2)=>{
        if(err2){
            console.log("Erro na busca de detalhes:"+err2);
            res.status(500).send();
        }
            
        res.status(200).send(createMovie(resp2.body));
    })
}


//ASSISTIDO
exports.addAssistidos = async(req,res,next) =>{
    try{
        var query  = 'SELECT * FROM assistidos WHERE id_filme=? AND usuario_id =?';
        var result = await mysql.execute(query,[req.body.id_filme,req.body.usuario_id]);

        if(result.length > 0){
            console.log("filme já está adicionando em favoritos");
            return res.status(401).status("filme já está adicionando em favoritos");
        }

        query = 'INSERT INTO assistidos (id_filme,usuario_id) VALUES(?,?)';
        var result = await mysql.execute(query,
            [req.body.id_filme,
            req.body.usuario_id]
        );


        res.status(200).send();

    }catch(e){
        console.log(e);
        return res.status(500).send();
    }
}

exports.getAssistidos = async(req,res,next) =>{
    try{

        var teste = [];

        var query = "SELECT id_filme FROM assistidos WHERE usuario_id = ?"; 
        var result = await mysql.execute(query,[req.query.id]);

        for(let i =0; i < result.length; i++){
            // console.log(result[i].id_filme);
            let id = result[i].id_filme;
            var save ={
                id_filme : id
            }

            teste.push(save);
        }


        console.log(teste.length);

        res.status(200).send(teste);

    }catch(e){
        console.log(e);
        res.status(500).send();
    }
}

//FAVORITO
exports.addFavorito = async(req,res,next) =>{
    try{
        var query  = 'SELECT * FROM favorito WHERE id_filme=? AND usuario_id =?';
        var result = await mysql.execute(query,[req.body.id_filme,req.body.usuario_id]);

        if(result.length > 0){
            console.log("filme já está adicionando em favoritos");
            return res.status(401).status("filme já está adicionando em favoritos");
        }

        query = 'INSERT INTO favorito (id_filme,usuario_id) VALUES(?,?)';
        var result = await mysql.execute(query,
            [req.body.id_filme,
            req.body.usuario_id]
        );


        res.status(200).send();

    }catch(e){
        console.log(e);
        return res.status(500).send();
    }
}
exports.getFavoritos = async(req,res,next) =>{
    try{

        var teste = [];

        var query = "SELECT id_filme FROM favorito WHERE usuario_id = ?"; 
        var result = await mysql.execute(query,[req.query.id]);

        for(let i =0; i < result.length; i++){
            // console.log(result[i].id_filme);
            let id = result[i].id_filme;
            var save ={
                id_filme : id
            }

            teste.push(save);
            // await request(MOVIEDB_CONFIG.url_search_datails_movies.replace('{id}',id),{json:true},(err2,resp2,body2)=>{
            //     if(err2)
            //         console.log("Erro na busca de detalhes:"+err2);
                
            //     teste.push(createMovie(resp2.body));
            //     if((i + 1) == result.length )
            //         res.status(200).send("merda");
            //     // res.status(200).send();
            // })
        }


        console.log(teste.length);

        res.status(200).send(teste);

    }catch(e){
        console.log(e);
        res.status(500).send();
    }
}

//ASSISTIR
exports.getAssistir = async(req,res,next) =>{
    try{

        var teste = [];

        var query = "SELECT id_filme FROM assistir WHERE usuario_id = ?"; 
        var result = await mysql.execute(query,[req.query.id]);

        for(let i =0; i < result.length; i++){
            // console.log(result[i].id_filme);
            let id = result[i].id_filme;
            var save ={
                id_filme : id
            }

            teste.push(save);
        }


        console.log(teste.length);

        res.status(200).send(teste);

    }catch(e){
        console.log(e);
        res.status(500).send();
    }
}

exports.addAssistir = async(req,res,next) =>{
    try{
        var query  = 'SELECT * FROM assistir WHERE id_filme=? AND usuario_id =?';
        var result = await mysql.execute(query,[req.body.id_filme,req.body.usuario_id]);

        if(result.length > 0){
            console.log("filme já está adicionando em favoritos");
            return res.status(401).status("filme já está adicionando em favoritos");
        }

        query = 'INSERT INTO assistir (id_filme,usuario_id) VALUES(?,?)';
        var result = await mysql.execute(query,
            [req.body.id_filme,
            req.body.usuario_id]
        );


        res.status(200).send();

    }catch(e){
        console.log(e);
        return res.status(500).send();
    }
}


function createMovie(body){

    let id = body.id;
    let titulo = body.title;
    let titulo_original = body.original_title;
    let poster = body.poster_path;
    let sinopse = body.overview;
    let data_lancamento = body.release_date;

    let movie = new Movie(id,titulo,titulo_original,poster,sinopse,data_lancamento);

    return movie;
    
}