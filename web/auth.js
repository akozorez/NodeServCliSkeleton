module.exports = function(routes, db_) {

    const passwords_not_match = 'Пароли не совпадают'
    const passwords_is_less = 'Пароль должен содержать от 6 символов'
    const login_is_less = 'Логин должен содержать от 6 символов'
    const login_is_busy = 'Такой логин уже существует'
    const success_register = 'Аккаунт успешно создан'
    const data_incorrect = 'Данные не удовлетворяют нашим записям'
    const success_login = 'Вы успешно вошли в систему'
    const success_logout = 'Вы успешно вышли из системы'

    let server_log = function(string) {
        return string + ' ' + +' ms'
    }

    routes.get('/register', (req, res, next) => {
        console.log('[GET] /register');
        if (!req.session.logined) {
            let err = req.session.errors
            if (err) req.session.errors = null
            res.render('register', {
                title: 'Регистрация',
                success: req.session.success,
                errors: err,
                logined: req.session.logined
            })
        } else res.redirect('/')

    })
    routes.get('/login', (req, res, next) => {
        console.log('[GET] /login');
        if (!req.session.logined) {
            let err = req.session.errors
            if (err) req.session.errors = null
            res.render('login', {
                title: 'Авторизация',
                success: req.session.success,
                errors: err,
                logined: req.session.logined
            })
        } else res.redirect('/')
    })
    routes.get('/logout', (req, res, next) => {
        console.log('[GET] /logout');
        if (!req.session.logined) {
            res.redirect('/')
        } else {
            req.session.errors = success_logout
            req.session.success = !0
            req.session.logined = !1
            res.redirect('/')
        }
    })
    routes.post('/register', (req, res, next) => {
        console.log('[POST] /register');
        // Регистрация
        ((login, psw, repeat_psw) => {
            if (login.length < 6) {
                req.session.errors = login_is_less
                req.session.success = !1
                res.redirect('/register')
            } else if (psw.length < 6) {
                req.session.errors = passwords_is_less
                req.session.success = !1
                res.redirect('/register')
            } else if (psw != repeat_psw) {
                req.session.errors = passwords_not_match
                req.session.success = !1
                res.redirect('/register')
            } else {
                let search = {
                    login: login
                }
                db_.collection('users').findOne(search, (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.status(500)
                    }
                    if (data !== null) {
                        req.session.errors = login_is_busy
                        req.session.success = !1
                        res.redirect('/register')
                    } else {
                        var user = {
                            login: login,
                            password: psw
                        }
                        db_.collection('users').insertOne(user, (err, result) => {
                            if (err) {
                                console.log(err)
                                return res.status(500)
                            }
                            console.log('Аккаунт ' + login + ' создан')
                            req.session.errors = success_register
                            req.session.success = !0
                            res.redirect('/login')
                        })
                    }
                })
            }
        })(req.body.login, req.body.psw, req.body.psw_repeat)
    })

    routes.post('/login', (req, res, next) => {
        console.log('[POST] /login');
        // Авторизация
        ((login, psw) => {
            let search = {
                login: login
            }
            db_.collection('users').findOne(search, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500)
                }
                var data = JSON.parse(JSON.stringify(data))
                if (data !== null) {
                    if (data.password != psw) {
                        req.session.errors = data_incorrect
                        req.session.success = !1
                        res.redirect('/login')
                    } else {
                        req.session.errors = success_login
                        req.session.success = !0
                        req.session.logined = !0
                        req.session.login = login
                        res.redirect('/')
                    }
                } else {
                    req.session.errors = data_incorrect
                    req.session.success = !1
                    res.redirect('/login')
                }
            })
        })(req.body.login, req.body.psw)
    })

}