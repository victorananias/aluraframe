'use strict';

System.register(['./HttpService', '../models/Negociacao', './ConnectionFactory', '../dao/NegociacaoDao'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao, ConnectionFactory, NegociacaoDao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'buscarNegociacoesSemana',
                    value: function buscarNegociacoesSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get("negociacoes/semana").then(function (objeto) {
                                return resolve(objeto);
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Erro ao importar negociações da semana.");
                            });
                        });
                    }
                }, {
                    key: 'buscarNegociacoesSemanaAnterior',
                    value: function buscarNegociacoesSemanaAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get("negociacoes/anterior").then(function (objeto) {
                                return resolve(objeto);
                            }).catch(function (erro) {
                                reject("Erro ao importar negociações da semana anterior.");
                            });
                        });
                    }
                }, {
                    key: 'buscarNegociacoesSemanaRetrasada',
                    value: function buscarNegociacoesSemanaRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get("negociacoes/retrasada").then(function (objeto) {
                                return resolve(objeto);
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Erro ao importar negociações da semana retrasada.");
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoes',
                    value: function obterNegociacoes() {
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
                        return Promise.all([this.buscarNegociacoesSemana(), this.buscarNegociacoesSemanaAnterior(), this.buscarNegociacoesSemanaRetrasada()]).then(function (periodos) {
                            var negociacoes = periodos.reduce(function (arrayFlatten, periodo) {
                                return arrayFlatten.concat(periodo);
                            }, []).map(function (negociacao) {
                                return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                            });

                            return negociacoes;
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'cadastra',
                    value: function cadastra(negociacao) {
                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.adicionar(negociacao);
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'apagarTodas',
                    value: function apagarTodas() {
                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.apagarTodos();
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'listar',
                    value: function listar() {
                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.listarTodos();
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'importar',
                    value: function importar(listaAtual) {
                        return this.obterNegociacoes().then(function (negociacoes) {
                            return (
                                /*
                                |--------------------------------------------------------------
                                | array.filter((item) => { return true or false})
                                |--------------------------------------------------------------
                                |
                                | filter() percorre o array verificando se o item deve ou não fazer
                                | parte do novo array que será retornado no final da verificação.
                                |
                                */
                                negociacoes.filter(function (negociacao) {
                                    return (
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
                                        !listaAtual.some(function (negociacaoExistente) {
                                            return negociacaoExistente.isEquals(negociacao);
                                        })
                                    );
                                })
                            );
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map