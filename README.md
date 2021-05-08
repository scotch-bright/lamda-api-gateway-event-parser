# Video Version Of The Docs

[<img src="https://img.youtube.com/vi/sfEDKqzSreY/hqdefault.jpg" width="100%">](https://youtu.be/sfEDKqzSreY)

# What Does This Package Do? The Goal.
When you connect your AWS Lambda function to an AWS API Gateway **HTTP API**, you will get an "event" objection as a parameter.

This package helps you easily an uniformly extract the parameters from the event object. 

**The package, handles the following types of HTTP events / requests:**

 1. Simple GET Request with Query String Params
 2. POST, PUT, PATCH, DELETE request with **application/x-www-form-urlencoded** form data.
 3. POST, PUT, PATCH, DELETE request with **multipart/form-data** form data.
 4. JSON Body of HTTP Request
 5. XML Body of HTTP Request

## What you get as an output..

In **all the above cases**, you get as an output an object with 3 to 5 keys with the below shape:
```javascript
{
	userAgent: 'The user agent of the caller (in-case you need that)',
	originalEvent: {}, // the whole original event object, just in-case.
	prams: {}, // A nice neat prams object irrespective of the type of input HTTP event.
	error: 'In case there is an error parsing the XML or JSON, you get an error here.',
	[xmlString / jsonString]: 'The original XML / JSON string in-case you need that and are not happy with the parsing.' 
}
```
## Quick Start
### How to install?
The usual:
```
nmp i lamda-api-gateway-event-parser
yarn add lamda-api-gateway-event-parser
```
### How to use?
Usually, parsing the event will be the very first thing you do in your Lamda Function. So, just add it like so..
```javascript
const eventParser = require('lamda-api-gateway-event-parser'); // Bring it in.

exports.handler = async (event) => {
	let niceNeatParsedEvent = eventParser.parse(event); // Parsing the event.
    // All the other awesome things you need to do
};
```
## About File Uploads & multipart/form-data Events

If the event we get is of the type: multipart/form-data, the package will extract all the form fields as usual and make a nice neat "params" object as described above.

In the case of the file, the contents of the file will be saved into the "tmp" folder (which is provided by AWS Lamda). When the "params" object is looked at, it will look like the following:

```javascript
params: {
	simple_param_1: "Simple text value",
	file_upload_param_name: {
		type: 'file',
		filename: 'the name of the file',
		contentType: 'content type eg: image/jpeg',
		path: 'file path in lamda environment. eg: "/tmp/cat.jpeg"'
	}
}
```

Major credits to: https://github.com/myshenin/aws-lambda-multipart-parser for this part. But the repo is a little outdated and no longer maintained.

## Not working as expected? Check Here!
There are 2 assumptions this package makes (if your Lambda function is not running as per these assumptions, it may not work):

 1. On the API Gateway side, we are using HTTP API (**not REST API**). Why? Because, its FASTER & CHEAPER. [More info here.](https://aws.amazon.com/about-aws/whats-new/2019/12/amazon-api-gateway-offers-faster-cheaper-simpler-apis-using-http-apis-preview/)
 2. API Gateway version 2 (latest). This version has a different "event" object structure from version 1. Because of this, the package might not be able to identify the "event type" and deploy the correct parser. This is the default from AWS for new functions right now.
