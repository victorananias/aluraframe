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

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            "adicionar", "esvaziar"
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            "texto"
        );
    }

    adicionar(evento) {
        evento.preventDefault();
        this._listaNegociacoes.adicionar(this._criarNegociacao());
        this._limparCampos();
        this._mensagem.texto = "Negociação realizada com sucesso.";
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
        this._mensagem.texto = "Lista de negociações esvaziada.";
    }

    importar() {
        new NegociacaoService((erro, negociacoes) => {
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }
            else {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adicionar(negociacao);
                    this._mensagem.texto = "Negociações Importadas.";
                });
            }
        }).buscarNegociacoes();
    }
}
