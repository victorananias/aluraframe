"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

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

            _export("DateHelper", DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    /*
                    |----------------------------------------------------------------------
                    | Error
                    |----------------------------------------------------------------------
                    |
                    | Exibe erro caso alguem tente instânciar a classe.
                    |
                    */
                    throw new Error("Está classe não deve ser instânciada.");
                }

                _createClass(DateHelper, null, [{
                    key: "textoParaData",
                    value: function textoParaData(texto) {
                        /*
                        |----------------------------------------------------------------------
                        | Expressão Regular
                        |----------------------------------------------------------------------
                        |
                        | É uma representação para encontrar um padrão em um texto.
                        | O test compara a expressão com o texto e retorna true ou false;
                        |
                        */
                        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error("O formato do texto deve ser yyyy-mm-dd");

                        /*
                        |----------------------------------------------------------------------
                        | map()
                        |----------------------------------------------------------------------
                        |
                        | Este método retorna um callback que percorre o array e permite alterar
                        | cada posição do mesmo.
                        |
                        */

                        /*
                        |----------------------------------------------------------------------
                        | Spread Operador (...)
                        |----------------------------------------------------------------------
                        |
                        | Os ... 'espalham' cada item do array como parâmetro da função.
                        |
                        */
                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split("-").map(
                        /*
                        |----------------------------------------------------------------------
                        | Arrow functions
                        |----------------------------------------------------------------------
                        |
                        | Nome dado a sintáxe de funções que são definidas com '=>'.
                        | Neste caso não há {} nem 'return' pois a mesma possui somente uma instrução.
                        |
                        */
                        function (item, indice) {
                            return item - indice % 2;
                        })))))();
                    }
                }, {
                    key: "dataParaTexto",
                    value: function dataParaTexto(data) {
                        /*
                        |----------------------------------------------------------------------
                        | Template String
                        |----------------------------------------------------------------------
                        |
                        | Adiciona uma variável dentro de uma String utilizando
                        | marcadores ${expressão}.
                        | A Template String pode substituir uma String.
                        |
                        */
                        return data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
                    }
                }]);

                return DateHelper;
            }());

            _export("DateHelper", DateHelper);
        }
    };
});
//# sourceMappingURL=DateHelper.js.map