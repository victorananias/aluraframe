'use strict';

System.register(['../models/Negociacao', '../services/NegociacaoService', '../dao/NegociacaoDao', '../models/ListaNegociacoes', '../views/NegociacoesView', '../models/Mensagem', '../views/MensagemView', '../helpers/Bind', '../helpers/DateHelper'], function (_export, _context) {
    "use strict";

    var Negociacao, NegociacaoService, NegociacaoDao, ListaNegociacoes, NegociacoesView, Mensagem, MensagemView, Bind, DateHelper, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    /*
                    |----------------------------------------------------------------------
                    | bind()
                    |----------------------------------------------------------------------
                    |
                    | O querySelector é um método pertencente ao objeto document, ou seja,
                    | dentro dele, é utilizado o 'this' para se referir ao document.
                    | Ao ser colocado em uma variável ele perderá o contexto do objeto,
                    | deixará de ser um método e passará a ser uma função.
                    | O método bind(objeto) adiciona o contexto do objeto à função.
                    |
                    */
                    var $ = document.querySelector.bind(document);

                    /*
                    |----------------------------------------------------------------------
                    | Evitando percorrer o DOM muitas vezes
                    |----------------------------------------------------------------------
                    |
                    | Definir no construtor as variáveis que recebem elementos do DOM
                    | evita que o mesmo seja percorrido toda vez que uma função for chamada.
                    |
                    */
                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");

                    this._ordemAtual = '';

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), "adicionar", "esvaziar", "ordenar", "inverterOrdem");

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), "texto");

                    this._service = new NegociacaoService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        /*
                        |----------------------------------------------------------------------
                        | Promises
                        |----------------------------------------------------------------------
                        |
                        | Se o then() retorna algo é possivel adicionar outro then() que receberá
                        | o seu retorno.
                        |
                        */
                        this._service.listar().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adicionar(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            return _this.importar();
                        }, 3000);
                    }
                }, {
                    key: 'adicionar',
                    value: function adicionar(evento) {
                        var _this2 = this;

                        evento.preventDefault();

                        var negociacao = this._criarNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adicionar(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limparCampos();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criarNegociacao',
                    value: function _criarNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
                    }
                }, {
                    key: '_limparCampos',
                    value: function _limparCampos() {
                        this._inputData.value = "";
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0;
                    }
                }, {
                    key: 'apagar',
                    value: function apagar() {
                        var _this3 = this;

                        this._service.apagar().then(function (mensagem) {
                            _this3._mensagem.texto = mensagem;
                            _this3._listaNegociacoes.esvaziar();
                        }).catch(function (erro) {
                            _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importar',
                    value: function importar() {
                        var _this4 = this;

                        this._service.importar(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this4._listaNegociacoes.adicionar(negociacao);
                            });
                            _this4._mensagem.texto = "Negociações Importadas.";
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'ordenar',
                    value: function ordenar(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverterOrdem();
                        } else {
                            this._listaNegociacoes.ordenar(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                            this._ordemAtual = coluna;
                        }
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {

                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map