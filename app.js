const fs = require('fs');
const express = require('express');


function readData() {
    let data = fs.readFileSync("Data.json", 'utf8');
    if (data != '') {
        return JSON.parse(data);
    } else {
        return '';
    }
}

function readDataS() {
    return fs.readFileSync("Data.json", 'utf8');
}

function wirteData(data) {
    let docData = readData();
    if (docData != '') {
        docData.push(data);
        let dataW = JSON.stringify(docData);
        fs.writeFileSync("Data.json", dataW);
    } else {
        data = [data];
        data = JSON.stringify(data);
        fs.writeFileSync("Data.json", data);
    }
}

function deleteData() {
    fs.writeFileSync("Data.json", '');
}

function rHome(res) {
    res.render('index', {
        DocuN
    })
};


var T1PL = require('./Task1.js');
const T2sourceFile = require('./Task2.js');
var T2PL = T2sourceFile.T2PLd;
var T2 = T2sourceFile.T2d;
var postData;
var DocuN = [];
var payload = readDataS();
if (payload == '') {
    payload = 'No Data';
    DocuN = ['No Data'];
} else {
    payload = JSON.parse(payload);
    for (let i of payload) {
        DocuN.push(i.DocName);
    }
}


const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

let PORT = process.env.PORT || 6969;
app.listen(PORT);


app.get('/', (req, res) => {
    rHome(res)
});

app.get('/index.html', (req, res) => {
    rHome(res)
});

app.post('/Post', (req, res) => {
    let textN = req.body.Name;
    let textC = req.body.Content;
    if (textN == '' || textN == ' ' || textC.length === 0 || textC === ' ') {
        res.render('Error');
    } else {
        let regex = /[!"#$%&'’()*+,-./:;<=>?@[\]^_`{|}~]/g;
        textC = textC.replace(regex, "").split(" ");
        for (let i = 0; i <= textC.length; i++) {
            if (textC[i] == "") {
                textC.splice(i, 1);
                i--;
            }
        }
        postData = {
            "DocName": textN,
            "DocContent": textC
        };
        wirteData(postData);
        res.render('Post');
    }
});

app.post('/Delete', (req, res) => {
    deleteData();
    res.render('Delete');
});

app.get('/IR-Task-1.html', (req, res) => {
    res.render('IR-Task-1', {
        T1PL,
        payload
    });
});

app.get('/IR-Task-2.html', (req, res) => {
    res.render('IR-Task-2', {
        T2PL,
        T2
    });
});

app.get('/About.html', (req, res) => {
    res.render('About');
});

app.use((req, res) => {
    res.status(404).render('404');
});