# Pinj-bird

Скелет клиент-серверного приложения c регистрацией и личным кабинетом на mongodb 

Быстрое начало для ваших лабораторных по Nodejs 

UPD: добавлена pinj-птичка для ошибок, немного поменял стили и код ;)

#### Структура приложения

```
    /pinj-bird
        /layouts
            footer.ejs
            header.ejs
        /public
            /assets
                /css
                    style.css
                /img
                /js
                    beautiful.js
            client.js
            favicon.ico
        /views
            404.html
            index.html
            register.html
            login.html    
        README.md
        server.js
        package.json
```

### Установка
Необходим [Nodejs](https://nodejs.org/en/download/) стабильной версии

Необходим [MongoDB](https://docs.mongodb.com/manual/installation/) стабильной версии


```sh
$ cd pinj-bird/
$ npm install
```

### Запуск
```sh
$ npm run server
```

При удачном первом запуске лог терминала будет такой:

```sh
Это работает: http://localhost:3000
Коллекция users создана
Коллекция hello создана
Аккаунт admin создан

```


ISC
----
