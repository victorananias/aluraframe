class HttpService {

    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            /*
            |------------------------------------------------------------------
            | onreadystatechange
            |------------------------------------------------------------------
            |
            | O ultimo parâmetro define se a requisição será assíncrona ou síncrona,
            | ou seja, se o JS deve ou não esperar a resposta do servidor antes
            | de voltar a ser executado.
            |
            */
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
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send();
        });
    }

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            /*
            |------------------------------------------------------------------
            | JSON.stringify()
            |------------------------------------------------------------------
            |
            | Converte o objeto JavaScript para uma String no formato JSON.
            |
            */
             xhr.send(JSON.stringify(dado));
        });

    }

}
