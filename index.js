const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/",(req,res)=>{
    res.send("Welcome to Quote of the day");
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

