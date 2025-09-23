//importo express
const express = require("express");

//importo il middleware per le path delle immagini
const imagePathMiddleware = require("./middlewares/imagePathMiddleware.js");

//importo il pacchetto cors
const cors = require("cors");

//creo l'instanza dell'app attraverso il metodo express che ho importato
const connection = require("./data/db");
const app = express();

//definisco il numero di porta sul cui deve girare l'applicazione
const port = process.env.PORT;

//importo il router
const bookRouter = require("./routers/bookRouter");

//importo i middlewares
const errorsHandler = require("./middlewares/errorsHandler.js");
const notFound = require("./middlewares/notFound.js");

//registro il middleware per il cors
app.use(cors({origin: process.env.FE_APP}))

app.use(express.static("public"));

//uso il middleware per i path delle immagini
app.use(imagePathMiddleware);

//definisco la rotta base
app.get("/", (req,res) =>{
    res.send("rotta base del mio blog")
});

//definisco le rotte per i libri
app.use("/books", bookRouter);

//utilizzo globalmente il middleware errorsHandler
app.use(errorsHandler);
//utilizzo globalmente il middleware notFound         
app.use(notFound);

//esempio utilità di notFound: inserisci questa route in basso su postman (GET)
//http://localhost:3000/pippo
//qui darà come risposta "pagina non trovata"


//dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () =>{
    console.log(`server in ascolto nella porta ${port}`);
});