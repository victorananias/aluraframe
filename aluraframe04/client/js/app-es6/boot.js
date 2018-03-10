import { currentInstance } from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

/*
|------------------------------------------------------------------------------
| currentInstance
|------------------------------------------------------------------------------
|
| Foi criada uma função na classe NegociacaoController para que quando a instancia fosse chamada
| fosse a mesma em todos os lugares, nesse caso a mesma instancia será utilizada em NegociacoesView.
|
*/
let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adicionar.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apagar.bind(negociacaoController);
