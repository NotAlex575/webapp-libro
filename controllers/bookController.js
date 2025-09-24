//importiamo la connessione la db
const connection = require("../data/db");

//index
const index = (req, res) => {
    const sql = "SELECT * FROM books";

    connection.query(sql, (err, results) =>{
        if(err) 
            return res.status(500).json({error: "Errore durante la esecuzione della query: "+err});

        // Aggiungi il percorso completo delle immagini a ciascun libro
        const booksWithFullImagePath = results.map(book => ({
            ...book,
            image: req.imagePath + '/' + book.image
        }));

        res.json(booksWithFullImagePath);
        console.log("index eseguito con successo!")
    })
}


//show
const show = (req, res) => {
    //prendiamo l'id inserito su postman
      const { id } = req.params;

     // definizione della query da eseguire
     const sqlBook = "SELECT * FROM books WHERE id = ?";
     const sqlReviews = "SELECT * FROM reviews WHERE books_id = ?";
      
      //controlliamo se la query inserita è stata eseguita con successo
      connection.query(sqlBook, [id], (err, resultBook) => {
          if(err)
              return res.status(500).json({ error: "errore nell'esecuzione della query: "+err});
          
          //controllo se non ho trovato il libro
          if(resultBook.length === 0 || resultBook[0].id === null) 
              return res.status(404).json({ error: "Libro non trovato!"});

          const book = resultBook[0]
          book.image = req.imagePath + '/' + book.image;

          //query per recuperare le recensioni del libro
          connection.query(sqlReviews, [id], (err, resultReviews) => {
           if(err)
              return res.status(500).json({ error: "errore nell'esecuzione della query: "+err});

              //unisco il libro con le recensioni
              const bookWithReviews = {
                ...book,
                reviews: resultReviews
              }

              res.send(bookWithReviews)
              console.log(`show eseguito con successo con id ${id}!`)
            })


      })
}

//show
const store = (req, res) => {
    // recuperiamo i dati della form
    const { title, author, abstract } = req.body
    const fileName = `${req.file.filename}`;

    //query di inserimento
    const query = "INSERI INTO books (title, author, image, abstract) VALUES (?, ?, ?, ?)";

    //eseguiamo la query
    connection.query(query, [title, author, fileName, abstract], (err, result) => {
        if(err){
            return res.status(500).json({error: "Errore durante l'inserimento "+err})
        }

        res.status(201).json({
            result: true,
            message: "Libro creato con successo!"
        });
    })
}

module.exports = {
    index,
    show, 
    store
}
