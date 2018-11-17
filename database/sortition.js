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
exports.sortition = async function(msglen, message) {
    await sortition(msglen, message);
}

// Function to check if is banned
var sortition = async function sortition(msglen, message) {

	if (msglen > 100) {
		message.channel.send('Não vacila, eu vou levar um ano...');
	}
	
	var names = []
	var ids = []
	
	const messages = await message.channel.fetchMessages({
		limit: 100,
		});
	
	var previousMessages = messages;
	var iterations = 0;
	
	message.channel.send('Trabalhando... aguarde uns instantes!');
	//message.channel.send('Working on it, please wait');
	
	do{
		previousMessages = await message.channel.fetchMessages({
			limit: 100,
			before: previousMessages.last().id,
		});
		messages.concat(previousMessages);
		iterations = iterations + 1;
		
	}while((previousMessages && previousMessages.size == 100) && iterations < msglen)

	const nonBotMessages = messages.filter(message => !message.author.bot);
	
	nonBotMessages.forEach(function(mesg){
		
		if (ids.indexOf(mesg.author.id) === -1) {
			ids.push(mesg.author.id);
		}
		if (names.indexOf(mesg.author.username) === -1) {
			names.push(mesg.author.username);
		}
	});
	
	//message.channel.send(names[Math.floor(Math.random() * names.length)] + ' is the winner!') 
	//message.channel.send('<@' + ids[Math.floor(Math.random() * ids.length)] + '> is the winner!');
	
	message.channel.send('<@' + ids[Math.floor(Math.random() * ids.length)] + '> é o vencedor!');
	
  return;
}