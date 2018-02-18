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

        let self = this;

        /*
        |----------------------------------------------------------------------
        | Proxy(target, handlers)
        |----------------------------------------------------------------------
        |
        | Proxy é como uma camada adicionada ao objeto target. Os handlers
        | ficam entre a camada e o objeto. Quando o proxy for chamado os handlers
        | executam ações definidas, "traps";
        |
        */
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            /*
            |----------------------------------------------------------------------
            | get(target, prop, receiver)
            |----------------------------------------------------------------------
            |
            | target: o objeto clonado
            | prop: nome da propriedade
            | receiver: proxy do objeto
            |
            | Métodos são variáveis dentro de objetos que armazenam funções, ou seja,
            | o get declarado diretamente como função é o mesmo que 'get: function(){}'
            | EXISTE TAMBEM O MÉTODO set
            |
            */
            get(target, prop, receiver) {
                if(["adicionar", "esvaziar"].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function() {
                        /*
                        |----------------------------------------------------------------------
                        | Reflect.apply(função, contexto, ['parametros'])
                        |----------------------------------------------------------------------
                        |
                        | Este método executa uma função em um determinado
                        | contexto com os parâmetros especificados
                        |
                        */
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });

        this._mensagemView = new MensagemView($("#mensagemView"));
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);
    }

    adicionar(evento) {
        evento.preventDefault();
        this._listaNegociacoes.adicionar(this._criarNegociacao());
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
