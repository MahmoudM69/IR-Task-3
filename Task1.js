const fs = require('fs');

var data = [];

let DOCS = fs.readFileSync('./Data.json', {encoding:'utf8', flag:'r'});

if(DOCS != ''){
    DOCS = JSON.parse(DOCS);
    
    for(let i of DOCS){
        let docname = i.DocName;
        for (let l of i.DocContent) {
            let doccontent = l.toLowerCase();
            data.push([doccontent, docname]);
        }
    }
    
    data.sort((a, b) => {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    });
    
    for (let i = 0 ; i < data.length; i++) {
        let word1 = data[i];
        for(let l = i + 1; l < data.length; l++){
            let word2 = data[l];
            if(word1[0] == word2[0] && ! word1.includes(word2[1])){
                word1.push(word2[1])
                data.splice(i+1, 1);
                l--;
            }
            else if(word1[0] == word2[0] && word1.includes(word2[1])){
                data.splice(i+1, 1);
                l--;
            }
            else{
                break;
            }
        }
    }
    module.exports = data;
}
else{
    module.exports = 'No Data';
}