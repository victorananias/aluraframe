"use strict";

System.register(["../models/Negociacao"], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            _export("NegociacaoDao", NegociacaoDao = function () {
                function NegociacaoDao(conexao) {
                    _classCallCheck(this, NegociacaoDao);

                    this._conexao = conexao;
                    this._banco = "negociacoes";
                }

                _createClass(NegociacaoDao, [{
                    key: "adicionar",
                    value: function adicionar(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this._conexao.transaction([_this._banco], "readwrite").objectStore(_this._banco).add(negociacao);

                            // #### VAI CANCELAR A TRANSAÇÃO. O evento onerror será chamado.
                            // transaction.abort();


                            request.onsuccess = function (event) {
                                resolve("Negociação adicionada com sucesso.");
                            };
                            request.onerror = function (event) {
                                console.log(event.target.error.name);
                                reject("Não foi possível cadastrar a negociação.");
                            };
                        });
                    }
                }, {
                    key: "listarTodos",
                    value: function listarTodos() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._conexao.transaction([_this2._banco], "readwrite").objectStore(_this2._banco).openCursor();
                            var negociacoes = [];

                            cursor.onsuccess = function (event) {
                                var atual = event.target.result;

                                if (atual) {
                                    var dado = atual.value;
                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                                    atual.continue();
                                } else {
                                    // quando não há mais objects em nossa store.
                                    // Isso significa que já terminados de popular negociacoes
                                    resolve(negociacoes);
                                }
                            };

                            cursor.onerror = function (event) {
                                console.log(event.error.name);
                                reject("Não foi possível obter as negociações.");
                            };
                        });
                    }
                }, {
                    key: "apagarTodos",
                    value: function apagarTodos() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._conexao.transaction([_this3._banco], "readwrite").objectStore(_this3._banco).clear();

                            request.onsuccess = function (event) {
                                resolve("Negociações removidas com sucesso.");
                            };

                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject('Não foi possível remover as negociações');
                            };
                        });
                    }
                }]);

                return NegociacaoDao;
            }());

            _export("NegociacaoDao", NegociacaoDao);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map