# j11
nodejs &amp; mongodb simple blogic api server

## Init project
Please make sure your software version
* npm >= 3.10.10
* node >= 6.9.4
* mongodb >= 2.6

Enter j11 folder, and run
* npm install --production

## Update project
Enter j11 folder, and run
* npm install --production

## About config.js
This is controllers and server config.
you can set mongodb server info in server json string.
`system.port` is server port.

### About controllers setting
`controller name`: {
  db: `"collection name"`,
  auth: 1,
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

* Add
* http://localhost/`controller name`
* Method: Post

Insert data to mongodb, collection name is controllers setting - collection name, please refer controllers setting input allow key to save. you can receive data id from response json.

* Update
* http://localhost/`controller name`/id
* Method: Post

Update data to mongodb, you can get id with after add success, and doesn't input id with post parameter, if you input , server will by automatically shield related operations.

* Search (`controller name.auth` : 0)
* http://localhost/`controller name`/id
* Method: Get

Find data from mongodb, if you set `controller name.auth` = 0 then, you have to use this api to search, `id` is same to input id, if you not set id on insert, you can't find it and can't update it.

* Search (`controller name.auth` : 1)
* http://localhost/`controller name`/id
* Method: Post

Find data from mongodb, if you set `controller name.auth` = 1 then, you have to use this api to search, `id` is same to input id, if you not set id on insert, you can't find it and can't update it.

* List
* http://localhost/list/`controller name`/`page`
* Method: Post

Query data from mongodb, if post parameter is null, you could receive error, please input query conditions, about allow input condition, please refer input config.js.
(About config `querylist`: if you set controller name to query , you can use list, if you set `auth` = 1 then, you have to using `hash` to query list.)

* Register
* http://localhost/auth/register
* Method: Post

You can use this api to add new user, `name` and `password` is must input , and you can input other item, but please input id , if you input it , server will by automatically shield related operations.

* Login
* http://localhost/auth/login
* Method: Post

You can use this api to get logged hash, `name` and `password` is must input, if name is not exists or password error ,you can't complte login. if you complte it, you can receive `hash`,this `hash` is unique certificate, if you login on next, the old `hash` had changed.

* Authupdate
* http://localhost/auth/authupdate
* Method: Post

You can use this api to change user info, `hash` is must input, but name is deny to change, you can add or update you infomation.

* Myinfo
* http://localhost/auth/info
* Method: Post

You can use this api to get your info, `hash` is must input.

* Pwd
* http://localhost/auth/pwd
* Method: Post

You can use this api to change your password, `hash`,`old_password` , `new_password`  is must input.
