class Negociacao {

    constructor(data, quantidade, valor) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
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
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }
}
