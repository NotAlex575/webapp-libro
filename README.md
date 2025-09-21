STEPLIST CREAZIONE WEBAPP LIBRERIA (PASSO PER PASSO)

Questa webapp avrà un db di libri a cui possiamo inserire delle recenzioni!

iniziamo con i passaggi per crearla!

1) CREAZIONE DATABASE 

  __________________________________________________________

  *DOMANDA: COS'E UN DATABASE?*

  *RISPOSTA:*

  Un database è un sistema che serve a raccogliere, organizzare e gestire dati in modo strutturato, così che possano essere facilmente consultati, modificati e mantenuti.

  È come un archivio digitale:

    1) una libreria -> è il database

    2) gli scaffali -> sono le tabelle

    3) i libri sugli scaffali -> sono i record (righe)

    4) le informazioni in un libro (titolo, autore, anno) -> sono i campi (colonne)

____________________________________________________________

  Dopo aver capito cos'è un database, iniziamo!

1)	prima identifichiamo le tabelle di Books e Reviews con le loro value:

    Books table

    id primary key
    title
    author
    image
    abstract

    Reviews table

    id primary key
    books_id foreign key
    name
    vote
    text

  la relazione tra questi 2 sarà one (Books) to many (Reviews), siccome Books può avere più recensioni, ma una recensione non può stare in più libri

  2) creiamo il db su MySQL Workbench

    ecco i passaggi iniziali:

    1) se non hai ancora creato un Mysql connector, creiamone subito uno!

      1) aprire Mysql Workbench 

      2) vicino a MySQL Connectors cliccare il + alla sua destra

      3) inserire il nome della connection name (puoi mettere quello che vuoi)

      4) inserisci lo username (questo ci servirà dopo, siccome dovremmo poi inserire questo dato nel progetto)

      5) fai il test connection e vedi se è andato tutto correttamente

      6) clicca ok

      *ora abbiamo il connector per il db!*

    2) ora che abbiamo il Mysql connector, andiamo a cliccarlo ed entriamoci!

    per creare un database segui questi passaggi:

      1) nella barra a sinistra (SCHEMAS), clicca col tasto destro del mouse (sotto a tutto) e clicca "create schema..."

      2) inserisci il nome del database (ci servirà quindi ricordati il nome!)

      3) clicca apply e il gioco è fatto!

    ora, siccome non abbiamo un database come reference ne creiamo uno come esempio!

    ma prima, se non abbiamo ancora un sql file per scrivere le query, basta cliccare in alto a destra il pulsantino con un foglio, il cui all'interno c'è scritto sql e in basso a sinistra ci sta un +

    *facendo cosi creiamo un file SQL dove possiamo scrivere le nostre query!*

  __________________

    NOTA! se hai già un database nel tuo computer, segui questi passaggi, ed evita quelli di creazione del database tramite query!

    1) seleziona il tuo database vuoto

    2) in alto a destra, clicca su Server, e vai su Data Import

    3) seleziona la dicitura "import from Self-Contained-File"

    4) clicca dove stanno i [...] per selezionare il file da importare

    5) scegli il file.sql che tiene il database

    6) in "Default Target Schema, seleziona il db_nomeDato" (ini cui nomeDato = al nome del database che gli hai dato)

    7) fatto ciò, clicca su start import

    se tutto va bene, avrai importato il tuo database, e ti dovrebbe mostrare "Import completed" senza errori!

    se hai fatto questo, passa direttamente al punto 2 -> CREAZIONE PROGETTO WEBAPP

  __________________


    ora creiamo un database!

    ecco qui un'esempio di creazione di un db dei libri (database chiamato db_books), usando le seguenti query:

      1) Creazione del database

      CREATE DATABASE db_books;

      2) Usa il database

      USE db_books;

      3) Creazione tabella Books

      CREATE TABLE Books (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          image VARCHAR(500),
          abstract TEXT
      );

      4) Creazione tabella Reviews

      CREATE TABLE Reviews (
          id INT AUTO_INCREMENT PRIMARY KEY,
          books_id INT NOT NULL,
          name VARCHAR(255) NOT NULL,
          vote INT CHECK (vote BETWEEN 1 AND 5),
          text TEXT,
          FOREIGN KEY (books_id) REFERENCES Books(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE
      );

  3) ora inseriamo qualche dato:

    1) Inserimento libri
        INSERT INTO Books (title, author, image, abstract)
        VALUES
        ('Il nome della rosa', 'Umberto Eco', 'https://example.com/nome_rosa.jpg', 'Un romanzo storico ambientato in un monastero medievale con un mistero da risolvere.'),
        ('1984', 'George Orwell', 'https://example.com/1984.jpg', 'Un classico della distopia che descrive un futuro totalitario e oppressivo.'),
        ('Il Signore degli Anelli', 'J.R.R. Tolkien', 'https://example.com/lotr.jpg', 'Un’epica avventura fantasy ambientata nella Terra di Mezzo.'),
        ('Orgoglio e pregiudizio', 'Jane Austen', 'https://example.com/pride_prejudice.jpg', 'Un romanzo che esplora i temi dell’amore, del matrimonio e delle convenzioni sociali.'),
        ('Cronache di Narnia: Il leone, la strega e l’armadio', 'C.S. Lewis', 'https://example.com/narnia.jpg', 'Un classico fantasy per ragazzi con simbolismi profondi e avventure magiche.');

      2) Inserimento recensioni
        INSERT INTO Reviews (books_id, name, vote, text)
        VALUES
        -- Recensioni per "Il nome della rosa" (id = 1)
        (1, 'Marco Rossi', 5, 'Un capolavoro assoluto, avvincente e colto.'),
        (1, 'Giulia Bianchi', 4, 'Molto bello, ma a tratti un po’ complesso.'),
        (1, 'Andrea Conti', 5, 'Intrigante e scritto in modo magistrale.'),

        -- Recensioni per "1984" (id = 2)
        (2, 'Luca Verdi', 5, 'Un libro che fa riflettere, sempre attuale.'),
        (2, 'Anna Neri', 3, 'Interessante, ma la narrazione a volte è lenta.'),
        (2, 'Francesca Blu', 4, 'Distopico e intenso, mi ha colpito molto.'),

        -- Recensioni per "Il Signore degli Anelli" (id = 3)
        (3, 'Davide Gialli', 5, 'Il fantasy per eccellenza, indimenticabile.'),
        (3, 'Sara Rosa', 5, 'Tolkien ha creato un mondo unico, emozionante.'),
        (3, 'Marta Viola', 4, 'Bellissimo ma molto lungo.'),

        -- Recensioni per "Orgoglio e pregiudizio" (id = 4)
        (4, 'Chiara Azzurri', 5, 'Un classico senza tempo, adorabile.'),
        (4, 'Elena Grigi', 4, 'Stile elegante, personaggi ben caratterizzati.'),
        (4, 'Paolo Neri', 3, 'Interessante ma non il mio genere.'),

        -- Recensioni per "Cronache di Narnia" (id = 5)
        (5, 'Simone Marrone', 5, 'Magico e pieno di simbolismi, perfetto per ragazzi.'),
        (5, 'Alessia Lilla', 4, 'Una storia avvincente, anche se semplice.'),
        (5, 'Giovanni Fucsia', 5, 'Un’avventura meravigliosa che mi ha segnato da bambino.');

____________________________________________________________

2) CREAZIONE PROGETTO WEBAPP

  dopo creato il db (se non lo avevi) e inserito dei dati nelle table (sempre se non li avevi), creiamo il nostro progetto attraverso questa steplist:

  1) Creo la cartella del progetto e la apro con vscode per lanciare il comando npm init

  2) Eseguo il comando npm install oppure direttamente il comando per installare express e mysql2 (npm i express mysql2)

  3) Se non presente creiamo il file .gitignore in cui mettere la cartella node_modules (se devi importare in git questo è il momento, in modo tale che non importi subito il node_modules)

  4) Aggiorno il file package.json inserendo i comandi start (node app.js) e watch (node --watch app.js)

    struttura:

    "scripts": {
      "start": "node app.js",
      "watch": "node --watch app.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },

  5) Creo il file app.js:

    Scriviamo nel nostro app.js i comandi necessari per importare express, utilizzarlo e creare la rotta base nonché mettere in ascolto il server su una porta definita da noi (tipicamente la 3000)

    1) Importiamo express:
          const express = require('express');

    2) Definiamo la variabile app che contiene un’istanza di express:
          const app = express();

    3) Definiamo la porta sulla quale deve rimanere in ascolto il server:
          const port = 3000;

    4) Definiamo la rotta base della nostra applicazione:
          app.get('/', (req, res) => { /* codice */ })

    5) Diciamo al server di rimanere in ascolto sulla porta 3000:
          app.listen(port, () => { /* messaggio */ })

  6) creo la cartella data, con all'interno il file db.js

    *questo servirà a noi per collegarci direttamente al database che abbiamo!*
    il suo contenuto sara questo:

    __

      // importiamo mysql2
      const mysql = require("mysql2");

      // creo la connessione 
      // NOTA: in password, user e database, inserisci i dati che hai messo quando hai creato il MySQL Connections!

      const connection = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "password", 
          database: "db_books",
          port: 3306
      });

      // stabilisco la connessione al db
      connection.connect((err) => {
          if (err) {
              console.log(`Errore nella connessione al db: ${err}`);
          } else {
              console.log("Connessione al db avvenuta correttamente");
          }
      });

      //esporto connection
      module.exports = connection;

    __

  7) in app.js, sotto a const express, ci aggiungiamo questo:

    //connessione con il database in app.js
    const connection = require("./data/db");

    *cosi app.js sarà collegato col database!*

____________________________________________________________

3) CREAZIONE .ENV

  *DOMANDA: COS'E L'ENV E A CHE SERVE?*

  *RISPOSTA:* 
  
  Il file .env serve per gestire le variabili d’ambiente del tuo progetto, cioè dei valori che possono cambiare da un ambiente all’altro (sviluppo, test, produzione) senza dover modificare direttamente il codice.

  A cosa serve in pratica

    1) Conserva dati sensibili che non devono stare nel codice (es. password del database, API key, token).

    2) Permette di configurare l’applicazione senza toccare i file .js.

    3) È più sicuro perché viene inserito nel .gitignore, quindi non viene caricato su GitHub o repository pubblici.

    4) Ti consente di cambiare configurazioni velocemente (porta, user, db, ecc.).

  dopo aver capito cos'è il .env e la sua utitità, continuiamo la steplist!

  1) creiamo un env, inserendo al suo interno inserisco delle variabili che serviranno per la connessione al database ed il numero di porta su cui deve rimanere in ascolto il server:

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_DATABASE=db_books
    DB_PORT=3306

  *NOTA: sempre in DB_PASSWORD ricorda di inserire sempre la stessa password che hai messo nel db, senno darà errore!*

  2) inseriamolo nel .gitignore (qui per far vedere come funziona non lo metterò nel .gitignore, ma si deve mettere sempre nel .gitignore il .env)

  3) cambiamo la const connection con questo content:

    // creo la connessione
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, //inserisci la tua password presente nel database
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    *In questo modo, se cambi i valori nel file .env, non devi modificare il codice!*

  4) Nel package.json vado ad aggiungere ai comandi start ed watch --env-file=.env prima di app.js e prima di --watch

    struttura:

    "scripts": {
      "start": "node --env-file=.env app.js",
      "watch": "node --env-file=.env --watch app.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    }

    *ora i comandi sono sempre gli stessi comandi, ma con più sicurezza!*

____________________________________________________________

4) CREAZIONE CONTROLLER

  ora creiamo il controller!

  ma prima:
  
  ___________

  *DOMANDA: COS'E IL CONTROLLER E A COSA SERVE?*

  *RISPOSTA:*

  Un controller è un componente che gestisce la logica tra le richieste dell’utente e i dati dell’applicazione.

    1) Riceve le richieste HTTP (GET, POST, PUT, DELETE) provenienti dal client.

    2) Interagisce con i modelli o direttamente con il database per leggere o scrivere dati.

    3) Prepara e invia la risposta al client, tipicamente in formato JSON o HTML.

  grazie al controller

    1) noi siamo in grado di separare le responsabilità delle richieste al database, in modo tale che eseguiamo una query in base a quello che ci serve!

    2) controlla se ci sono degli eventuali errori restituendo messaggi appropriati, attraverso la value err, che può tornare un res.status(500), res.status(404), etc.
  
  
  ___________


 ora che sappiamo meglio il controller, creiamolo:

    1) creiamo una cartella controllers e ci mettiamo un file chiamato bookController.js, dove al suo interno inseriremo tutte le query!

    2) creiamo le varie constanti (index, show, ...)

      struttura:

      //importiamo la connessione la db
      const connection = require("../data/db");

      //index
      const index = (req, res) => {
          console.log("Metodo index")
      }

      //show
      const show = (req, res) => {
          console.log("Metodo show")
      }

      module.exports = {
          index,
          show
      }  

      *index e show, alla fine, non avranno questi contenuti, ma iniziamo almeno a creare uno scheletro all'interno del controller!*

____________________________________________________________

5) ROUTER

  creiamo ora il router di book, in questo caso creiamo la cartella routers con il file bookRouter.js

      al suo interno:

      // importiamo express
      const express = require('express');
      // importiamo router
      const router = express.Router();
      // importiamo il controller
      const bookController = require("../controllers/bookController");

      // definizione delle rotte
      // index
      router.get('/', bookController.index);

      // show
      router.get('/:id', bookController.show);

      module.exports = router;

    *questi ci serviranno poi su postman per vedere i risultati!*

    creato quindi il router, andiamo in app.js e importiamo il router!

      //importo il router
      const bookRouter = require("./routers/bookRouter");

      //definisco le rotte per i libri
      app.use("/books", bookRouter);

    *in questo modo possiamo gia vedere i risultati su postman! (se vuoi vedere già i risultati vai al punto 7 -> TEST POSTMAN, dove anziche la lista ti compariranno come risultati i console.log inseriti nei controller)*

____________________________________________________________

6) QUERY 

  si ma adesso vediamo solo dei console.log, non la lista che vogliamo vedere....
  *ed è qui che ci sono in soccorso nostro le query!*


  ora creiamo delle query nel controller!

  1) in controllers/bookController.js modifichiamo index e show in questa maniera:

    //index => recuperiamo tutta la tabella libri

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

    //show => recuperiamo il singolo elemento di un libro 

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

    *questi andranno a sostituire i console.log, in modo tale che dopo su postman troveremo come risultati la tabella!*

  ________________________________

    0) PASSAGGI EXTRA!

      1) CHECK PER VEDERE SE NON TROVO UN LIBRO:

        in show possiamo fare un check per vedere se non trovo un libro (lo metti dopo l'if(err)):

        //controllo se non ho trovato il libro
          if(resultBook.length === 0 || resultBook[0].id === null) 
              return res.status(404).json({ error: "Libro non trovato!"});

      *in questo modo vediamo se non ci sono libri nel database oppure l'id inserito del libro non esiste!*

      2) ARRAY RECENSIONI:

         sempre in show possiamo anche fare in modo che possiamo vedere le recensioni!

          1) ora anzichè const sql, dobbiamo prendere in considerazione 2 chiamate:

                const sqlBook = "SELECT * FROM books WHERE id = ?";
                const sqlReviews = "SELECT * FROM reviews WHERE books_id = ?";

          *in questo modo prendiamo sia libri che le recensioni!*

          NOTA! qui si può anche usare una JOIN!
          
          2) sotto il controllo del libro non trovato:

            //query per recuperare le recensioni del libro
            connection.query(sqlReviews, [id], (err, resultReviews) => {
            if(err)
                return res.status(500).json({ error: "errore nell'esecuzione della query: "+err});

                //unisco il libro con le recensioni
                const bookWithReviews = {
                  ...resultBook[0],
                  reviews: resultReviews
                }

                //SOSTITUISCI res.json(results); CON QUESTO QUI SOTTO!

                res.send(bookWithReviews)
                console.log(`show eseguito con successo con id${id}!`)
              })
        NOTA IMPORTANTE! SE NON HAI NOTATO:
         -> res.send(bookWithReviews) 

         andrà a sostituire 

         -> res.json(results);

         ALTRIMENTI TI DARA ERRORE!

*adesso, se dopo su postman si fa la request show, oltre ai libri, vedremo anche le recensioni!*

in seguito poi possiamo mettere anche POST,PUT E DELETE, ma per ora testiamo questi 2 nel prossimo punto!

____________________________________________________________

7) TEST POSTMAN
    ora che abbiamo index e show, testiamo il tutto con postman!

    1) INIZIALIZZAZIONE POSTMAN

      1) apri postman

      2) crea una nuova connessione => blank collection (chiamiamola books)

    2) CREAZIONE REQUEST (INDEX)

      1) clicchiamo sul + vicino alla new connection (si genera cosi un get chiamato new request)

      2) chiamiamolo index, ed inseriamo l'url:

      http://localhost:3000/books
      
      se tutto va bene, su postman comparirà l'intera lista dei books!

    3) CREAZIONE REQUEST (SHOW)

      1) clicchiamo sul + vicino alla new connection (si genera cosi un get chiamato new request)

      2) chiamiamolo show, ed inseriamo l'url (ecco un esempio qui sotto):

      http://localhost:3000/books/1 

      IMPORTANTE! inseriamo davanti  1 siccome sarà l'id da ricercare del libro

      se tutto va bene, su postman comparirà il singolo elemento del book (se hai fatto i passaggi extra, allora vedremo anche la sua recensione)!

  
_____________________________________________________

per continuare il progetto, andare nel progetto books_page per la parte react!

_____________________________________________________


13) COMUNICAZIONE FRONT-END BACK-END

ora dobbiamo permettere la comunicazione tra loro, e per fare ciò, dobbiamo abilitare questa applicazione ad accettare le chiamate front-end!

per fare ciò:

  1) andiamo sul .env

  2) sotto a tutto, mettiamo l'indirizzo della pagina front-end:

  FE_APP= http://INDIRIZZO 

  tipo per me sarà 

  FE_APP = http://localhost:5173/