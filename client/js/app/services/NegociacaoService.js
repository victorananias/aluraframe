class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    buscarNegociacoesSemana() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/semana").then(objeto => {
                resolve(objeto.map(n =>
                    new Negociacao(
                        new Date(n.data),
                        n.quantidade,
                        n.valor
                    )
                ));
            })
            .catch(erro => {
                console.log(erro);
                reject("Erro ao importar negociações da semana.");
            });
        });
    }

    buscarNegociacoesSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/anterior").then(objeto => {
                resolve(objeto.map(n =>
                    new Negociacao(
                        new Date(n.data),
                        n.quantidade,
                        n.valor
                    )
                ));
            })
            .catch(erro => {
                reject("Erro ao importar negociações da semana anterior.");
            });
        });
    }

    buscarNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/retrasada").then(objeto => {
                resolve(objeto.map(n =>
                    new Negociacao(
                        new Date(n.data),
                        n.quantidade,
                        n.valor
                    )
                ));
            })
            .catch(erro => {
                console.log(erro);
                reject("Erro ao importar negociações da semana retrasada.");
            });
        });
    }
}
