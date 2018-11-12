// These are to be used in web crawler
var request = require('request');
var cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// To remove accents from queries
var accents = require('remove-accents');

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

// Export the ban func
exports.isban = async function(rawQuery, message) {
    await isban(rawQuery, message);
}

// Function to check if is banned
var isban = async function isban(rawQuery, message) {
	
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	
	// Remove accents from query
	query = accents.remove(rawQuery);
	
	await page.goto('https://www.aeriagames.com/user/' + query);
	//await page.waitFor(10);
	
	
	const isItBan = await page.evaluate(() => {
		
		// Check if user exists
		try{
			// Searching the id "error-page" 
			let exist = document.querySelector('#error-page').length;
			return -1;
		}
		catch(exception){
			// Since user is real, try to find banned only page id "#drupal_title"
			try{
				// It has been found, it is banned
				let ban = document.querySelector('#drupal_title').length;
				return ban;
			}
			catch(excpetion2){
				// Nothing has been found, it is not banned
				return 0;
			}
		}
	});
	
	// If variable is -1, means no user with given name
	if (isItBan === -1) {
		// Say it!
		message.channel.send(lang.theuser + rawQuery + lang.notexists);
	}
	else{
		// If nothing has been found its not banned
		if (isItBan === 0) {
			// Say it!
			message.channel.send(lang.theuser + rawQuery + lang.notbeaned);
		}
		// Otherwise its banned
		else {
			message.channel.send(lang.theuser + rawQuery + lang.isbeaned);
		}
	}
	browser.close();
	
  return;
}