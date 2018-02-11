var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")
];

var tbody = document.querySelector("table tbody");

document.querySelector(".form").addEventLis tener("submit", function(event) {
    // preventDefault cancela o evento,
    // neste caso ele impede que o formulário seja submetido
    // sem ele, o tbody não será atualizado ao submeter
    event.preventDefault();

    //
    var tr = document.createElement("tr");

    campos.forEach(function(campo) {
        // criando o elemento td
        var td = document.createElement("td");
        td.textContent = campo.value;

        // adiciona o elemento td como 'filho' de tr
        tr.appendChild(td);
    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;

    tr.appendChild(tdVolume);

    tbody.appendChild(tr);

    campos[0].value = "";
    campos[1].value = 1;
    campos[2].value = 0;

    // dando foco ao campo data
    campos[0].focus();
});
