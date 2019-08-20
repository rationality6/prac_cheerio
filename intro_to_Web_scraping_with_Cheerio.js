const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');

request('https://poiemaweb.com', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html)
        const programs = $('.toc-month')
        const result = programs.text()

        console.log(result)

        fs.writeFile('result.html', result, (err) => {
            if (err) throw err;
            console.log('result.html saved!');
        });

        fs.writeFile('saved.html', html, (err) => {
            if (err) throw err;
            console.log('saved.html saved!');
        });

    }
})


