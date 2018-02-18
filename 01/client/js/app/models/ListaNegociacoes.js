class ListaNegociacoes {

    constructor(negociacaoCtrl, armadilha) {
        this._negociacoes = [];
        this.negociacaoCtrl = negociacaoCtrl;
        this.armadilha = armadilha;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        /*
        |----------------------------------------------------------------------
        | Reflect.apply(função, contexto, ['parametros'])
        |----------------------------------------------------------------------
        |
        | Este método executa uma função em um determinado
        | contexto com os parâmetros especificados
        |
        */
        Reflect.apply(this.armadilha, this.negociacaoCtrl, [this]);
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
        Reflect.apply(this.armadilha, this.negociacaoCtrl, [this]);
    }
}
