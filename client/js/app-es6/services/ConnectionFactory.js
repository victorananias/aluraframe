
const dbName = 'aluraframe';
const stores = ['negociacoes'];
const version = 2;

var connection = null;
var close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error("Está classe não pode ser instânciada.");
    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = (event) => {
                this._createConnection(event.target.result);
            }

            openRequest.onsuccess = (event) => {
                if(!connection) {
                    connection = event.target.result;
                    /*
                    |----------------------------------------------------------------------
                    | Monkey Patch
                    |----------------------------------------------------------------------
                    |
                    | Sobrepondo a função close do objeto connection.
                    |
                    */
                    close = connection.close.bind(connection);
                }
                connection.close = () => {
                    throw new Error("Você não pode fechar diretamente a conexão.");
                }
                resolve(connection);
            }

            openRequest.onerror = (event) => {
                console.log(e.target.error);
                reject(e.target.error.name);
            }
        });
    }

    static _createConnection(connection) {
        stores.forEach((store) => {
            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection(connection) {
        close();
        connection = null;
    }
}
