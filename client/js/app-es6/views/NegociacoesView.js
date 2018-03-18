import { DateHelper } from '../helpers/DateHelper';
import { View } from './View';
import { currentInstance } from '../controllers/NegociacaoController';


/*
|----------------------------------------------
| export e import
|----------------------------------------------
|
| Somente onde foi utilizado o export poderá ser usado o import.
|
*/
export class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);

        elemento.addEventListener('click', function(event) {
            if(event.target.nodeName == 'TH') {
                currentInstance().ordenar(event.target.textContent.toLowerCase());
            }
        });
    }

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
                                <td>${DateHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>`
                        ).join("")}
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
