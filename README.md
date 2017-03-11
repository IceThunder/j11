# j11
nodejs &amp; mongodb simple blogic api server

## init project
Please make sure your software version
* npm >= 3.10.10
* node >= 6.9.4
* mongodb >= 2.6

Enter j11 folder, and run
* npm install --production

## About config.js
This is controllers and server config.
you can set mongodb server info in server json string.
### About controllers setting
`controller name`: {
  db: `"collection name"`,
  auth: "",
  input: {
    `"name"`: `1`,
    `"phone"`: `0`
  }
}
* controller name:
this is controller name, example:
http://localhost/`controller name`
* collection name:
this is collection name in mongodb.
* input - name phone:
this is controller can save key, you can add key to json, and every key have value(1 : must input, 0 : can input).


* Notes:
Please don't add 'id' into input List, if you add 'id' into input list, server will automatically shield related operations.

## About Server API
* Notes:
I prepared an jmeter example, in JMeter Folder, you can open it with JMeter.You can got it and read documents from http://jmeter.apache.org/

* add
* http://localhost/`controller name`
* method: post

insert data to mongodb,collection name is controllers setting - collection name, please refer controllers setting input allow key to save. you can receive data id from response json.

* update
* http://localhost/`controller name`/id
* method: post

update data to mongodb, you can get id with after add success, and doesn't input id with post parameter, if you input , server will by automatically shield related operations.

* search
* http://localhost/`controller name`/id
* method: get

find data from mongodb, `id` is same to input id, if you not set id on insert, you can't find it and can't update it.

* list
* http://localhost/list/`controller name`/
* method: post

query data from mongodb, if post parameter is null, you could receive error, please input query conditions, about allow input condition, please refer input config.js.

* register
* http://localhost/auth/register
* method: post

You can use this api to add new user, `name` and `password` is must input , and you can input other item, but please input id , if you input it , server will by automatically shield related operations.

* login
* http://localhost/auth/login
* method: post

You can use this api to get logged hash, `name` and `password` is must input, if name is not exists or password error ,you can't complte login. if you complte it, you can receive `hash`,this `hash` is unique certificate, if you login on next, the old `hash` had changed.

* authupdate
* http://localhost/auth/authupdate
* method: post

You can use this api to change user info, `hash` is must input, but name is deny to change, you can add or update you infomation.

* myinfo
* http://localhost/auth/info
* method: post

You can use this api to get your info, `hash` is must input.
