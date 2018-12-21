const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 8000;

const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

// Bug Report
app.post('/bugReport/:bug', (req, res) => {
    fs.appendFile('bugLog.txt', new Date().toLocaleString() + "- " + req.params.bug + "\r\n", (err) => {
        if(err) console.log(err);
    })
    console.log(new Date().toLocaleString() + ": " + req.params.bug);
});

app.listen(PORT, () => {
    console.log("Server Started on port " + PORT  + "...");
});

