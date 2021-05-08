const base_parser = require('./base_parser');
const nested_prop_resolver = require('nested-prop-resolver');
const fs = require('fs');

function getValueIgnoringKeyCase(object, key) {
    const foundKey = Object
        .keys(object)
        .find(currentKey => currentKey.toLocaleLowerCase() === key.toLowerCase());
    return object[foundKey];
}

function getBoundary(event) {
    return getValueIgnoringKeyCase(event.headers, 'Content-Type').split('=')[1];
}

function getFilePath(event, fileName) {
    let timeEpoch = nested_prop_resolver.resolve(event, 'requestContext.timeEpoch', '');
    return `/tmp/${timeEpoch}-${fileName}`;
}

function saveFile(buffer, filePath) {
    fs.writeFileSync(filePath, buffer);
}

function multiPartParser(event) {
    const boundary = getBoundary(event);
    const result = {};
    event.body
        .split(boundary)
        .forEach(item => {
            if (/filename=".+"/g.test(item)) {

                let fileContents = item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4);
                let fileBuffer = Buffer.from(fileContents, 'binary');
                
                let fileName = item.match(/filename=".+"/g)[0].slice(10, -1);
                let filePath = getFilePath(event, fileName);
                saveFile(fileBuffer, filePath);

                result[item.match(/name=".+";/g)[0].slice(6, -2)] = {
                    type: 'file',
                    filename: fileName,
                    contentType: item.match(/Content-Type:\s.+/g)[0].slice(14),
                    path: filePath
                }

            } else if (/name=".+"/g.test(item)){
                result[item.match(/name=".+"/g)[0].slice(6, -1)] = item.slice(item.search(/name=".+"/g) + item.match(/name=".+"/g)[0].length + 4, -4);
            }
        });
    return result;
};

module.exports.parse = (event) => {

    // Creting base object
    let output = base_parser.createBaseObject(event);


    let clonedEvent = Object.assign({}, event);
 
    // AWS seems to send us data in the Base 64 encoded format.
    // So, we take that, decode it and update the event object.
    // We are then going to pass this data to the code above that I have 
    // extracted from https://github.com/myshenin/aws-lambda-multipart-parser
    // The author has put a big warning saying that the gem is no longer being
    // maintained. Had to modify the code to save the file from the buffer,
    // so have done that above.
    if (event.isBase64Encoded) {
        let body = clonedEvent.body;
        let decodedFromBase64 = Buffer.from(body, 'base64');
        clonedEvent.body = decodedFromBase64.toString('latin1');   
    }
    let result = multiPartParser(clonedEvent);
    
    // If there are any Query string params
    // we will take those and combine them with the params we got
    // from the POST data.
    let combinedParams = Object.assign(result, output.params);
    output.params = combinedParams;

    return output;
}