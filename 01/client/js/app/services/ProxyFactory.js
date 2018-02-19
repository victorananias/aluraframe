
class ProxyFactory {

    static create(objeto, acao, props ) {
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
        return new Proxy(objeto, {
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
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function)) {
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
                        acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
}
