import { ProxyFactory } from '../services/ProxyFactory';

export class Bind {
    /*
    |----------------------------------------------------------------------
    |  rest parameter
    |----------------------------------------------------------------------
    |
    | Este método executa uma função em um determinado
    | contexto com os parâmetros especificados
    |
    */
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(
            model,
            model => view.update(model), // Adicionando callback que executará a função update
            props);

        view.update(model);
        return proxy;
    }
}
