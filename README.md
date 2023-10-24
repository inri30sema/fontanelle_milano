# fontanelle_milano
Inri Sema, 308882

Progetto di Piattaforme digitali per la Gestione del Territorio

# DESCRIZIONE DEL PROGETTO
L'obiettivo el progetto è la creazione di un Web Service per l'interrogazione ed elaborazione di alcuni dati riguardanti le varie fontanelle presenti nel comune i milano. I dati delle fontanelle contengono:
* objectID: indica l'ID della fontanella;
* CAP: indica il CAP dove si trova la fontanella;
* MUNICIPIO: indica il n° del municipio in cui si trova la fontanella;
* ID_NIL: indica l'ID del quartiere in cui si trova la fontanella;
* NIL: indica il nome del quartiere in cui si trova la fontanella;
* LONG_X_4326: indica la longitudine della fontanella;
* LAT_Y_4326: indica la latitudine della fontanella;
* Location: indica la posizione della fontanella;

Il tutto è stato implementato tramite il sito  www.glitch.com.

I codice è composto dal file server.js per l'implementazione del Web service  e dai file menuPrincipale.html e nuovaFontanella.html per l'implementazione delle interfacce.

I dati sono contenuti nel file vedovelle_milano.json e sono stati recuperati dal sito del governo (www.dati.gov.it), più precisamente nel seguente link https://dati.comune.milano.it/dataset/ds502_fontanelle-nel-comune-di-milano.

L'url per la richiesta al server è https://fontanelle-milano.glitch.me/views/menuPrincipale.html

# FUNZIONALITA' DEL PROGETTO
Nel progetto viene sfruttato il framework express per la creazione del server web che sfrutta il protocollo HTTP per la gestione delle richieste e delle risposte.
Nelle varie funzionalità è presente l'intestazione contiene il content-type che nella maggior parte dei casi è 'application/json' o 'text/plain'.

Oltre a express, viene anche importato fs che è un modulo utile per la gestione dei dati.

Il progetto è composto dalle seguenti funzionalità;

* GET (/getMappa) per la ricerca di tutte le fontanelle presenti a milano per poi stamparli nella mappa principale presente nell'interfaccia menuPrincipale.html (GUI: /views/menuPrincipale.html). Non necessita di alcun input, L'output è un oggetto in json che conterrà tutte le fontanelle.

* GET (/getFontanella) per la ricerca di una singola fontanella presente a milano che viene stampato nella mappa presente nel menuPrincipale. L'input è l'id della fontanella (objectID) e l'output è un oggetto in json che contiene la fontanella cercata.

* GET (/getFontanellaQuartiere) per la ricerca delle fontanelle presenti in un quartiere che vengono stampati nella mappa presente nel menuPrincipale. L'input è l'id del quartiere (ID_NIL) e l'output è un oggetto in json che contiene tutte le fontanelle del quartiere cercato.

* POST (/postFontanella) per l'aggiunta di una nuova fontanella tramite l'interfaccia nuovaFontanella.html (GUI: /views/nuovaFontanella.html). Gli input sono tutti i dati della fontanella (eccetto la Location che viene creata in automatico con la latitudine e longitudine selezionate) (i dati devono essere inseriti tutti e deve essere presente un objectID diverso da quelli esistenti) e l'output è un messaggio di conferma o errore.

* DELETE (/deleteFontanella) per l'eliminazione di una fontanella tramite il suo ID, in questo caso non è stata creata un'interfaccia ma è stato sfruttato il sito postman. L'input è l'ID della fontanella (objectID) e l'output è il messaggio di conferma o errore (in caso non ci sia l'ID selezionato)

* PUT (/putFontanella) per la modifica del CAP e del MUNICIPIO di una fontanella, in questo caso non è stata creata un'interfaccia ma è stato sfruttato il sito postman. Gli input sono l'ID della fontanella (objectID), il nuovo CAP e il nuovo MUNICIPIO e l'output è un messaggio di conferma o errore

# ESEMPI
1. GET (/getMappa)
![1](https://github.com/inri30sema/fontanelle_milano/assets/102967265/edc3f4b2-2785-4d23-a749-1970abccf00b)
2. GET (/getFontanella)
* Se l'id inserito esiste
![GETgiusto](https://github.com/inri30sema/fontanelle_milano/assets/102967265/4cf173af-4d02-4af0-99e6-6066ecb6bea1)
* Se l'id inserito non esiste
![getsbag](https://github.com/inri30sema/fontanelle_milano/assets/102967265/ba158a42-97d9-41f9-a89b-ec48c7ec77a0)
3.  GET (/getFontanellaQuartiere)
  * Se l'id del quartiere esiste
    ![quartGiusto](https://github.com/inri30sema/fontanelle_milano/assets/102967265/f49f92e9-992c-43a1-ad51-d8a65b5f0383)
  * Se l'id del quartiere non esiste
    ![quartsbag](https://github.com/inri30sema/fontanelle_milano/assets/102967265/d712706b-2a24-428b-bfbc-1ade02bc890c)
4. POST (/postFontanella)
  * interfaccia principale
    ![aggiungi](https://github.com/inri30sema/fontanelle_milano/assets/102967265/44833fcc-67ba-4db9-b8ed-97b9690208ec)
  * Risposta positiva del server (in caso di aggiunta di una fontanella non esistente)
    ![aggiGIus](https://github.com/inri30sema/fontanelle_milano/assets/102967265/9a179b9a-93be-4b4f-81ef-c89fd17c8f62)
  * Risposta negativa del server (in caso di aggiunta di una fontanella già esistente)
    ![aggSba](https://github.com/inri30sema/fontanelle_milano/assets/102967265/0cedc489-4c00-46a9-8378-448b01a07986)
5. DELETE (/deleteFontanella)
  * Risposta positiva del server (tramite postman) (ID corretto)
    ![deleteGiust](https://github.com/inri30sema/fontanelle_milano/assets/102967265/ee185b4e-9539-403b-bf43-e13f1d9ef744)
  * Risposta negativa del server (tramite postman) (ID errato)
    ![deleteSbag](https://github.com/inri30sema/fontanelle_milano/assets/102967265/ee43f1b1-f81a-4739-b6b8-969ff37e7f4e)
6. PUT (/putFontanella) 
  * Risposta positiva del server (tramite postman) (ID corretto)
     ![Putgiust](https://github.com/inri30sema/fontanelle_milano/assets/102967265/3946a7a2-e2f9-40c1-9eed-0f3ff244e916)
  * Risposta negativa del server (tramite postman) (ID errato)
    ![putSb](https://github.com/inri30sema/fontanelle_milano/assets/102967265/44d29bd4-31b9-4a79-a051-c46d87e868db)





