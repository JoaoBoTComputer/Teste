const mysql  = require('../mysql');
const request = require('request');
const Movie = require('../model/movie');
const MOVIEDB_CONFIG = require('../config/moviedb');
const { cookie } = require('request');
const movies =[];

exports.searchMovie = async(req,res,next) =>{

    var query = req.body.query;

    // console.log(query);

    console.log(query.length > 0)

    var total_pages;
    var page;
    

    if(query.length > 0){
        var url = MOVIEDB_CONFIG.url_search_movies.replace('{0}',query);
        // console.log(url);
         await request(url,{json:true},(err,resp,body)=>{
            if(err){
                console.log("error");
            }
            
            total_pages = resp.body.total_pages;
            page = resp.body.page;

            var results = resp.body.results;

            var respt;

            res.movie = {}

            for(let i = 0; i < results.length; i++){
                let id = results[i].id;
                request(MOVIEDB_CONFIG.url_search_datails_movies.replace('{id}',id),{json:true},(err2,resp2,body2)=>{
                    if(err2)
                        console.log("Erro na busca de detalhes:"+err2);
                    
                    
                    // res.status(200).send();
                })

                // const res2 = {
                //     body : {
                //         id : id
                //     }
                // }
                // console.log(res2);


                // this.searchDatailsMovie(res2);
                // console.log(movies.length)

                // console.log(respt)
            }

            // console.log(movies[0]);
            // console.log(movies.length)


            return res.status(200).send(JSON.stringify(movies));

        });
    }
    else 
        res.status(404).send("not if");

}

exports.searchDatailsMovie = async(req) =>{
    let id = req.body.id;

    await request(MOVIEDB_CONFIG.url_search_datails_movies.replace('{id}',id),{json:true},(err2,resp2,body2)=>{
        if(err2)
            console.log("Erro na busca de detalhes:"+err2);
        
        createMovie(resp2.body);
        // res.status(200).send();
    })
}


function createMovie(body){

    let id = body.id;
    let titulo = body.title;
    let titulo_original = body.original_title;
    let generos = [];
    // for(let j =0; j < body.genre_ids.length; j++){
    //     generos.push(body.genre_ids[j].name);
    // }
    let poster = body.poster_path;
    let sinopse = body.overview;
    let data_lancamento = body.release_date;
    let duracao = body.runtime;

    let movie = new Movie(id,titulo,titulo_original,generos,poster,sinopse,data_lancamento,duracao);

    return movie;
    
}