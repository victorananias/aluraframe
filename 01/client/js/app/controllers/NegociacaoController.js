class NegociacaoController {

    constructor() {
        /*
        |----------------------------------------------------------------------
        | bind()
        |----------------------------------------------------------------------
        |
        | O querySelector é um método pertencente ao objeto document, ou seja,
        | dentro dele, é utilizado o 'this' para se referir ao document.
        | Ao ser colocado em uma variável ele perderá o contexto do objeto,
        | deixará de ser um método e passará a ser uma função.
        | O método bind(objeto) adiciona o contexto do objeto à função.
        |
        */
        let $ = document.querySelector.bind(document);

        /*
        |----------------------------------------------------------------------
        | Evitando percorrer o DOM muitas vezes
        |----------------------------------------------------------------------
        |
        | Definir no construtor as variáveis que recebem elementos do DOM
        | evita que o mesmo seja percorrido toda vez que uma função for chamada.
        |
        */
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes(
            /*
            |----------------------------------------------------------------------
            | Arrow functions
            |----------------------------------------------------------------------
            |
            | Possuem um 'lexical scope', isto é, seu 'this'/contexto é definido
            | no momento em que são definidas. Já em function(){} o 'this'/contexto
            | é definido na execução.
            | Caso fosse utilizado a sintaxe function(){}, _negociacoesView não seria encontrada,
            | pois nao existe no contexto da classe ListaNegociacoes. 
            |
            */
            modelo => this._negociacoesView.update(this._listaNegociacoes);
        );
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);
    }

    adicionar(evento) {
        evento.preventDefault();
        this._listaNegociacoes.adiciona(this._criarNegociacao());
        this._limparCampos();
        this._mensagemView.update("Negociação realizada com sucesso!!");
    }

    _criarNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limparCampos() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
    }

    apagar() {
        this._listaNegociacoes.esvaziar();
    }
}
