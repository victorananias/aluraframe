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

        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            "adicionar", "esvaziar", "ordenar", "inverterOrdem"
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            "texto"
        );

        this._service = new NegociacaoService();

        this._init();
    }

    _init() {
        /*
        |----------------------------------------------------------------------
        | Promises
        |----------------------------------------------------------------------
        |
        | Se o then() retorna algo é possivel adicionar outro then() que receberá
        | o seu retorno.
        |
        */
        this._service
            .listar()
            .then(negociacoes => negociacoes.forEach(negociacao =>
                this._listaNegociacoes.adicionar(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        setTimeout(() => this.importar(), 3000);
    }

    adicionar(evento) {
        evento.preventDefault();

        let negociacao = this._criarNegociacao();

        this._service
        .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adicionar(negociacao);
                this._mensagem.texto = mensagem;
                this._limparCampos();
            })
            .catch(erro => this._mensagem.texto = erro);
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
        this._service
            .apagar()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvaziar();
            })
            .catch(erro => {
                this._mensagem.texto = erro;
            });
    }

    importar() {
        this._service
            .importar(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                this._listaNegociacoes.adicionar(negociacao));
                this._mensagem.texto = "Negociações Importadas.";
            })
            .catch(erro => this._mensagem.texto = erro)
    }

    ordenar(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverterOrdem();
        }
        else {
            this._listaNegociacoes.ordenar((a, b) => a[coluna] - b[coluna]);
            this._ordemAtual = coluna;
        }
    }
}
