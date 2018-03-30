class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        throw new Error("É necessário a implementação do método template.");
    }

    update(model) {
        /*
        |----------------------------------------------------------------------
        | innerHTML
        |----------------------------------------------------------------------
        |
        | É a referência do HTML interior do elemento.
        |
        */
        this._elemento.innerHTML = this.template(model);
    }
}
