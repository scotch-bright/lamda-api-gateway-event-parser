const eventClassifier = require('./event_classifier');
const baseParser = require('./parsers/base_parser');
const multiPartFormDataParser = require('./parsers/multipart_form_data_parser');
const urlEncodedFormDataParser = require('./parsers/urlEncodedFormDataParser');
const xmlParser = require('./parsers/xmlParser');
const jsonParser = require('./parsers/jsonParser');


let parser = function(event) {

    let content_type = eventClassifier.classify(event);

    switch(content_type) {
        case 'get':
            return baseParser.createBaseObject(event);
            break;
        case 'multipart/form-data':
            return multiPartFormDataParser.parse(event);
            break;
        case 'application/x-www-form-urlencoded':
            return urlEncodedFormDataParser.parse(event);
            break;
        case 'application/xml':
            return xmlParser.parse(event);
            break;
        case 'application/json':
            return jsonParser.parse(event);
            break;
        default:
            return null;
    }

}

exports.parse = function(event) {
    return parser(event);
}