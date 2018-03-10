export class Mensagem {

    /*
    |----------------------------------------------------------------------
    | texto = ""
    |----------------------------------------------------------------------
    |
    | Se o argumento não for passado o parâmetro irá ser igual a "".
    |
    */
    constructor(texto = "") {
        this._texto = texto;
    }

    set texto(texto) {
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }
}
