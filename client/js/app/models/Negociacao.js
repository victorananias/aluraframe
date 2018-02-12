class Negociacao {

    constructor(data, quantidade, valor) {
        this.date = data;
        this.quantidade = quantidade;
        this.valor = valor;
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
    obtemVolume() {
        return this.quantidade * this.valor;
    }
}
