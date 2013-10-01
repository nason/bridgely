# Bridgely

Bridgely is a mobile directory with SMS capabilities that helps bridge the communication gap between HR departments and employees.

Features include:
- Employee Registration by SMS
- Autoresponders with uniquely generated urls
- Send SMS messages
- Send SMS questions and tag incoming responses as answers

Bridgely consumes the Twilio API to send and receive text messages. The [Bridgely API](https://github.com/nason/bridgely-api/) must be configured with valid Twilio credentials in order to send or receive text messages with Bridgely.

# Why Bridgely?

Bridgely is a mobile communications platform that enables company comminucation with with hard-to-reach employees, from a distributed team to an out-of-date or nonexistant mobile phone directory. It supoprts two-way communication, so companies can ask questions, store employees' responses, and filter through employees based on their answers.

Bridgely was built as a client project for [ForUs](http://www.forusall.com), which will be using it to help corporations communicate information about retirement packages to their employees.

# Front- & Back-end

I built Bridgely as two separate modules, a Backbone frontend and a Rails backend. I decided to take this route so the front-end could be customized and deployed for companies as necessary, and so the back-end could be scaled seperately to handle large directories and high volumes of SMS messages.

For a simple deployment the frontend can be run on the same server as the API. This is the default configuration. If your backend is served seperately, you just have to change one variable...see the Delpoyment Instructions below.

# Tech Stack
- Backbone.js
- Backgrid.js
- Underscore.js
- jQuery
- [Bridgely API](https://github.com/nason/bridgely-api/)

# Configuration
1. If your backend is served elsewhere, point the bridgelyApp.apiUrl variable in <tt>app/scripts/main.js</tt> to your API
2. <tt>npm install</tt>
3. <tt>bower install</tt>
4. <tt>grunt build</tt>

# Deployment Instructions
- <tt>grunt server</tt> to run locally.
- Otherwise copy the <tt>dist</tt> folder to a publicly accessible folder on the server of your choice