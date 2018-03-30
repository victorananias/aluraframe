class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        /*
        |----------------------------------------------------------------------
        | Programção Defensiva
        |----------------------------------------------------------------------
        |
        | Concat concatena dois arrays.
        | Neste será retornado um array vazio concatenado com o array de
        | _negociacoes. Assim o array retornado será uma cópia e caso seja
        | alterado através desta função, o array _negociacoes não sofrerá
        | alteração, somente sua cópia, logo, não haverão mudanças.
        |
        */
        return [].concat(this._negociacoes);
    }

    esvaziar() {
        this._negociacoes = [];
    }
    
    get volumeTotal() {
        return this._negociacoes.reduce(
            (total, n) => total + n.volume, 0
        );
    }
}
