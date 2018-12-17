;(function() {

    // this.get - функция, которая делает GET с клиента
    var XMLHttpReq = function() {
        this.get = function(uri, callback) {
            var XML = new XMLHttpRequest();
            XML.onreadystatechange = function() {
                if (XML.readyState == 4 && XML.status == 200)
                    callback(XML.responseText)
            }
            XML.open("GET", uri, !0);
            XML.send(null)
        }
    }
    var client = new XMLHttpReq();
    /*
        Делайте GET запросы с клиента на сервер, с помощью:
        client.get('/url', function(response){
            console.log(response);
        });
    */ 
    client.get('/hello-world', function(response){
        // Выборка селектора с id = app
        var app = document.querySelector('#app');
        // Создание параграфа с соответствующим текстом внутри
        var p = document.createElement('p');
        p.innerText = response;
        // Добавление параграфа внутри #app
        app.appendChild(p);
        // Создание ссылки на /my-collection и добавление внутри #app
        var a = document.createElement('a');
        a.setAttribute('href','/my-collection');
        a.innerText = 'Посмотреть базу данных';
        app.appendChild(a);
    });

})();