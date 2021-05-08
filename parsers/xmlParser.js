const base_parser = require('./base_parser');
var convert = require('xml-js');

module.exports.parse = (event) => {
    // Creting base object
    let output = base_parser.createBaseObject(event);

    let clonedEvent = Object.assign({}, event);

    if (event.isBase64Encoded) {
        let body = clonedEvent.body;
        let decodedFromBase64 = Buffer.from(body, 'base64');
        clonedEvent.body = decodedFromBase64.toString('utf-8');   
    }


    try {
        var parsedJSON = convert.xml2js(clonedEvent.body, {compact: true, spaces: 4});
        let combinedParams = Object.assign(parsedJSON, output.params);
        output.params = combinedParams;
        output.xmlString = clonedEvent.body;
    } catch(e) {
        output.error = ['An attempt to prase XML was made. But, XML parsing in the body failed. Please check the body.'];
    }


    return output;
}