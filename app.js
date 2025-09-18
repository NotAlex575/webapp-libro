const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req,res) =>{
    res.send("rotta base del mio blog")
})

app.listen(port, () =>{
    console.log(`server in ascolto nella porta ${port}`);
})