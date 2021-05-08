const nested_prop_resolver = require('nested-prop-resolver');

module.exports.classify = (event) => {

    // Lets try and get the HTTP method.
    // If its a GET, then the API gateway will just give us a 'queryStringParameters'
    // object and there will not be much else to do.
    // If its a POST, PUT, PATCH, DELETE then we will look at the "content-type"
    // and based on that decide how we need to parse the event data.
    let method = nested_prop_resolver.resolve(event, 'requestContext.http.method', null);
    
    if ( method == 'GET' ) {
        return 'get';
    }

    if ( method == 'POST' || method == 'PUT' || method == 'PATCH' || method == 'DELETE' ) {
        let content_type = nested_prop_resolver.resolve(event, 'headers.content-type', null);

        // If the content_type is multipart/form-data it may take the following form
        // multipart/form-data; boundary=--------------------------167289481458508568236354
        // So, first thing I am going to do is split it by ";" and then strip extra spaces and then
        // will check what the content type really is

        let content_type_parts = content_type.split(";").map( ( string_part ) => string_part.trim() );
        let first_content_type_part = content_type_parts[0];

        // So, the output of the classfier if there is some fun content type
        // will just be the content type that the Lamda function is getting like:
        // multipart/form-data OR application/x-www-form-urlencoded OR application/json
        return first_content_type_part;
    }

    return null;
}