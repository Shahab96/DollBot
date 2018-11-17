// Export the ban func
exports.searchmonsterID = async function(rawQuery, message) {
    await searchmonsterID(rawQuery, message);
}

// Function to check if is banned
var searchmonsterID = async function searchmonsterID(rawQuery, message) {
	
	let found = false;
	let toSend = '';
	let hit = false;
	let lines = require('fs').readFileSync('./inis/T_Monster.ini', 'latin1')
		.split('\n')
		.filter(Boolean);
	
	for(var num = 0; num < lines.length; num = num + 1){
		let l = lines[num].split('|');
		let id = Number(l[0]);

		if(id)
		{
			if(l[0] == rawQuery){
				toSend = 'ID: ' + l[0] + '\nMonstro: ' + l[1];
				found = true;
				hit = true;
			}else{
				if(found){
					message.channel.send(toSend);
					message.channel.send('https://pt.grandfantasia.info/monsters/' + rawQuery);
					break;
				}
			}
		}
		if(found && !id){
			toSend = toSend + ' ' + l[0];
		}
	}
	
	if(!hit){
		message.channel.send('Monstro não encontrado!');
	}
	
  return;
}

// Export the ban func
exports.searchmonster = async function(rawQuery, message) {
    await searchmonster(rawQuery, message);
}

// Function to check if is banned
var searchmonster = async function searchmonster(rawQuery, message) {
	let found = false;
	let hit = false;
	let nextline = false;
	
	let toSend = '';
	
	let lines = require('fs').readFileSync('./inis/T_Monster.ini', 'latin1')
		.split('\n')
		.filter(Boolean);
		
	let oldline = '';

	for(var num = 0; num < lines.length; num = num + 1){
		let l = lines[num].split('|');

		if(l[0] == rawQuery){
			message.channel.send('ID: ' + oldline[0] + '\nMonstro: ' + oldline[1] + ' ' + l[0]);
			message.channel.send('Link: https://pt.grandfantasia.info/monsters/' + oldline[0]);
			hit = true;
		}
		
		if(Number(l[0]))
		{
			if (l[1].includes('>')){
				oldline = l;
			}
			if(l[1] == rawQuery){
				message.channel.send('ID: ' + l[0] + '\nMonstro: ' + l[1]);
				message.channel.send('Link: https://pt.grandfantasia.info/monsters/' + l[0]);
				hit = true;
			}
		}
	}
	
	if(!hit){
		message.channel.send('Monstro não encontrado!');
	}
	
  return;
}