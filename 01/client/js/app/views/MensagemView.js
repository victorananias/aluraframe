class MensagemView  extends View{

    template(texto) {
        return texto ? `<p class="alert alert-info">${texto}</p>` : "<p></p>>";
    }
}
