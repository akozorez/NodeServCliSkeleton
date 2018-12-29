import { 
	pinjbird,
	XMLHttpReq,
	nullORjson
} from '/assets/js/beautiful.js'

let bird = new pinjbird(250, 2500, 1000)
bird.animate('#error_box')

let client = new XMLHttpReq()

/*client.get('/he1llo', ( response ) => {

    let data = nullORjson(response)

	bird.create('new_bird', 
		data==null ? 'error' : 'success', 
		'[GET] /he1llo завершился' + (data==null ? ' неудачно' : 'удачно'))

	bird.animate('#new_bird')

    console.log(data)

})

client.get('/hello', ( response ) => {

    let data = nullORjson(response)

	bird.create('new_bird', 
		data==null ? 'error' : 'success', 
		'[GET] /hello завершился ' + (data==null ? ' неудачно' : 'удачно'))

	bird.animate('#new_bird')

    console.log(data)

})
*/