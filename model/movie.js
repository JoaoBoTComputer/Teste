module.exports = class Movie{
    constructor(id,titulo,titulo_original,poster,sinopse,data_lacamento,generos_id){
        this.id = id;
        this.titulo = titulo;
        this.titulo_original = titulo_original; 
        this.poster = poster;
        this.sinopse = sinopse;
        this.data_lacamento = data_lacamento;
        this.generos_id = generos_id;
      
    }
    
}