const fs = require('fs');
const parse = require('csv-parse');

let combinedCSV = '';

function fileName(argv, index){
    const path = argv[index].split('/');
    return path[path.length-1];
}

function fileReadWrite(argv,index){
    let header = true;
    fs.createReadStream(argv[index])
    .pipe(
        parse({
            delimter: '\n',
            escape: '\\'
        }), 
    )
    .on('data', function(dataRow) {
        if(header){
            combinedCSV += "email_hash,category,filename \n";
            header = false;
        }
        if(Object.values(dataRow).includes("email_hash")){
            combinedCSV += "";
        }else{
            combinedCSV += dataRow + ',' + fileName(process.argv,index) + '\n';
        }

    })
    .on('end', function(){
        fs.writeFile("combinedCSV.csv", combinedCSV, (err) =>{
            if(err){
                console.log(err);
            }else{
                console.log("file written successfully");
            }
        })
    })
}

module.exports = {
    fileName: fileName,
    fileReadWrite: fileReadWrite
}