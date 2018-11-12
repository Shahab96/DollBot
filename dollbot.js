// Required discord packages
const Discord = require('discord.js');

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./auth.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

// Info json
const datas = require("./infos.json");

var lang = null;

switch(datas.lang) {
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

    size = Math.max(clientlen, chanlen, guildlen, 7) + 19

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


    console.log(`${toPrint}`);

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
            var helpMsg = '```';
            helpMsg = helpMsg + config.prefix + 'ping - Calculates ping between sending a message and editing it, giving a nice round-trip latency.\n';
            helpMsg = helpMsg + config.prefix + 'say <phrase to be said> - Makes the bot say something and delete the message.\n';
            helpMsg = helpMsg + config.prefix + 'kick \@victm <reason (optional)> - Kicks a victm, then you may provide a reason why. (Only those whose have admin permissions are able to do it!)\n';
            helpMsg = helpMsg + config.prefix + 'ban \@victm <reason (optional)> - Bans a victm, then you may provide a reason why. (Only those whose have admin permissions are able to do it!)\n';
            helpMsg = helpMsg + config.prefix + 'invitelink - link to invite ' + datas.name + ' to servers.\n';
            helpMsg = helpMsg + config.prefix + 'purge <2 to 100> - Deletes 2 to 100 messages in channel. (the command is included, no need to sum up!)\n';
            helpMsg = helpMsg + config.prefix + 'whosdabest - Who is the best?\n';
            helpMsg = helpMsg + config.prefix + 'whosdebest - Who is the best?\n';
            helpMsg = helpMsg + config.prefix + 'whosthebest - Who is the best?\n';
            helpMsg = helpMsg + config.prefix + 'alpacu - ( ͡° ͜ʖ ͡°)\n';
            helpMsg = helpMsg + config.prefix + 'search <query> - Searches in GF database pt the query, then return the first 5 hits. (needs improvements!!!)\n';
            helpMsg = helpMsg + config.prefix + 'isban <query> - Check whether a player is banned or not.\n';
			helpMsg = helpMsg + config.prefix + 'count - Its beta, do not use it.';
            helpMsg = helpMsg + '```';
            message.channel.send(helpMsg);
            break;

		case 'convitebot':
        case 'invitelink':
            // Aw god... this is self explanatory, if you don't understand it, don't mess my code!!!!!
            message.channel.send(datas.inviteLink);
            break;
		
        case 'ping':
            // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
            // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
            const m = await message.channel.send("Ping?");
			m.edit(lang.pong + (m.createdTimestamp - message.createdTimestamp) + lang.api + Math.round(client.ping) + `ms`);
            break;
		
		case 'busca':
        case 'search':
            // Searches in GF database for input query
            let commandSearchReq = require(`./database/search.js`);

            // Those nasty users should not prompt empty searches
            if (args.length === 0) {
				message.channel.send(lang.nofool);
                break;
            }

            // Search the query
            commandSearchReq.searchGFDB(args.join(' '), message);
            break;

		case 'fale':
        case 'say':
            // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
            // To get the "message" itself we join the `args` back into a string with spaces: 
            const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => { });
            // And we get the bot to say the thing: 
            message.channel.send(sayMessage);
            break;

        case 'alpacu':
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
			
			return message.reply(lang.grr);
            
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

            // Let's first check if we have a member and if we can kick them!
            // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
            // We can also support getting the member by ID, which would be args[0]
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);

            // slice(1) removes the first part, which here should be the user mention or ID
            // join(' ') takes all the various parts to make it a single string.
            let reason = args.slice(1).join(' ');

            // Check if there is any reason, if not, provide the string "No reason provided"
            if (!reason) {
				reason = lang.noreason
            }

            // Check if member exists
            if (!member) {
                //return message.reply("Please mention a valid member of this server.");
				return message.reply(lang.givevalidmember);
            }

            // This diferentiates between kick and ban
            if (cmd === "kick") {
                // Check if the member is able to be kicked
                if (!member.kickable) {
					return message.reply(lang.cantkick);
                }

                // Now, time for a swift kick in the nuts!
				await member.kick(reason).catch(error => message.reply(lang.sorry + message.author + lang.nokickerr + error));
                message.reply(member.user.tag + lang.kickby + message.author.tag + lang.punfor + reason);

            } else {
                // Check if the member is able to be banned
                if (!member.bannable) {
					return message.reply(lang.cantbean);
                }
                // BANHAMMER
				await member.kick(reason).catch(error => message.reply(lang.sorry + message.author + lang.nobeanerr + error));
                message.reply(member.user.tag + lang.beanby + message.author.tag + lang.punfor + reason);
            }

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
            if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
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
			let commandSearchBan = require(`./database/isban.js`);
			
            // Those nasty users should not prompt empty searches
            if (args.length === 0) {
				message.channel.send(lang.nofool);
                break;
            }

            // Search the query
            commandSearchBan.isban(args.join(' '), message);
            break;

        case 'whosthebest':
        case 'whosdabest':
        case 'whosdebest':
            // Who is the best?
			message.channel.send('DollRanger / [GS]Doll,' + lang.fershure);
            break;
    }
});

client.login(config.token);