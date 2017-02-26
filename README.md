# j11
nodejs &amp; mongodb simple blogic api server

## init project
please make sure your software version
* npm >= 3.10
* node >= 6.9
* mongodb >= 2.6

enter j11 folder, and run
* npm install --production

## config.js
This is controllers and server config.
you can set mongodb server info in server json string.
### About controllers
`controller name`: {
  `collection name`: "users",
  `input`: {
    `"id"`: `1`,
    `"name"`: `1`,
    `"phone"`: `1`,
    `"sex"`: `0`
  }
}
* controller name:
this is controller name, example:
http://localhost/`controller name`
* collection name:
this is collection name in mongodb.
* input:
this is controller can save key, you can add key to json, and every key have value(1 : must input, 0 : can input).
