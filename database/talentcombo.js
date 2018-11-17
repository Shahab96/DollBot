// Export the ban func
exports.talentcombo = async function(rawQuery, message) {
    await talentcombo(rawQuery, message);
}

// Function to check if is banned
var talentcombo = async function talentcombo(rawQuery, message) {
	var accents = require('remove-accents')
	var classe = accents.remove(rawQuery.toLowerCase());
	
	switch(classe){
		case 'berserker':
		case 'tita':
		case 'cavaleiro da morte':
		case 'destruidor':
			message.channel.send('https://pt.grandfantasia.info/talents/3');
			break;
			
		case 'paladino':
		case 'templario':
		case 'cavaleiro real':
		case 'cavaleiro sagrado':
			message.channel.send('https://pt.grandfantasia.info/talents/4');
			break;
			
		case 'ranger':
		case 'franco atirador':
		case 'mercenario':
		case 'predador':
			message.channel.send('https://pt.grandfantasia.info/talents/7');
			break;
			
		case 'assassino':
		case 'sicario sombrio':
		case 'ninja':
		case 'shinobi':
			message.channel.send('https://pt.grandfantasia.info/talents/8');
			break;
		
		case 'clerigo':
		case 'profeta':
		case 'mensageiro divino':
		case 'arcanjo':
			message.channel.send('https://pt.grandfantasia.info/talents/11');
			break;
		
		case 'sabio':
		case 'mistico':
		case 'xama':
		case 'druida':
			message.channel.send('https://pt.grandfantasia.info/talents/12');
			break;
		
		case 'feiticeiro':
		case 'arquimago':
		case 'arcano':
		case 'bruxo':
			message.channel.send('https://pt.grandfantasia.info/talents/15');
			break;
			
		case 'necromante':
		case 'demonologo':
		case 'emissario dos mortos':
		case 'shinigami':
			message.channel.send('https://pt.grandfantasia.info/talents/16');
			break;
		
		case 'agressor':
		case 'prime':
		case 'megatron':
		case 'omega':
			message.channel.send('https://pt.grandfantasia.info/talents/27');
			break;
			
		case 'demolidor':
		case 'optimus':
		case 'galvatron':
		case 'tita celeste':
			message.channel.send('https://pt.grandfantasia.info/talents/27');
			break;
			
		case 'escapachim':
		case 'samurai':
		case 'ronin':
		case 'mestre dimensional':
			message.channel.send('https://pt.grandfantasia.info/talents/54');
			break;
		
		case 'ilusionista':
		case 'augure':
		case 'oraculo':
		case 'cronos':
			message.channel.send('https://pt.grandfantasia.info/talents/55');
			break;
	
		default:
			message.channel.send('Classe desconhecida, por acaso você sabe escrever direito, ou tem dedo torto?');
			break;
	}
	
  return;
}