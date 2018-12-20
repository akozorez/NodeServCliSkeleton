# NodeServCliSkeleton

Скелет клиент-серверного приложения c mongodb и комментариями

Быстрое начало для ваших лабораторных по Nodejs 

UPD: добавлена авторизация и сессии, немного поменял стили ;)

#### Структура скелета

```
    /NodeServCliSkeleton
        server.js
        package.json
        /public
            client.js
            /css
            	style.css
            /views
                404.html
                index.html
                register.html
                login.html
        readme.md
```

### Установка
Необходим [Nodejs](https://nodejs.org/en/download/) стабильной версии
Необходим [MongoDB](https://docs.mongodb.com/manual/installation/) стабильной версии


```sh
$ cd NodeServCliSkeleton
$ npm install
```

### Запуск
```sh
$ npm run app
```

Если все запустилось без ошибок, то лог терминала будет такой:

```sh
Это работает: http://localhost:3000
Коллекция users создана
Коллекция hello создана
Аккаунт admin создан

```


ISC
----
