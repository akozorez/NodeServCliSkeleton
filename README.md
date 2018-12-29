# Pinj-bird
![Pinj-bird](https://raw.githubusercontent.com/seijuroseta/pinj-bird/master/public/assets/img/android-chrome-96x96.png)

Скелет клиент-серверного приложения c регистрацией и личным кабинетом на mongodb 

Быстрое начало для ваших лабораторных по Nodejs 

UPD: добавлена pinj-птичка для ошибок, немного поменял стили и код ;)

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

#### Структура приложения

```
    /pinj-bird
        /web - роутинг сайта, личного кабинета
        /layouts - шаблоны шапки и подвала     
        /views - вьюхи в html + ejs   
        /public
            client.js - для запросов на сервер  
        /public/assets
            /css - стили
            /img - картинки
            /js - модули для клиента
        server.js - сервер
        package.json - зависимости
```

