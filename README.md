SPIEGAZIONE LEZIONI WEBAPP

Questa webapp avrà un db di libri a cui possiamo inserire delle recenzioni

1) CREAZIONE DATABASE 

  1) dobbiamo prima identificare le tabelle di Books e Reviews:

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

    ecco qui un'esempio di creazione di un db usando le seguenti query:

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

  dopo creato il db (se non lo avevi) e inserito dei dati(sempre se non li avevi), creiamo il nostro progetto attraverso questa steplist:

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

  5) Creo il file app.js

  6) creo la cartella data, con all'interno il file db.js

    il suo contenuto sara questo:
    // importiamo mysql2
    const mysql = require("mysql2");

    // creo la connessione (NOTA: in password, inserisci la password che hai messo nel tuo database)
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password", 
        database: "db_books",
        port: 3307
    });

    // stabilisco la connessione al db
    connection.connect((err) => {
        if (err) {
            console.log(`Errore nella connessione al db: ${err}`);
        } else {
            console.log("Connessione al db avvenuta correttamente");
        }
    });

  7) in app.js, sotto a const express, ci aggiungiamo questo:

    //connessione con il database in app.js
    const connection = require("/data/db");

________________________________________________________________

3) CREAZIONE ENV

  1) creiamo un env, inserendo al suo interno inserisco delle variabili che serviranno per la connessione al database ed il numero di porta su cui deve rimanere in ascolto il server:

    PORT=3000
    DB_HOST= localhost
    USER=ROOT
    DB_PASSWORD=route
    DB_NAME = db_books
    DB_PORT= 3306

  2) inseriamolo nel .gitignore (qui per far vedere come funziona non lo metterò, ma si deve mettere sempre nel gitignore)

  3) cambiamo la const connection con questo content:

    // creo la connessione
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, //inserisci la tua password presente nel database
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

  4) Nel package.json vado ad aggiungere ai comandi start ed watch --env-file=.env prima di app.js e prima di --watch

    struttura:

    "scripts": {
      "start": "node --env-file=.env app.js",
      "watch": "node --env-file=.env --watch app.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    }


  