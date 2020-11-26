module.exports = class Movie{
    constructor(id,titulo,titulo_original,generos,poster,sinopse,data_lacamento,duracao){
        this.id = id;
        this.titulo = titulo;
        this.titulo_original = titulo_original;
        this.generos = generos;
        this.poster = poster;
        this.sinopse = sinopse;
        this.data_lacamento = data_lacamento;
        this.duracao = duracao;
    }
    
}