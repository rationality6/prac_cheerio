const request = require('request')
const cheerio = require('cheerio')
let jsonframe = require('jsonframe-cheerio')
const fs = require('fs');

const promise_wrap_readfile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (error, data) => {
            if (error)
                reject(error);
            else
                resolve(data);
        })
    })
}

promise_wrap_readfile('./scraping_sample0.html')
    .then(data => {

        const $ = cheerio.load(data)
        jsonframe($)

        var frame = {
            "companies": {           // setting the parent item as "companies"
                "selector": ".item",    // defines the elements to search for
                "data": [{              // "data": [{}] defines a list of items
                    "name": ".header [itemprop=name]",          // inline selector defining "name" so "company"."name"
                    "description": ".header [rel=description]", // inline selector defining "description" as "company"."description"
                    "url": {                                    // defining "url" by an attribute with "attr" and "selector" in an object
                        "selector": ".header [itemprop=name]",      // is actually the same as the inline selector
                        "attr": "href"                              // the attribute name to retrieve
                    },
                    "contact": {                                // set up a parent "contact" element as "company"."contact"
                        "selector": ".contact",                 // defines the element to search for
                        "data": {                               // defines the data which "contact" will contain
                            "telephone": {                          // using "type" to use "telephone" parser to extract only the telephone
                                "selector": "[itemprop=telephone]",     // simple selector for "telephone"                
                                "type": "telephone"                     // using "telephone" plugin parser
                            },
                            "employee": {                           // setting a parent node "employee" as "company"."contact"."employee"
                                "name": "[itemprop=employeeName]",          // inline selector defining "name"
                                "jobTitle": "[itemprop=employeeJobTitle]",  // inline selector defining "jobtitle"
                                "email": {                          // using "type" to use "email" parser to extract only the email
                                    "selector": "[itemprop=email]",     // simple selector for "email"
                                    "type": "email"                     // using "email" plugin parser
                                }
                            }
                        }
                    }
                }]
            }
        };

        var companiesList = $('.list.items').scrape(frame, { string: true });
        console.log(companiesList); // Output the data in the terminal


    }).catch(err => {
        console.log(err)
    })
