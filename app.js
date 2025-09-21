//importo express
const express = require("express");

//importo il pacchetto cors
const cors = require("cors");

//creo l'instanza dell'app attraverso il metodo express che ho importato
const connection = require("./data/db");
const app = express();

//definisco il numero di porta sul cui deve girare l'applicazione
const port = process.env.PORT;

//importo il router
const bookRouter = require("./routers/bookRouter");

//registro il middleware per il cors
app.use(cors({origin: process.env.FE_APP}))

app.use(express.static("public"));

//definisco la rotta base
app.get("/", (req,res) =>{
    res.send("rotta base del mio blog")
});

//definisco le rotte per i libri
app.use("/books", bookRouter);

//dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () =>{
    console.log(`server in ascolto nella porta ${port}`);
});