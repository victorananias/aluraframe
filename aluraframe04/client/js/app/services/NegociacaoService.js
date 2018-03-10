class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    buscarNegociacoesSemana() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/semana").then(objeto => resolve(objeto)).catch(erro => {
                console.log(erro);
                reject("Erro ao importar negociações da semana.");
            });
        });
    }

    buscarNegociacoesSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/anterior").then(objeto => resolve(objeto)).catch(erro => {
                reject("Erro ao importar negociações da semana anterior.");
            });
        });
    }

    buscarNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/retrasada").then(objeto => resolve(objeto)).catch(erro => {
                console.log(erro);
                reject("Erro ao importar negociações da semana retrasada.");
            });
        });
    }

    obterNegociacoes() {
        /*
        |----------------------------------------------------------------------
        | Promise.all()
        |----------------------------------------------------------------------
        |
        | Recebe um array de promises, o seu método then() retorna um array de
        | respostas. O seu catch irá retornar o primeor erro que ocorrer.
        | Promises podem são utilizadas para evitar a 'pyramid of doom',
        | onde é formada uma piramide de callbacks que dependem um do outro.
        |
        */
        return Promise.all([this.buscarNegociacoesSemana(), this.buscarNegociacoesSemanaAnterior(), this.buscarNegociacoesSemanaRetrasada()]).then(periodos => {
            let negociacoes = periodos.reduce((arrayFlatten, periodo) => arrayFlatten.concat(periodo), []).map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }

    cadastra(negociacao) {
        return ConnectionFactory.getConnection().then(conexao => new NegociacaoDao(conexao)).then(dao => dao.adicionar(negociacao)).catch(erro => {
            throw new Error(erro);
        });
    }

    apagarTodas() {
        return ConnectionFactory.getConnection().then(conexao => new NegociacaoDao(conexao)).then(dao => dao.apagarTodos()).catch(erro => {
            throw new Error(erro);
        });
    }

    listar() {
        return ConnectionFactory.getConnection().then(conexao => new NegociacaoDao(conexao)).then(dao => dao.listarTodos()).catch(erro => {
            throw new Error(erro);
        });
    }

    importar(listaAtual) {
        return this.obterNegociacoes().then(negociacoes =>
        /*
        |--------------------------------------------------------------
        | array.filter((item) => { return true or false})
        |--------------------------------------------------------------
        |
        | filter() percorre o array verificando se o item deve ou não fazer
        | parte do novo array que será retornado no final da verificação.
        |
        */
        negociacoes.filter(negociacao =>
        /*
        |----------------------------------------------------------
        | array.some((item) => {})
        |----------------------------------------------------------
        |
        | Permite realizar uma verificação com cada item do array
        | se o resultado for true a verificação para e true é retornado,
        | caso contrário false.
        |
        */
        !listaAtual.some(negociacaoExistente => negociacaoExistente.isEquals(negociacao)))).catch(erro => {
            throw new Error(erro);
        });
    }

}
//# sourceMappingURL=NegociacaoService.js.map