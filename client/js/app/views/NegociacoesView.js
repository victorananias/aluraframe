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
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${model.negociacoes.map( n =>
                            `<tr>
                                <td>${DataHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>`
                        ).join("")}
                    </tbody>

                    <tfoot>
                        <td colspan="3"></td>
                        <td>
                            ${model.negociacoes.reduce((total, n) => total + n.volume, 0)}
                        </td>
                    </tfoot>
                </table>`;
    }
}
