;(function() {
    var body = document.querySelector('body');
    var current_page = body.getAttribute('data-page-name');
    var app = document.querySelector('#app');
    var XMLHttpReq = function() {
        // this.get - метод, который делает GET с клиента,
        // Объект обязательно создавать через new!
        this.get = (uri, callback) => {
            var XML = new XMLHttpRequest();
            XML.onreadystatechange = () => {
                if (XML.readyState == 4 && XML.status == 200)
                    callback(XML.responseText)
            }
            XML.open("GET", uri, !0);
            XML.send(null)
        }
    }
    var client = new XMLHttpReq();

    if (current_page == 'homepage') {
        /*
            Делайте GET запросы с клиента на сервер, с помощью:
            client.get('/url', function(response){
                console.log(response);
            });
        */ 
        client.get('/hello', (response) => {
            // Создание параграфа с response.message, полученное из базы данных внутри
            var p = document.createElement('p');
            p.innerText = response;
            // Добавление параграфа внутри #app
            app.append(p)
        })
    }
    if (current_page == 'register') {
        console.log('register')
    }
    if (current_page == 'login') {
        console.log('login')
    }
})();