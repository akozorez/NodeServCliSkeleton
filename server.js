
// Подключение пакетов
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// Инициализация конфигурации
var assets = path.join(__dirname, '.', 'public');
var charset = 'utf8';
var app = express();
var port = process.env.PORT || 3000;
var db_;

// Подключение конфигураций
app.use(bodyParser.urlencoded({
        extended: !1
    }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// GET & POST запросы
app.get('/', function(req, res) {
    res.status(200).render('index.html')
});
app.get('/hello-world', function(req, res) {
    // Поиск в коллекции объекта с data
    var data = {type:'string'};
    db_.collection('my-collection').findOne(data, function(err, response){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(200).send(response.message);
    });
});
app.get('/my-collection', function(req, res){
    // Возвращение коллекции как JSON
    db_.collection('my-collection').find().toArray(function(err, data){
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(data);
    });
});

// Подключение к базе данных
MongoClient.connect('mongodb://localhost:27017/', {
    useNewUrlParser: !0
    }, function(err, database) {
        if (err) {
            return console.log(err)
        }
        db_ = database.db('mongodb');
        db_.collection('my-collection').countDocuments(function(err, count){
            if(!err && count === 0){
                /* 
                * Здесь можете сделать импорт базы данных
                * который будет сделан единожды, при первом запуске сервера
                */

                // Вставка в коллекцию объекта data (Коллекция автоматически создается при объявлении)
                var data = {type:'string', message:'Приветики пистолетики!'};
                db_.collection('my-collection').insertOne(data, function(err, result){
                    if(err){
                        console.log(err);
                        return res.sendStatus(500);
                    }
                    console.log('Коллекция my-collection создана');
                });
            }
        });
});

// Редирект на 404, после - не должно быть GET-ов
app.get('*',function(req, res){
    res.status(404).render('404.html');
});

// Создание сервера на заданном порте
app.listen(port, function() {
    console.log('Это работает: http://localhost:'+port);
})