const fileup = document.getElementById("file");
const IDocN = document.getElementById("IDocN");
const IDocC = document.getElementById("IDocC");
const DocN = document.getElementById("DocN");
const DocC = document.getElementById("DocC");
const resetBt = document.getElementById("resetbt");
const submitBt = document.getElementById("submitbt");
var payload;
var dataR;


fileup.addEventListener('change', function (){
    let fr = new FileReader;
    fr.onload = function(){
        DocC.textContent = fr.result
        IDocC.value = fr.result
    }
    fr.readAsText(this.files[0]);
    var DocNam = fileup.value.split("\\");
    DocNam = DocNam[DocNam.length-1];
    DocNam = DocNam.slice(0, DocNam.lastIndexOf("."));
    DocN.textContent = DocNam;
    IDocN.value = DocNam;
});

IDocN.addEventListener('keyup', function (){
    DocN.textContent = IDocN.value;
});

IDocC.addEventListener('keyup', function (){
    DocC.textContent = IDocC.value;
});

resetBt.addEventListener('click', () => {
    fileup.value = "";
    IDocN.value = "";
    DocN.textContent = "Name";
    IDocC.value = "";
    DocC.textContent = "Document content";
    payload = {DocName: "", DocContent: ""};
});
