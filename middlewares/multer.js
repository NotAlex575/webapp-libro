//importiamo multer
const multer = require("multer");
//importiamo path
const path = require("path");  

//definiamo la cartella storage in cui effettuare l'upload
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/img/books"), //definiamo la cartella di destinazione (qui salverà i file img)
    filename: (req, file, cb) =>{
        console.log(file);
        cb(null, file.originalname); // usa il nome originale senza timestamp
    }
})

//creiamo la variabile upload con la proprietà storage
const upload = multer({storage});

module.exports = upload

