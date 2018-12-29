
// Подключение пакетов/зависимостей
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const expressSession = require('express-session')

// кодировка, порт, название сервера, адрес базы данных
const charset = 'utf8'
const server_port = process.env.PORT || 3000
const server_name = 'localhost'
const db_port = 27017
const db_url = 'mongodb://' + server_name + ':' + db_port + '/'

let app = express()


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

// Создание сервера
app.listen(server_port, () => {
    // Подключение к базе данных
    MongoClient.connect(db_url, {
        useNewUrlParser: !0
    }, (err, database) => {
        if (err) {
            return console.log(err)
        }
        const db_ = database.db('mongodb')
        /* 
        * Здесь можете сделать импорт базы данных
        * который будет сделан единожды, при первом запуске сервера
        * (Коллекция автоматически создается при объявлении)
        */
        db_.collection('users').countDocuments((err, count) => {
            if (!err && count === 0) {
                (() => {
                    let admin = {
                        login: 'admin',
                        password: 'admin'
                    }
                    db_.collection('users').insertOne(admin, (err, result) => {
                        if (err) {
                            console.log(err)
                            return res.status(500)
                        }
                        console.log('Аккаунт admin создан')
                    })
                    console.log('Коллекция users создана')
                })()
            }
        })
        // Запросы 
        app.use(require('./web/route')(db_))

    })

    console.log('Это работает! Проверьте в браузере: http://localhost:' + server_port)
})
