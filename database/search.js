// These are to be used in web crawler
var request = require('request');
var cheerio = require('cheerio');

// To remove accents from queries
var accents = require('remove-accents')

const datas = require("../infos.json");

var lang = null;

switch(datas.lang) {
	default:
	case 'pt-br':
		lang = require("../lang/ptbr.json");
		break;
	case 'en-us':
		lang = require("../lang/enus.json");
		break;
}

exports.searchGFDB = (rawQuery, message) => {

//function searchGFDB(rawQuery, message) {
    // Remove accents from query
    query = accents.remove(rawQuery);

    // Turn spaces into +
    query = query.replace(/ /g, "+");

    // Initialize an empty data string
    //var data = ''

    var limit = 0;

    request('https://pt.grandfantasia.info/?q=' + query, function (err, res, body) {
        // Log the error
        if (err) console.log('Erro: ' + err);

        // Load the DOM
        var $ = cheerio.load(body);

        // Log the site
        //console.log('https://pt.grandfantasia.info/?q=' + query);

        // Log the body
        //console.log(body);

        var limit = 0;
        // Get the aside.descbox.iconh elements
        $('.descbox.iconh').each(function (i, element) {

            // Grab the name and level of item
            var name = $(this).find('.color-headline > a').text().trim();
            var level = $(this).find('.color-headline a > span').text().trim();
            var link = $(this).find('.color-headline a').attr('href');
			var id = link.split('--')[0].split('/')[2];

            // Log the data
            //console.log('Titulo: ' + name + '\nLink: https://pt.grandfantasia.info' + link + '\n');

            if (limit < 5) {
                message.channel.send(name + '\nID: ' + id + '\nLink: <https://pt.grandfantasia.info' + link + '>\n');
                //esults
            } else {
                // If limit is passed you can finish the function
                return;
            }
            limit = limit + 1;
        });

        // If nothing has been found
        if (limit === 0) {
            // Say it!
			message.channel.send(lang.thesearch + rawQuery + lang.noresult);
        }
    });
    // End of Function
    return;
}