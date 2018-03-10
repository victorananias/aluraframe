'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, dbName, stores, version, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            dbName = 'aluraframe';
            stores = ['negociacoes'];
            version = 2;
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error("Está classe não pode ser instânciada.");
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var openRequest = window.indexedDB.open(dbName, version);

                            openRequest.onupgradeneeded = function (event) {
                                _this._createConnection(event.target.result);
                            };

                            openRequest.onsuccess = function (event) {
                                if (!connection) {
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
                                connection.close = function () {
                                    throw new Error("Você não pode fechar diretamente a conexão.");
                                };
                                resolve(connection);
                            };

                            openRequest.onerror = function (event) {
                                console.log(e.target.error);
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: '_createConnection',
                    value: function _createConnection(connection) {
                        stores.forEach(function (store) {
                            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection(connection) {
                        close();
                        connection = null;
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map