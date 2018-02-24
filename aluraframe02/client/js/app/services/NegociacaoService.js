class NegociacaoService {

    buscarNegociacoes() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open("GET", "/negociacoes/semana", true);

            xhr.send();

            xhr.onreadystatechange = () => {
                /*
                |----------------------------------------------------------------------
                | States do XMLHttpRequest
                |----------------------------------------------------------------------
                |
                | 0: Requisição ainda nao iniciada.
                | 1: Conexão com o servidor estabelecida.
                | 2: Requisição recebida.
                | 3: Processando requisição.
                | 4: Requisição concluída e resposta pronta.
                |
                */
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.response).map(n =>
                            new Negociacao(
                                new Date(n.data),
                                n.quantidade,
                                n.valor
                            )
                        ));
                    }
                    else {
                        reject("Erro ao importar negociações.");
                    }
                }
            }
        });
    }

}
