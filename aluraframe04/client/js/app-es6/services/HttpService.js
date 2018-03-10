
export class HttpService {

    get(url) {
        /*
        |----------------------------------------------------------------------
        | fetch api
        |----------------------------------------------------------------------
        |
        | A fetch api torna mais simples a utilização de requests ajax.
        |
        */
        return fetch(url)
            .then(response => this._handleErrors(response))
            .then(response => response.json());
    }

    post(url, dado) {
        return fetch(url, {
            headers: {"Content-type":"application/json"},
            method: "POST",
            body: JSON.stringify(dado)
        })
        .then(response => response);
    }

    _handleErrors(response) {
        if(!response.ok) throw new Error(response.statusText);
        return response;
    }
}
