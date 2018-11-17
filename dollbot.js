// Required discord packages
const Discord = require('discord.js');

const fs = require('fs');

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./auth.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

// Info json
const datas = require("./infos.json");

var lang = null;

switch (datas.lang) {
    default:
    case 'pt-br':
        lang = require("./lang/ptbr.json");
        break;
    case 'en-us':
        lang = require("./lang/enus.json");
        break;
}

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.

    // Lets grab some sizes
    var size = Math.max(datas.name.length, datas.version.length) + 2;

    var data = new Array(Math.ceil(size / 2) + 1).join(" ") + datas.name + new Array(Math.floor(size / 2) + 1).join(" ");

    data = new Array(Math.ceil(size / 2) + 1).join(" ") + datas.name + new Array(Math.floor(size / 2) + 1).join(" ");

    var toPrint = `\n\n\t      ╔══════════╦` + new Array(size + 3).join('═') + '╗\n';

    var dataSize = datas.name.length
    data = new Array(Math.ceil((size - dataSize) / 2) + 2).join(" ") + datas.name + new Array(Math.floor((size - dataSize) / 2) + 2).join(" ");
    toPrint = toPrint + `\t      ║ BOTNAME: ║${data}║\n`

    dataSize = datas.version.length
    data = new Array(Math.ceil((size - dataSize) / 2) + 2).join(" ") + datas.version + new Array(Math.floor((size - dataSize) / 2) + 2).join(" ");
    toPrint = toPrint + `\t      ║ VERSION: ║${data}║`;

    toPrint = toPrint + `\n\t      ╚══════════╩` + new Array(size + 3).join('═') + '╝';

    var clientlen = client.users.size;
    var chanlen = client.channels.size;
    var guildlen = client.guilds.size;

    /*size = Math.max(clientlen, chanlen, guildlen, 7) + 19

    toPrint = toPrint + `\n\t ╔` + new Array(size).join('═') + `╗`;
    var endPrint = `\n\t ╚` + new Array(size).join('═') + `╝`;
    toPrint = toPrint + `\n\t ║` + new Array(Math.ceil((size - 23) / 2)).join(' ') + "My use statistics are..." + new Array(Math.floor((size - 23) / 2)).join(' ') + '║';

    size = size - 16;

    toPrint = toPrint + `\n\t ╠═══════════════╦` + new Array(size).join('═') + `╣`;
    var endPrint = `\n\t ╚═══════════════╩` + new Array(size).join('═') + `╝`;
    size = Math.max(clientlen, chanlen, guildlen) + 2;

    toPrint = toPrint + `\n\t ║ Nº USERS:     ║` + new Array(Math.ceil(size / 2)).join(' ') + clientlen + new Array(Math.floor(size / 2)).join(' ') + '║';
    toPrint = toPrint + `\n\t ║ Nº CHANNELS:  ║` + new Array(Math.ceil(size / 2)).join(' ') + chanlen + new Array(Math.floor(size / 2)).join(' ') + '║';
    toPrint = toPrint + `\n\t ║ Nº GUILDS:    ║` + new Array(Math.ceil(size / 2) + 1).join(' ') + guildlen + new Array(Math.floor(size / 2)).join(' ') + '║';
    toPrint = toPrint + endPrint;


    console.log(`${toPrint}`);*/

    console.log(`\t   ╔═══════════════════════════════╗`)
    console.log(`\t   ║ ♥♥♥ DollRanger is so COOL ♥♥♥ ║`)
    console.log(`\t   ╚═══════════════════════════════╝\n\n`)

    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    //client.user.setActivity(`Serving ${client.guilds.size} servers`);
    client.user.setActivity(lang.iluminati);
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
	
	// This command must be limited to mods and admins. In this example we just hardcode the role names.
	
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if (message.content.indexOf(config.prefix) !== 0) return;
	
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    switch (cmd) {
        case 'ajuda':
        case 'help':
            var helpMsg = '```\n';
            /*
			helpMsg = helpMsg + config.prefix + 'ping - Calculates ping between sending a message and editing it, giving a nice round-trip latency.\n';
            helpMsg = helpMsg + config.prefix + 'say <phrase to be said> - Makes the bot say something and delete the message.\n';
            helpMsg = helpMsg + config.prefix + 'kick \@victm <reason (optional)> - Kicks a victm, then you may provide a reason why. (Only those whose have admin permissions are able to do it!)\n';
            helpMsg = helpMsg + config.prefix + 'ban \@victm <reason (optional)> - Bans a victm, then you may provide a reason why. (Only those whose have admin permissions are able to do it!)\n';
            helpMsg = helpMsg + config.prefix + 'invitelink - link to invite ' + datas.name + ' to servers.\n';
            helpMsg = helpMsg + config.prefix + 'purge <1 to 100> - Deletes 1 to 100 messages in channel. (the command is included, no need to sum up!)\n';
            helpMsg = helpMsg + config.prefix + 'whosdabest - Who is the best?\n';
            helpMsg = helpMsg + config.prefix + 'whosdebest - Who is the best?\n';
            helpMsg = helpMsg + config.prefix + 'whosthebest - Who is the best?\n';
            helpMsg = helpMsg + config.prefix + 'alpacu - ( ͡° ͜ʖ ͡°)\n';
            helpMsg = helpMsg + config.prefix + 'search <query> - Searches in GF database pt the query, then return the first 5 hits. (needs improvements!!!)\n';
            helpMsg = helpMsg + config.prefix + 'isban <query> - Check whether a player is banned or not.\n';
            helpMsg = helpMsg + config.prefix + 'count - Its beta, do not use it.';
			*/
			helpMsg = helpMsg + '۞ ' + config.prefix + 'buscaitem <palavra chave / ID> - Busca a palavra chave no GF database e retorna os 5 primeiros resultados da busca ou retorna o link do ID solicitado.\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'buscatitulo <nome do título / ID> - Busca o título por nome ou id (coloque o nome do título exatamente igual).\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'buscamonstro <nome do monstro / ID> - Busca o monstro por nome ou id (coloque o nome do monstro exatamente igual, sem o que está no <>).\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'buscaquest <nome da quest / ID> - Busca a quest por nome ou id (coloque o nome da quest exatamente igual, inclusivel o level como está escrito no jogo.).\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'fale <frase a ser dita> - Faz o bot falar a frase passada no chat onde o comando foi digitado.\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'faleem <frase a ser dita> - Faz o bot falar a frase passada no chat bar_do_babama.\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'ping - Calcula o ping entre o envio e edição de uma mensagem, dá uma boa noção da latência.\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'kick \@vítima <razão (optional)> - Da um kick bem dado em uma pessoa, você pode dizer o motivo do kick. (Apenas administradores)\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'ban \@vítima <razão (optional)> - Da um ban bem dado em uma pessoa, você pode dizer o motivo do ban. (Apenas administradores)\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'purgar <1 a 100> - Deleta entre 1 e 100 mensagens acima, o comando não conta. (Apenas administradores)\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'whosdabest - Quem é o melhor?\n';
            helpMsg = helpMsg + '۞ ' + config.prefix + 'alpacu - ( ͡° ͜ʖ ͡°)\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'tabanido <nome da conta> - Checa se um jogador está banido no GF-PT. (Apenas admin)\n';
			helpMsg = helpMsg + '۞ ' + config.prefix + 'talentcombo <classe> - Retorna o combo de talentos da classe pedida.\n';
            helpMsg = helpMsg + '```';
            message.channel.send(helpMsg);
            break;

        case 'convitebot':
        case 'invitelink':
			
			// This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
			
            // Aw god... this is self explanatory, if you don't understand it, don't mess my code!!!!!
            message.channel.send(datas.inviteLink);
            break;

        case 'ping':
            // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
            // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
            const m = await message.channel.send("Ping?");
            m.edit(lang.pong + (m.createdTimestamp - message.createdTimestamp) + lang.api + Math.round(client.ping) + `ms`);
            break;

        case 'fale':
        case 'say':
			// This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
			
            // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
            // To get the "message" itself we join the `args` back into a string with spaces: 
            const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => { });
            // And we get the bot to say the thing: 
            message.channel.send(sayMessage);
            break;
		
		case 'faleem':
		case 'sayto':
			// This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
			
            // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
            // To get the "message" itself we join the `args` back into a string with spaces: 
            const sayMessage2 = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => { });
			
			const channel = client.channels.find(x => x.name === 'bar_do_babama');
			channel.send(sayMessage2);
            break;

        case 'alpacu':
			// This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            //if (!message.member.permissions.has("ADMINISTRATOR")) {
            //    return message.reply(lang.noperm);
            //}
			
            // Self explanatory
            message.channel.send("( ͡° ͜ʖ ͡°)", {
                files: [
                    "./images/alpacu.png"
                ]
            });
            break;

        case 'contar':
        case 'count':
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }

            // Adding a scope here to prevent naming conflicts with %add
            {
                const submissions = require('./submissions.json');
                const embed = new Discord.RichEmbed()
                    .setTitle('Counts');
                submissions.forEach((submission) => {
                    embed.addField(submission.Name, submission.Count);
                });
                message.channel.send({ embed });
            }

            // return message.reply(lang.grr);

            //const collector = new Discord.MessageCollector(channel);
            //console.log(collector);
            break;

        case "ban":
        case "kick":
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
			
			// Those nasty users should not prompt empty searches
            if (args.length === 0) {
                message.channel.send(lang.nofool);
                break;
            }

			let commandDoBan = require(`./database/ban.js`);

			// Search the query
            commandDoBan.ban(args, message);

            break;

        case 'expurgar':
        case 'purge':
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
            // This command removes all messages from all users in the channel, up to 100.

            // get the delete count, as an actual number.
            const deleteCount = parseInt(args[0], 10);

            // Ooooh nice, combined conditions. <3
            if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
                return message.reply(lang.givnum);
            }

            // So we get our messages, and delete them. Simple enough, right?
            const fetched = await message.channel.fetchMessages({ limit: (deleteCount + 1) });
            message.channel.bulkDelete(fetched).catch(error => message.reply(lang.nodel + error));
            break;
        case 'tabanido':
        case 'isban':
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
            
            // Those nasty users should not prompt empty searches
            if (args.length === 0) {
                message.channel.send(lang.nofool);
                break;
            }
			
			let commandSearchBan = require(`./database/isban.js`);

            // Search the query
            commandSearchBan.isban(args.join(' '), message);
            break;

        case 'whosthebest':
        case 'whosdabest':
        case 'whosdebest':
            // Who is the best?
            message.channel.send('DollRanger / [GS]Doll,' + lang.fershure);
            break;
			
		case 'thanks':
		case 'obg':
			message.channel.send('[GS]Doll, Adamont, [GS]Ready' + lang.fershure);
            break;

        case 'add':
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
			
			// Validate input against JSON array and emit a result or an error
            const validItems = require('./validItems.json');
            if (args.length < 1) {
                message.channel.send('You didn\'t supply an item');
                return;
            }
            const item = args.join(' ').toLowerCase();
            if (!validItems.join('+|+').toLowerCase().split('+|+').includes(item)) {
                message.channel.send('Invalid item');
                break;
            }

            // Adding a scope here to prevent naming conflicts with %count
            {
                const submissions = require('./submissions.json');
                const submittedItem = submissions.find(sub => sub.Name === item);
                if (!submittedItem) {
                    submissions.push({
                        Name: item,
                        Count: 1,
                    });
                } else {
                    submittedItem.Count++;
                }
                fs.writeFile('./submissions.json', JSON.stringify(submissions), (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    message.channel.send(`Logged ${item}`)
                });
            }
            break;

        case 'wipe':
			// This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
			
            fs.writeFile('./submissions.json', '[]', (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                message.channel.send('Wiped submissions');
            });
            break;
		
		case 'sortition':
		case 'sorteia':
			// This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply(lang.noperm);
            }
			
			let commandSortition = require(`./database/sortition.js`);
			
			let len = 50;
			
			// Check if its an ID (only numbers)
			if(Number(args))
			{
				len = args <= 100 ? args : 100;
			}
			
			// Search the query
			commandSortition.sortition(len, message);
			break;
		
		case 'buscaitem':
        case 'searchitem':
			// Those nasty users should not prompt empty searches
            if (args.length === 0) {
                message.channel.send(lang.nofool);
                break;
            }
			
			// Check if its an ID (only numbers)
			if(Number(args))
			{
				// Send the link
				message.channel.send('https://pt.grandfantasia.info/items/' + args);
			}else{
				// Searches in GF database for input query
				let commandSearchReq = require(`./database/search.js`);

				// Search the query
				commandSearchReq.searchGFDB(args.join(' '), message);
			}
            break;
		
		case 'buscatitulo':
		case 'searchtitle':
			// Those nasty users should not prompt empty searches
            if (args.length === 0) {
                message.channel.send(lang.nofool);
                break;
            }
			
			let commandsearchitem = require(`./database/searchtitle.js`);
			
			// Check if its an ID (only numbers)
			if(Number(args))
			{
				// Search the title from ID
				commandsearchitem.searchitemid(args, message);
			}else{
				// Search the title from NAME
				commandsearchitem.searchitem(args.join(' '), message);
			}
			break;

		case 'buscamonstro':
		case 'searchmonster':
			// Those nasty users should not prompt empty searches
            if (args.length === 0) {
                message.channel.send(lang.nofool);
                break;
            }
			
			let commandsearchmonster = require(`./database/searchmonster.js`);
			
			// Check if its an ID (only numbers)
			if(Number(args))
			{
				// Search the title from ID
				commandsearchmonster.searchmonsterID(args, message);
			}else{
				// Search the title from NAME
				commandsearchmonster.searchmonster(args.join(' '), message);
			}
			break;
		
		case 'buscaquest':
		case 'searchquest':
			// Those nasty users should not prompt empty searches
            if (args.length === 0) {
                message.channel.send(lang.nofool);
                break;
            }
			
			let commandsearchquest = require(`./database/searchquest.js`);
			
			// Check if its an ID (only numbers)
			if(Number(args))
			{
				// Search the title from ID
				commandsearchquest.searchquestID(args, message);
			}else{
				// Search the title from NAME
				commandsearchquest.searchquest(args.join(' '), message);
			}
			break;
		
		case 'talentcombo':
		case 'combodetalento':
			// Those nasty users should not prompt empty searches
            if (args.length === 0) {
                message.channel.send(lang.nofool);
                break;
            }
			let commandtalentcombo = require(`./database/talentcombo.js`);
			
			commandtalentcombo.talentcombo(args.join(' '), message);
			
			break;
		
		case 'teste':
			let commandalchemy = require(`./database/alchemy.js`);
			
			commandalchemy.buildalch(message);
			break;
    }
});

client.login(config.token);
