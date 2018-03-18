"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacao;

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

            _export("Negociacao", Negociacao = function () {
                function Negociacao(data, quantidade, valor) {
                    _classCallCheck(this, Negociacao);

                    /*
                    |----------------------------------------------------------------------
                    | Programação Defensiva
                    |----------------------------------------------------------------------
                    |
                    | Objetos dentro da classe congelada que possuem funções de alteração
                    | como o seDate()
                    | podem ser alterados através delas.
                    | O new Date está 'clonando' o objeto data,
                    | impedindo que ela seja alterada fora da classe.
                    |
                    */
                    this._data = new Date(data.getTime());

                    this._quantidade = quantidade;
                    this._valor = valor;

                    /*
                    |----------------------------------------------------------------------
                    | Object.freeze(objeto)
                    |----------------------------------------------------------------------
                    |
                    | Como o nome diz, ele 'congela' o objeto,
                    | impedindo que o mesmo seja alterado.
                    | No entanto, ele é shallow(raso), ele não congela propriedades em
                    | camadas mais profundas, como em objetos.
                    |
                    */
                    Object.freeze(this);
                }

                /*
                |--------------------------------------------------------------------------
                | Métodos e Funções
                |--------------------------------------------------------------------------
                |
                | Uma função fora de uma classe é uma função,
                | uma função dentro de uma classe é um método!
                |
                */


                _createClass(Negociacao, [{
                    key: "isEquals",
                    value: function isEquals(negociacao) {
                        /*
                        |--------------------------------------------------------------
                        | Comparando Objetos
                        |--------------------------------------------------------------
                        |
                        | Variaveis apontam para valores na memoria,
                        | toda variavel em js é uma especie de objeto,
                        | Na comaparação de variáveis te tipos literáis(primitivos) é comparado o seu valor.
                        | No entanto, Na comparação de objetos é comparado o local na memória para onde a variável aponta.
                        | Para comparar dois objetos é necessário converte-lo para texto.
                        | Serialize
                        |
                        */
                        return JSON.stringify(this) == JSON.stringify(negociacao);
                    }
                }, {
                    key: "volume",
                    get: function get() {
                        return this._quantidade * this._valor;
                    }
                }, {
                    key: "data",
                    get: function get() {
                        return new Date(this._data.getTime());
                    }
                }, {
                    key: "quantidade",
                    get: function get() {
                        return this._quantidade;
                    }
                }, {
                    key: "valor",
                    get: function get() {
                        return this._valor;
                    }
                }]);

                return Negociacao;
            }());

            _export("Negociacao", Negociacao);
        }
    };
});
//# sourceMappingURL=Negociacao.js.map