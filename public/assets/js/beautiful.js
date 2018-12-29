export let XMLHttpReq = function() {
    let stableXMLHttpRequest = function() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
        try {
            return new ActiveXObject('MSXML2.XMLHTTP.6.0')
        } catch (e) {
            try {
                return new ActiveXObject('MSXML2.XMLHTTP.3.0')
            } catch (e) {
                console.log('[ERROR]:XMLHttpRequest')
                return null
            }
        }
    }
    this.get = function(uri, next) {
        let xhr = stableXMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState == xhr.HEADERS_RECEIVED && xhr.status != 200) {
                let message = '[GET] ' + uri + ' [' + xhr.status + '] ' + xhr.statusText
                next(message)
            }
            if (xhr.readyState == xhr.DONE && xhr.status == 200) {
                next(xhr.responseText)
            }
        }
        xhr.open("GET", uri, !0)
        xhr.send(null)
    }
    this.post = function(uri, params, next) {
        let xhr = stableXMLHttpRequest()
        xhr.open('POST', uri, !0)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function() {
            if (xhr.readyState == xhr.HEADERS_RECEIVED && xhr.status != 200) {
                let message = '[POST] ' + uri + ' [' + xhr.status + '] ' + xhr.statusText
                next(message)
            }
            if (xhr.readyState == 4 && xhr.status == 200) {
                next(xhr.responseText)
            }
        }
        xhr.send(JSON.parse(JSON.stringify(params)))
    }
}

export let nullORjson = function(string) {
    try {
        JSON.parse(string)
    } catch (e) {
        return null
    }
    return JSON.parse(string)
}

export let pinjbird = function(fadeInDelay, fadeOutDelay, removeDelay) {
    
    this.animate = function(selectorName) {

        let bird = document.querySelector(selectorName)
        let birdsCount = document.querySelectorAll('.pinj-bird').length - 1

        if (bird)
            bird.style.top = (bird.clientHeight * birdsCount) + 'px',
            bird.style.right = '-' + bird.clientWidth + 'px',
            setTimeout(() => {    
                bird.style.right = 0, 
                setTimeout(() => {
                    bird.style.right = '-' + bird.clientWidth + 'px', 
                    setTimeout(() => {
                        bird.parentNode.removeChild(bird)
                    }, removeDelay)
                }, fadeOutDelay)

            }, (birdsCount * fadeInDelay))
            
    }
    
    this.create = function(id, birdType, birdText) {

        let bird = document.createElement('div'),
            p = document.createElement('p'),
            body = document.querySelectorAll('body')[0]

        bird.setAttribute('id', id)
        bird.setAttribute('class', 'pinj-bird ' + birdType)
        p.setAttribute('class', 'message-p')
        p.innerText = birdText

        body.prepend(bird)
        bird.append(p)
    }

}