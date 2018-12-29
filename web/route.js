module.exports = function(db_) {

    const routes = require('express').Router()
    require('./auth')(routes, db_)

    routes.get('/', (req, res, next) => {
        console.log('[GET] /')
        let err = req.session.errors
        if (err) req.session.errors = null
        res.render('index', {
            title: 'Главная страница',
            success: req.session.success,
            errors: err,
            logined: req.session.logined,
            my_login: req.session.login
        })
    })

    // Редирект на 404, после - не должно быть GET-ов
    routes.get('*', (req, res, next) => {
        console.log('[GET] ' + req.url + ' --> [GET] /404')
        let err = req.session.errors
        if (err) req.session.errors = null
        res.status(404).render('404.html', {
            title: 'Страница не найдена',
            success: req.session.success,
            errors: err,
            logined: req.session.logined
        })
    })

    return routes
}