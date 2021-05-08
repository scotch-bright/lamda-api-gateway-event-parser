const queryString = require('query-string');
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

    const parsed = queryString.parse(clonedEvent.body);
    const simpleParsed = { ...parsed };

    let combinedParams = Object.assign(simpleParsed, output.params);
    output.params = combinedParams;

    return output;
}