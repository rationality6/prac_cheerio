const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');

const writeStream = fs.createWriteStream('result.csv')
writeStream.write(`Title \n`)

request('https://poiemaweb.com', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html)

        let titles = []

        $('.toc-month').each((i, el) => {
            const data = $(el)
                .find('a')
                .text()
                .trim()

            titles.push(data)
        })

        fs.writeFile('result.html', titles, (err) => {
            if (err) throw err;
            console.log('result.html saved!');
        });

        fs.writeFile('saved.html', html, (err) => {
            if (err) throw err;
            console.log('saved.html saved!');
        });

        writeStream.write(`${titles}`)

    }
})


