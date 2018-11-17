
// Export the searchtitleid func
exports.searchtitle = async function(rawQuery, message) {
    await searchtitle(rawQuery, message);
}

var searchtitleid = async function searchtitleid(rawQuery, message) {

	let found = false;
	let toSend = '';
	let hit = false;
	let lines = require('fs').readFileSync('../inis/T_Title.ini', 'latin1')
		.split('\n')
		.filter(Boolean);
		
	for(var num = 0; num < lines.length; num = num + 1){
		let l = lines[num].split('|');
		let id = Number(l[0]);
		
		if(id)
		{
			if(l[1] == rawQuery){
				toSend = 'Título: ' + l[1] + '\nID: ' + l[0] + '\nEfeito: ';
				
				if(!l[2]){
					toSend = toSend + 'Sem efeito';
					message.channel.send(toSend);
					hit = true;
					break;
				}
					
				found = true;
				hit = true;
			}else{
				if(found){
					message.channel.send(toSend);
					break;
				}
			}
		}
		if(found && !id){
			toSend = toSend + '\n\t' + l[0];
		}
	}
	
	if(!hit){
		message.channel.send('Título não encontrado!');
	}
}

// Export the searchtitleid func
exports.searchtitleid = async function(rawQuery, message) {
    await searchtitleid(rawQuery, message);
}

// Function to check if is banned
var searchtitleid = async function searchtitleid(rawQuery, message) {
	let found = false;
	let toSend = '';
	let hit = false;
	let lines = require('fs').readFileSync('../inis/T_Title.ini', 'latin1')
		.split('\n')
		.filter(Boolean);
		
	for(var num = 0; num < lines.length; num = num + 1){
		let l = lines[num].split('|');
		
		let id = Number(l[0]);
		
		if(id)
		{
			if(id == args){
				toSend = 'Título: ' + l[1] + '\nID: ' + l[0] + '\nEfeito: ';
				
				if(l[2]){
					toSend = toSend + l[2];
				}else{
					toSend = toSend + 'Sem efeito';
					message.channel.send(toSend);
					hit = true;
					break;
				}
					
				found = true;
				hit = true;
			}else{
				if(found1){
					message.channel.send(toSend);
					break;
				}
			}
		}
		
		if(found && !id){
			toSend = toSend + '\n\t' + l[0];
		}
	}
	
	if(!hit){
		message.channel.send('Título não encontrado!');
	}
}