//importiamo multer
const multer = require("multer");

//definiamo la cartella storage in cui effettuare l'upload
const storage = multer.diskStorage({
    destination: ".public/img/books", //definiamo la cartella di destinazione
    filename: (req, file, cb) =>{
        console.log(file);
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); //cb: funzione di callback. null: rappresenta l'errore, e il nome del file (uniqueName)
    }
})

//creiamo la variabile upload con la proprietà storage
const upload = multer({storage});

module.exports = upload

