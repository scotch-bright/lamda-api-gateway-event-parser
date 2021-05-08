const nested_prop_resolver = require('nested-prop-resolver');

module.exports.createBaseObject = (event) => {

    return {
        userAgent: nested_prop_resolver.resolve(event, 'requestContext.http.userAgent', null),
        originalEvent: event,
        params: nested_prop_resolver.resolve(event, 'queryStringParameters', {})
    }

}