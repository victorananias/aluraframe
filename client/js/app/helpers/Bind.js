'use strict';

System.register(['../services/ProxyFactory'], function (_export, _context) {
    "use strict";

    var ProxyFactory, Bind;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesProxyFactory) {
            ProxyFactory = _servicesProxyFactory.ProxyFactory;
        }],
        execute: function () {
            _export('Bind', Bind =
            /*
            |----------------------------------------------------------------------
            |  rest parameter
            |----------------------------------------------------------------------
            |
            | Este método executa uma função em um determinado
            | contexto com os parâmetros especificados
            |
            */
            function Bind(model, view) {
                _classCallCheck(this, Bind);

                for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    props[_key - 2] = arguments[_key];
                }

                var proxy = ProxyFactory.create(model, function (model) {
                    return view.update(model);
                }, // Adicionando callback que executará a função update
                props);

                view.update(model);
                return proxy;
            });

            _export('Bind', Bind);
        }
    };
});
//# sourceMappingURL=Bind.js.map