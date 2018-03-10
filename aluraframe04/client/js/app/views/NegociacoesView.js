class NegociacoesView extends View {

    template(model) {
        /*
        |--------------------------------------------------
        | Arrow Functions
        |--------------------------------------------------
        |
        | Quando houver apenas um parâmetro pode-se
        | 'esconder' os parênteses.
        |
        */
        /*
        |----------------------------------------------
        | reduce
        |----------------------------------------------
        |
        | Reduz o array a uma única variável.
        |
        */
        return `<table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th onclick="negociacaoCtrl.ordenar('data')">DATA</th>
                            <th onclick="negociacaoCtrl.ordenar('quantidade')">QUANTIDADE</th>
                            <th onclick="negociacaoCtrl.ordenar('valor')">VALOR</th>
                            <th onclick="negociacaoCtrl.ordenar('volume')">VOLUME</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${model.negociacoes.map(n => `<tr>
                                <td>${DataHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>`).join("")}
                    </tbody>

                    <tfoot>
                        <td colspan="3"></td>
                        <td>
                            ${model.volumeTotal}
                        </td>
                    </tfoot>
                </table>`;
    }
}
//# sourceMappingURL=NegociacoesView.js.map