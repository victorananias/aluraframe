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
        this.data = $("#data");
        this.quantidade = $("#quantidade");
        this.valor = $("#valor");
    }

    adicionar(evento) {
        evento.preventDefault();

        let negociacao = new Negociacao(
            /*
            |----------------------------------------------------------------------
            | map()
            |----------------------------------------------------------------------
            |
            | Este método retorna um callback que percorre o array e permite fazer
            | alterações no mesmo
            |
            */
            /*
            |----------------------------------------------------------------------
            | Spread Operador (...)
            |----------------------------------------------------------------------
            |
            | Os ... 'espalham' cada item do array como parâmetro da função.
            |
            */
            new Date(...this.data.value.split("-").map(
                /*
                |----------------------------------------------------------------------
                | Arrow functions
                |----------------------------------------------------------------------
                |
                | Nome dado a sintáxe de funções que são definidas com '=>'.
                | Neste caso não há {} nem 'return' pois a mesma possui somente uma instrução.
                |
                */
                (item, indice) => item - indice % 2)
            ),
            this.quantidade.value,
            this.valor.value
        );
    }
}
