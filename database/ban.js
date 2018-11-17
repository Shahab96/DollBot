// Export the ban func
exports.ban = async function(rawQuery, message) {
    await ban(rawQuery, message);
}

// Function to check if is banned
var ban = async function ban(rawQuery, message) {
	
	// Let's first check if we have a member and if we can kick them!
	// message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
	// We can also support getting the member by ID, which would be rawQuery[0]
	let member = message.mentions.members.first() || message.guild.members.get(rawQuery[0]);

	// slice(1) removes the first part, which here should be the user mention or ID
	// join(' ') takes all the various parts to make it a single string.
	let reason = rawQuery.slice(1).join(' ');

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
	
  return;
}