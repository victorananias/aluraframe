class NegociacaoDao {

    constructor(conexao) {
        this._conexao = conexao;
        this._banco   = "negociacoes";
    }

    adicionar(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._conexao
            .transaction([this._banco], "readwrite")
            .objectStore(this._banco)
            .add(negociacao);

            // #### VAI CANCELAR A TRANSAÇÃO. O evento onerror será chamado.
            // transaction.abort();


            request.onsuccess = event => {
                resolve("Negociação cadastrada.");
            }
            request.onerror = event => {
                console.log(event.target.error.name);
                reject("Não foi possível cadastrar a negociação.");
            }
        });
    }

    listarTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._conexao.transaction([this._banco], "readwrite")
            .objectStore(this._banco).openCursor();
            let negociacoes = [];

            cursor.onsuccess = event => {
                let atual = event.target.result;

                if(atual) {
                    let dado = atual.value;
                    negociacoes.push(
                        new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }
                else {
                 // quando não há mais objects em nossa store.
                 // Isso significa que já terminados de popular negociacoes
                    console.log(negociacoes);
                    resolve(negociacoes);
                }
            }

            cursor.onerror = event => {
                console.log(event.error.name);
                reject("Não foi possível obter as negociações.")
            }
        });
    }

    apagarTodos() {
        return new Promise((resolve, reject) => {
            let request = this._conexao.transaction([this._banco], "readwrite")
            .objectStore(this._banco).clear();

            request.onsuccess = event => {
                resolve("Negociações removidas com sucesso.");
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover as negociações');
            }
        });
    }
}
