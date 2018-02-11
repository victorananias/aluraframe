var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")
];

var tbody = document.querySelector("table tbody");

document.querySelector(".form").addEventLis tener("submit", function(event) {

    /*
    |--------------------------------------------------------------------------
    | evento.preventDefault()
    |--------------------------------------------------------------------------
    |
    | cancela o evento,
    | neste caso ele impede que o formulário seja submetido
    | sem ele, o tbody não será atualizado ao submeter
    |
    */
    event.preventDefault();

    /*
    |--------------------------------------------------------------------------
    | createElement(elemento)
    |--------------------------------------------------------------------------
    |
    | criando o elemento td
    |
    */
    var tr = document.createElement("tr");

    campos.forEach(function(campo) {
        var td = document.createElement("td");

        /*
        |--------------------------------------------------------------------------
        | elemento.textContent
        |--------------------------------------------------------------------------
        |
        | propriedade referente ao conteudo do elemento html
        |
        */
        td.textContent = campo.value;

        /*
        |--------------------------------------------------------------------------
        | appendChild(elemento)
        |--------------------------------------------------------------------------
        |
        | adiciona o elemento td como 'filho' de tr
        |
        */
        tr.appendChild(td);

    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;

    tr.appendChild(tdVolume);

    tbody.appendChild(tr);

    campos[0].value = "";
    campos[1].value = 1;
    campos[2].value = 0;

    /*
    |--------------------------------------------------------------------------
    | elemento.focus()
    |--------------------------------------------------------------------------
    |
    | direcionando o foco ao elemento data
    |
    */
    campos[0].focus();
});
