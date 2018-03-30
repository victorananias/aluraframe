class MensagemView  extends View{

    constructor(elemento) {
    /*
    |----------------------------------------------
    | constructor
    |----------------------------------------------
    |
    | Caso haja a necessidade de adicionar mais paramêtros ao construtor da classe filhas,
    | é necessário adicionar o constructor a ela e utilizar o método 'super()'
    | para adicionar os paramêtros à classe pai.
    | A chamada do super() deve ser a primeira instrução.
    |
    */
        super(elemento);
    }

    template(texto) {
        return texto ? `<p class="alert alert-info">${texto}</p>` : "<p></p>>";
    }
}
