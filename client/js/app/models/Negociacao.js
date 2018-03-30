class Negociacao {

    constructor(data, quantidade, valor) {

        /*
        |----------------------------------------------------------------------
        | Programação Defensiva
        |----------------------------------------------------------------------
        |
        | Objetos dentro da classe congelada que possuem funções de alteração
        | como o seDate()
        | podem ser alterados através delas.
        | O new Date está 'clonando' o objeto data,
        | impedindo que ela seja alterada fora da classe.
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
        | Como o nome diz, ele 'congela' o objeto,
        | impedindo que o mesmo seja alterado.
        | No entanto, ele é shallow(raso), ele não congela propriedades em
        | camadas mais profundas, como em objetos.
        |
        */
        Object.freeze(this);
    }

    /*
    |--------------------------------------------------------------------------
    | Métodos e Funções
    |--------------------------------------------------------------------------
    |
    | Uma função fora de uma classe é uma função,
    | uma função dentro de uma classe é um método!
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
    | Até o momento o javascript não suporta variáveis private.
    | Por conta disso, será utilizada a convenção '_variavel' para "avisar"
    | que a mesma é privada.
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
