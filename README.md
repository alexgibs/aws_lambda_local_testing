This script can be used for offline testing of NodeJS AWS Lambda functions.

## Instructions:

Install NodeJS locally - see here for the current version used in AWS: http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html

I personally use 'n' to install and manage multiple versions of NodeJS:

```
npm install -g n
n 0.10.36
```

Install your npm modules as required.


## Invoke function:

Write your function in the index.js file and invoke it with:

 `./lambdainvoke.js`
 
Note: if you are using a different filename and/or handler specify these as arguments:

 `./lambdainvoke.js filename.js myhandler`
 

## AWS Credentials:

If you are using the aws-sdk in your function add your AWS api keys to the 'aws-credentials.json' file.


## Event Source:
Modify the event.json file to add your test event payload.

Example - SNS Notification event:

```
{
  "Records": [
    {
      "EventSource": "aws:sns",
      "EventVersion": "1.0",
      "EventSubscriptionArn": "arn:aws:sns:EXAMPLE",
      "Sns": {
        "Type": "Notification",
        "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
        "TopicArn": "arn:aws:sns:EXAMPLE",
        "Subject": "TestInvoke",
        "Message": "Hello from SNS!",
        "Timestamp": "1970-01-01T00:00:00.000Z",
        "SignatureVersion": "1",
        "Signature": "EXAMPLE",
        "SigningCertUrl": "EXAMPLE",
        "UnsubscribeUrl": "EXAMPLE",
        "MessageAttributes": {
          "Test": {
            "Type": "String",
            "Value": "TestString"
          },
          "TestBinary": {
            "Type": "Binary",
            "Value": "TestBinary"
          }
        }
      }
    }
  ]
}
```