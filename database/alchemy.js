var getImage64 = function getImage64(id, out){
	var request = require('request');
	var cheerio = require('cheerio');
	
	request('https://pt.grandfantasia.info/items/' + id, function (err, res, body) {
		// Log the error
		if (err) console.log('Erro: ' + err);

		// Load the DOM
		var $ = cheerio.load(body);
		
		// Get the aside.descbox.iconh elements
		$('.descbox.iconh').each(function (i, element) {
			//console.log($(this).find('img').attr('src').split(',')[1]);
			// return the image
			out = $(this).find('img').attr('src').split(',')[1];
		});
	});
}

// Export the ban func
exports.buildalch = async function(message) {
    await buildalch(message);
}

// Function to check if is banned
var buildalch = async function buildalch(message) {
	// These are to be used in web crawler
	var alquimia =[[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]],
					[[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1],[40362,1]]];
	// Image processing
	var jimp = require('jimp');

	
	jimp.read('./images/alq.png').then(image => {
			for(let j = 0; j < 5; j = j + 1){
				for(let i = 0; i < 8; i = i + 1){
					
					var answer = await getImage64(alquimia[j][i][0]);
					console.log(answer);
					/*let a = jimp.read(Buffer.from(answer));
					//console.log(a);
					image.composite(a, 3, 3);     // composites another Jimp image over this image at x, y
					image.write('lena-half-bw.png');
					return;
					*/
				}
			}
		}).catch(err => {
			message.channel.send('Erro ' + err);
		});
	
  return;
}


