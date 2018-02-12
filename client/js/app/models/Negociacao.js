class Negociacao {

    constructor(data, quantidade, valor) {

        /*
        |----------------------------------------------------------------------
        | Programação Defensiva
        |----------------------------------------------------------------------
        |
        | o new Date está 'clonando' a data
        | impedindo que ela seja alterada fora da classe
        |
        */
        this._data = new Date(data.getTime());

        this._quantidade = quantidade;
        this._valor = valor;

        /*
        |----------------------------------------------------------------------
        | Object.freeze(objeto)
        |----------------------------------------------------------------------
        |
        | como o nome diz 'congela' o objeto
        | impedindo que seja alterado
        |
        */
        Object.freeze(this);
    }

    /*
    |--------------------------------------------------------------------------
    | Métodos e Funções
    |--------------------------------------------------------------------------
    |
    | uma função fora de uma classe é uma função
    | uma função dentro de uma classe é um método
    |
    */
    get volume() {
        return this._quantidade * this._valor;
    }

    /*
    |--------------------------------------------------------------------------
    | private
    |--------------------------------------------------------------------------
    |
    | até o momento o javascript não suporta variáveis private
    | por isso será utilizada a convenção '_variavel' para "avisar"
    | que a variável é privada
    |
    */

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }
}
