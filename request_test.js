// const request = require('request')


// request('./scraping.html', (error, response, body) => {
//     console.error('error: ', error)
//     console.log("statusCode:", response && response.statusCode);
//     // console.log("body:",body)
// })

const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')

$('h2.title').text('Hello there!')
$('h2').addClass('welcome')

console.log($.html())