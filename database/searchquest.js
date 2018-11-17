// Export the ban func
exports.searchquestID = async function(rawQuery, message) {
    await searchquestID(rawQuery, message);
}

// Function to check if is banned
var searchquestID = async function searchquestID(rawQuery, message) {
	let toSend = '';
	let hit = false;
	let lines = require('fs').readFileSync('./inis/T_Mission.ini', 'latin1')
		.split('\n')
		.filter(Boolean);
	
	for(var num = 0; num < lines.length; num = num + 1){
		let l = lines[num].split('|');

		if(l[0] == rawQuery){
			toSend = 'ID: ' + l[0] + '\nQuest: ' + l[1] + '\nLocal/Info: ';
			if(l[2]){
				message.channel.send(toSend + l[2]);
			}else{
				message.channel.send(toSend + 'Sem dados.');
			}
			message.channel.send('https://pt.grandfantasia.info/missions/' + rawQuery);
			hit = true;
		}
	}
	
	if(!hit){
		message.channel.send('Quest não encontrada!');
	}
	
  return;
}

// Export the ban func
exports.searchquest = async function(rawQuery, message) {
    await searchquest(rawQuery, message);
}

// Function to check if is banned
var searchquest = async function searchquest(rawQuery, message) {
	let toSend = '';
	let hit = false;
	let lines = require('fs').readFileSync('./inis/T_Mission.ini', 'latin1')
		.split('\n')
		.filter(Boolean);
	
	for(var num = 0; num < lines.length; num = num + 1){
		let l = lines[num].split('|');

		if(l[1] == rawQuery){
			toSend = 'ID: ' + l[0] + '\nQuest: ' + l[1] + '\nLocal/Info: ';
			if(l[2]){
				message.channel.send(toSend + l[2]);
			}else{
				message.channel.send(toSend + 'Sem dados.');
			}
			message.channel.send('https://pt.grandfantasia.info/missions/' + rawQuery);
			hit = true;
		}
	}
	
	if(!hit){
		message.channel.send('Quest não encontrada!');
	}
	
  return;
}