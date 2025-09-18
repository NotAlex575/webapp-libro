//importiamo la connessione la db
const connection = require("../data/db");

//index
const index = (req, res) => {
    const sql = "SELECT * FROM books";

    //controlliamo se la query inserita è stata eseguita con successo
    connection.query(sql, (err, results) =>{
        if(err) 
            return res.status(500).json({error: "Errore durante la esecuzione della query: "+err});
        res.json(results);
        console.log("index eseguito con successo!")
    })
}

//show
const show = (req, res) => {
    //prendiamo l'id inserito su postman
      const { id } = req.params;

      //definizione della query da eseguire
      const sql = "SELECT * FROM books WHERE id = ?";
      
      //controlliamo se la query inserita è stata eseguita con successo
      connection.query(sql, [id], (err, results) => {
          if(err)
              return res.status(500).json({ error: "errore nell'esecuzione della query: "+err});
          res.json(results);
          console.log("show eseguito con successo!")
      })
}

module.exports = {
    index,
    show
}

module.exports = connection;