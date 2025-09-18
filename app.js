//importo express
const express = require("express");

//creo l'instanza dell'app attraverso il metodo express che ho importato
const connection = require("./data/db");
const app = express();

//definisco il numero di porta sul cui deve girare l'applicazione
const port = process.env.PORT;

//importo il router
const bookRouter = require("./routers/bookRouter");

app.use(express.static("public"));

//definisco la rotta base
app.get("/", (req,res) =>{
    res.send("rotta base del mio blog")
});

//definisco le rotte per i libri
app.use("/api/books", bookRouter);

//dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () =>{
    console.log(`server in ascolto nella porta ${port}`);
});