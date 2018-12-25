// Подключение пакетов/зависимостей
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var expressSession = require('express-session');
// Инициализация конфигурации
var assets = path.join(__dirname, '.', 'public');
var charset = 'utf8';
var app = express();
var server_port = process.env.PORT || 3000;
var server_name = 'localhost';
var db_port = 27017;
var db_url = 'mongodb://' + server_name + ':' + db_port + '/';
var db_;
// Подключение конфигурации
app.use(bodyParser.urlencoded({
    extended: !1
}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(expressSession({
    secret: 'privetiki',
    saveUninitialized: !1,
    resave: !1,
    maxAge: new Date(Date.now() + 3600000),
    expires: new Date(Date.now() + 3600000)
}))
app.set('views', __dirname + '/views')
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
// GET & POST запросы
app.get('/', (req, res, next) => {
    console.log('[GET] /')
    var err = req.session.errors;
    if (err) req.session.errors = null;
    res.render('index', {
        success: req.session.success,
        errors: err,
        logined: req.session.logined
    })
})
app.get('/hello', (req, res, next) => {
    console.log('[GET] /hello')
    // Поиск в коллекции объекта с data
    var data = {
        type: 'string'
    };
    db_.collection('hello').findOne(data, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500)
        }
        res.status(200).send(response.message)
    })
})
app.get('/register', (req, res, next) => {
    console.log('[GET] /register')
    if (!req.session.logined) {
        var err = req.session.errors;
        if (err) req.session.errors = null;
        res.render('register', {
            success: req.session.success,
            errors: err,
            logined: req.session.logined
        })
    } else res.redirect('/')
})
app.post('/register', (req, res, next) => {
    console.log('[POST] /register');
    // Ошибки
    const passwords_not_match = 'Пароли не совпадают';
    const passwords_is_less = 'Пароль должен содержать от 6 символов';
    const login_is_less = 'Логин должен содержать от 6 символов';
    const login_is_busy = 'Такой логин уже существует';
    // Без ошибок
    const success_register = 'Аккаунт успешно создан';
    // Регистрация
    ((login, psw, repeat_psw) => {
        if (psw != repeat_psw) {
            req.session.errors = passwords_not_match;
            req.session.success = !1;
            res.redirect('/register')
        } else if (psw.length < 6) {
            req.session.errors = passwords_is_less;
            req.session.success = !1;
            res.redirect('/register')
        } else if (login.length < 6) {
            req.session.errors = login_is_less;
            req.session.success = !1;
            res.redirect('/register')
        } else {
            var search = {
                login: login
            };
            db_.collection('users').findOne(search, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500)
                }
                if (data !== null) {
                    req.session.errors = login_is_busy;
                    req.session.success = !1;
                    res.redirect('/register')
                } else {
                    var data = {
                        login: login,
                        password: psw
                    };
                    db_.collection('users').insertOne(data, (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500)
                        }
                        console.log('Аккаунт ' + login + ' создан');
                        req.session.errors = success_register;
                        req.session.success = !0;
                        res.redirect('/login')
                    })
                }
            })
        }
    })(req.body.login, req.body.psw, req.body.psw_repeat)
})
app.get('/login', (req, res, next) => {
    console.log('[GET] /login')
    if (!req.session.logined) {
        var err = req.session.errors;
        if (err) req.session.errors = null;
        res.render('login', {
            success: req.session.success,
            errors: err,
            logined: req.session.logined
        })
    } else res.redirect('/')
})
app.post('/login', (req, res, next) => {
    console.log('[POST] /login')
    // Ошибки
    const passwords_incorrect = 'Данные не удовлетворяют нашим записям';
    const login_is_incorrect = 'Такого логина не существует';
    // Без ошибок
    const success_login = 'Вы успешно вошли в систему';
    // Авторизация
    ((login, psw) => {
        var search = {
            login: login
        };
        db_.collection('users').findOne(search, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500)
            }
            var data = JSON.parse(JSON.stringify(data));
            if (data !== null) {
                if (data.password != psw) {
                    req.session.errors = passwords_incorrect;
                    req.session.success = !1;
                    res.redirect('/login')
                } else {
                    req.session.errors = success_login;
                    req.session.success = !0;
                    req.session.logined = !0;
                    res.redirect('/')
                }
            } else {
                req.session.errors = login_is_incorrect;
                req.session.success = !1;
                res.redirect('/login')
            }
        })
    })(req.body.login, req.body.psw)
})
app.get('/logout', (req, res, next) => {
    console.log('[GET] /logout')
    if (!req.session.logined) {
        res.redirect('/')
    } else {
        req.session.errors = 'Вы успешно вышли из системы';
        req.session.success = !0;
        req.session.logined = !1;
        res.redirect('/')
    }
})
// Редирект на 404, после - не должно быть GET-ов
app.get('*', (req, res, next) => {
    console.log('[GET] /*?404')
    res.status(404).render('404.html')
})
// Создание сервера на заданном порте
app.listen(server_port, () => {
    // Подключение к базе данных
    MongoClient.connect(db_url, {
        useNewUrlParser: !0
    }, (err, database) => {
        if (err) {
            return console.log(err)
        }
        db_ = database.db('mongodb');
        /* 
        * Здесь можете сделать импорт базы данных
        * который будет сделан единожды, при первом запуске сервера
        */
        db_.collection('hello').countDocuments((err, count) => {
            if (!err && count === 0) {
                // Вставка в коллекцию объекта data 
                // (Коллекция автоматически создается при объявлении)
                var data = {
                    type: 'string',
                    message: 'приветики пистолетики!'
                };
                db_.collection('hello').insertOne(data, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500)
                    }
                    console.log('Коллекция hello создана')
                })
            }
        })
        // Инициализация и валидация полей пользователя 
        // (Коллекция автоматически создается при объявлении)
        // Этот код лучше не трогать
        db_.collection('users').countDocuments((err, count) => {
            if (!err && count === 0) {
                // Функция создания коллекции пользователей
                (() => {
                    db_.collection('users', {
                        validator: {
                            $jsonSchema: {
                                bsonType: "object",
                                required: ["login", "password"],
                                properties: {
                                    login: {
                                        bsonType: "string",
                                        description: "must be a string and is required"
                                    },
                                    password: {
                                        bsonType: "string",
                                        description: "must be a string and is required"
                                    }
                                }
                            }
                        },
                        validationAction: "warn"
                    })
                    var data = {
                        login: 'admin',
                        password: 'admin'
                    };
                    db_.collection('users').insertOne(data, (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500)
                        }
                        console.log('Аккаунт admin создан')
                    })
                    console.log('Коллекция users создана')
                })()
            }
        })
    })
    console.log('Это работает: http://localhost:' + server_port)
})
