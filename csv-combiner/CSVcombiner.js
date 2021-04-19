const csv = require('./CSVHelperFunctions');

for(let i = 2; i < process.argv.length; i++){
    csv.fileReadWrite(process.argv,i);
}

