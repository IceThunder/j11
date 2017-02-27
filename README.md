# j11
nodejs &amp; mongodb simple blogic api server

## init project
Please make sure your software version
* npm >= 3.10
* node >= 6.9
* mongodb >= 2.6

Enter j11 folder, and run
* npm install --production

## About config.js
This is controllers and server config.
you can set mongodb server info in server json string.
### About controllers setting
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

## About Server API
* http://localhost/`controller name`
method = post
insert data to mongodb,collection name is controllers setting - collection name, please refer controllers setting input allow key to save.
* http://localhost/`controller name`/id
method = post
update data to mongodb, `id` is same to input id, if you not set id on insert, you can't find it and can't update it.
method = get
find data from mongodb, `id` is same to input id, if you not set id on insert, you can't find it and can't update it.
