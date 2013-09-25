# Bridgely

_This is a work in progress!_

Bridgely is a mobile directory with SMS capabilities intended to help companies bridge the gap between HR departments and employees.

Features include:
- Employee Registration by SMS
- Send messages
- Send questions and tag incoming responses

Bridgely consumes the Twilio API to send and receive text messages. The [Bridgely API](https://github.com/nason/bridgely-api/) must be configured with valid Twilio crendtials to send or receive text messages.

### Dependencies
- Bridgely API
- Backbone
- Backgrid
- Backgrid-paginator
- Backgrid-pageable
- jQuery
- Underscore
- Sass-Bootstrap
- Modernizr
- Grunt
- Bower

### Configuration
1. Point the bridgelyApp.apiUrl variable in <tt>app/scripts/main.js</tt> to your API
2. <tt>npm install</tt>
3. <tt>bower install</tt>
4. <tt>grunt build</tt>

### Deployment instructions
- <tt>grunt server</tt> to run locally.
- Otherwise copy <tt>dist</tt> folder to the server of your choice