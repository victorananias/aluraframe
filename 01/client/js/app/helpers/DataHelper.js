class DataHelper {

    constructor() {
        throw new Error("Está classe não deve ser instânciada.");
    }

    static textoParaData(texto) {
        /*
        |----------------------------------------------------------------------
        | Expressão Regular
        |----------------------------------------------------------------------
        |
        | É uma representação para encontrar um padrão em um texto.
        | O test compara a expressão com o texto e retorna true ou false;
        |
        */
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error("O formato do texto deve ser yyyy-mm-dd");

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
        return new Date(...texto.split("-").map(
            /*
            |----------------------------------------------------------------------
            | Arrow functions
            |----------------------------------------------------------------------
            |
            | Nome dado a sintáxe de funções que são definidas com '=>'.
            | Neste caso não há {} nem 'return' pois a mesma possui somente uma instrução.
            |
            */
            (item, indice) => item - indice % 2)
        );
    }

    static dataParaTexto(data) {
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
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
}
