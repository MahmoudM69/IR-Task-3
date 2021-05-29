const fs = require('fs');
const _ = require('underscore');

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
    

    
    for (let i in data) {
            var temp = 1
            for(let l = Number(i) + 1; l < data.length; l++){
                if(_.isEqual(data[Number(i)], data[l])){
                    temp++;
                    data.splice(l, 1);
                    l--;
                }
                else{
                    break;
                }
            }
            data[i][1] = [data[i][1], temp]
    }

    var T2 = data;

    var ck = false;
    for (let i = 0 ; i < data.length; i++) {
        if(ck){
            i--
        }
        else {            
            var fre = data[i][1][1]
            var ndoc = 1;
            var posting = [data[i][1]];
        }
        if(i == data.length-1){
            data[i][1] = ndoc;
            data[i][2] = fre;
            data[i][3] = posting;
            break;
        }
        ck = false
        for(let l = i + 1; l < data.length; l++){
            if(data[i][0] == data[l][0]){
                ndoc++;
                fre = fre + data[l][1][1]
                posting.push(data[l][1])
                data[i][1] = ndoc;
                data[i][2] = fre;
                data[i][3] = posting;
                data.splice(l, 1);
                ck = true;
                l--;
            }
            else{
                data[i][1] = ndoc;
                data[i][2] = fre;
                data[i][3] = posting;
                break;
            }
        }
    }
    var T2PL = data;
    module.exports = {
        T2d : T2,
        T2PLd : T2PL
    };
}
else {
    module.exports = {
        T2d : 'No Data',
        T2PLd : 'No Data'
    };
}