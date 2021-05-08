const base_parser = require('./base_parser');

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
        var parsedJSON = JSON.parse(clonedEvent.body);
        let combinedParams = Object.assign(parsedJSON, output.params);
        output.params = combinedParams;
        output.jsonString = clonedEvent.body;
    } catch(e) {
        output.error = ['An attempt to prase JSON was made. But, JSON parsing in the body failed. Please check the body.'];
    }

    return output;
}