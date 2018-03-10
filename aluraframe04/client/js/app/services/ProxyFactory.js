
class ProxyFactory {

    static create(objeto, acao, props) {
        /*
        |----------------------------------------------------------------------
        | Proxy(target, handlers)
        |----------------------------------------------------------------------
        |
        | Proxy é como uma camada adicionada ao objeto(target). Os handlers
        | ficam entre a camada e o objeto. Quando métodos ou atríbutos do proxy
        | forem chamados os handlers executam ações definidas (traps);
        |
        */
        return new Proxy(objeto, {
            /*
            |----------------------------------------------------------------------
            | get(target, prop, receiver) e set
            |----------------------------------------------------------------------
            |
            | target: o objeto clonado
            | prop: nome da propriedade(atributo ou função do objeto)
            | receiver: proxy do objeto
            |
            | Métodos são variáveis dentro de objetos que armazenam funções, ou seja,
            | o get declarado diretamente como função é o mesmo que 'get: function(){}'
            | O set possui value, o novo valor da propriedade.
            |
            */
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function () {
                        /*
                        |----------------------------------------------------------------------
                        | Reflect.apply(função, contexto, ['parametros'])
                        |----------------------------------------------------------------------
                        |
                        | Este método executa uma função em um determinado
                        | contexto com os parâmetros especificados.
                        | Caso a função possua um retorno é necessário retorná-lo,
                        | por isso a variável retorno foi criada.
                        | Após a execução do Reflect.apply o seu retorno é armazenado
                        | e após a execução de acao() ele será retornado.
                        |
                        */
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    };
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) acao(target);
                return retorno;
            }
        });
    }

    static _ehFuncao(prop) {
        return typeof prop == typeof Function;
    }
}
//# sourceMappingURL=ProxyFactory.js.map