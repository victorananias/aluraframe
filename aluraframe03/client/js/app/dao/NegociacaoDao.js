class NegociacaoDao {
    
    constructor(conexao) {
        this._conexao = conexao;
        this._banco   = "negociacoes";
    }
    
    adicionar(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._conexao.transaction([this._banco], "readwrite")
            .objectStore(this._banco)
            .add(negociacao);
            
            request.onsuccess = event => resolve();
            request.onerror = event => reject(event.target.error.name);
        });
    }
    
    apagar() {
        
    }
    
}