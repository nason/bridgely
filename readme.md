# Bridgely

_This is a work in progress!_

Bridgely is a mobile directory with SMS capabilities intended to help companies bridge the gap between HR departments and employees.

Features include:
- Employee Registration by SMS
- Send messages
- Send questions and tag incoming responses

Bridgely consumes the Twilio API to send and receive text messages.

### Dependencies
- Bridgely API
- Backbone
- Bootstrap
- Grunt

### Configuration
1. Point the bridgelyApp.ApiUrl to your API
2. <tt>bower install</tt>
3. <tt>grunt build</tt>

### Deployment instructions
- <tt>grunt server</tt> to run locally.
- Otherwise copy <tt>dist</tt> folder to the server of your choice