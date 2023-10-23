// Import
const express = require('express'); // import funzioni express
const data = require('fs'); // import metodi per gestione dei file
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dataReader = data.readFileSync('vedovelle_milano.json'); // contenuto del file
let parser = JSON.parse(dataReader); // parsing del contenuto del file

// Views engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);



// GET per il menu principale (stampa mappa intera)
app.get('/getMappa', (req, res) => {
  res.type('application/json').status(200).json(parser);
});

// Reindirizzamento gui
app.get('/views/menuPrincipale.html', (req, res) => {
  res.type('text/html').status(200).sendFile(__dirname + "/views/menuPrincipale.html");
});



// GET per ottenere una fontanella tramite ID 
app.get('/getFontanella', (req, res) => {
  const id = req.query.objectID; 
  const elem = parser.filter(elem => elem['objectID'] == id); // ricerca fontanella corrispondente
  if (elem.length > 0) {
    res.type('application/json').status(200).json(elem);
  }
  else {
    res.type('application/json').status(404).json({});
  }
});



// GET per ottenere fontanelle di un quartiere tramite l'ID del quartiere 
app.get('/getFontanellaQuartiere', (req, res) => {
  const id = req.query.ID_NIL; 
  const elem = parser.filter(elem => elem['ID_NIL'] == id); // ricerca 
  if (elem.length > 0) {
    res.type('application/json').status(200).json(elem);
  }
  else {
    res.type('application/json').status(404).json({});
  }
});



// POST per aggiungere una fontanella
app.post('/postFontanella', (req, res) => {
  const fontanella = req.body;
  const cloni = parser.filter(elem => elem['objectID'] == fontanella.objectID); // ricerca possibili impianti con stesso id
  if (cloni.length == 0) {
    parser.push(fontanella);
    console.log(fontanella);
    data.writeFileSync("vedovelle_milano.json", JSON.stringify(parser));
    res.type('text/plain').status(200).send('fontanella aggiunta!');
  } else
    res.type('text/plain').status(406).send("fontanella già presente.");
});

// Reindirizzamento gui
app.get("/views/nuovaFontanella.html", (req, res) => {
  res.type('text/html').status(200).sendFile(__dirname + "/views/nuovaFontanella.html");
});



// DELETE per eliminare una fontanella
app.delete('/deleteFontanella', (req, res) => {
  const id = req.body.objectID;
  var n = -1; // variabile ausiliaria (indica la posizione della fontanella da eliminare da rimuovere - se presente)
  for (var i = 0; i < parser.length; i++) {
    if (parser[i]['objectID'] == id)
      n = i;
  }
  if (n >= 0) {
    parser.splice(n, 1); // rimozione
    data.writeFileSync("vedovelle_milano.json", JSON.stringify(parser)); 
    res.type('text/plain').status(200).send('fontanella eliminata!');
  } else {
    res.type('text/plain').status(404).send('l\'id della fontanelle non è presente, provare con un altro id!');
  }
});



// PUT per modificare il CAP e il municipio di una fontanella
app.put('/putFontanella', (req, res) => {
  const id = req.body.objectID;
  const nuovoCAP = req.body.CAP;
  const nuovoMunicipio = req.body.MUNICIPIO;
  var elem = null; // variabile ausiliaria (conterrà la fontanella da modificare - se presente)
  console.log(nuovoCAP);
  console.log(nuovoMunicipio);
  console.log(id);
  for (var i = 0; i < parser.length; i++) {
    if (parser[i]['objectID'] == id) {
      elem = parser[i]; // impianto corrispondente
      elem['CAP'] = nuovoCAP; // modifica del CAP
      elem['MUNICIPIO'] = nuovoMunicipio; // modifica del MUNICIPIO
    }
  }
  if (elem != null) { 
    data.writeFileSync("vedovelle_milano.json", JSON.stringify(parser));
    res.type('text/plain').status(200).send('modificata avvenuta con successo!');
  } else {
    res.type('text/plain').status(404).send('l\'id della fontanelle non è presente, provare con un altro id!'); 
  }
});



// log server status
app.listen(process.env.PORT || 4000, () =>
  console.log("Server listen on " + process.env.PORT)
);