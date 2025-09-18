SPIEGAZIONE LEZIONI WEBAPP

Questa webapp avrà un db di libri a cui possiamo inserire delle recenzioni

dobbiamo prima identificare le tabelle di Books e Reviews:

Books
id primary key
title
author
image
abstract

Reviews
id primary key
books_id foreign key
name
vote
text

la relazione tra questi 2 sarà one (Books) to many (Reviews), siccome Books può avere più recensioni, ma una recensione non può stare in più libri

creiamo quindi il db su MySQL Workbench

dopo ciò, creiamo il nostro progetto attraverso questa steplist:

1) Creo la cartella del progetto e la apro con vscode per lanciare il comando npm init

2) Eseguo il comando npm install oppure direttamente il comando per installare express e mysql2 (npm i express mysql2)

3) Se non presente creiamo il file .gitignore in cui mettere la cartella node_modules

4) Aggiorno il file package.json inserendo i comandi start (node app.js) e watch (node --watch app.js)

5) Creo il file app.js

6) creo la cartella data, con all'interno il file db.js