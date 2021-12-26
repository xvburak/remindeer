/* eslint-disable no-mixed-spaces-and-tabs */
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
require('dotenv').config();
// const { token } = require('./config.json');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
});

// function myCallback(a) {
// 	console.log(a);
// }

client.once('ready', () => {
	console.log('Ready!');
});

client.on ('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}

	// check if channel is public and reaction is 👁‍🗨, sends DM with message link and details
	if (reaction.message.channel.type === 'GUILD_TEXT' && reaction.emoji.name === '👁‍🗨') {
		const time = new Date(`'${reaction.message.createdAt}'`);
		// const exampleEmbed = {
		// 	'type': 'rich',
		// 	'title': `${reaction.message.author.username}’s message`,
		// 	'description':`${reaction.message.content}\n`,
		// 	'color': 0xffe100,
		// 	'fields': [
		// 	  {
		// 			'name': 'server',
		// 			'value': `${reaction.message.guild.name}`,
		// 			'inline': true,
		// 	  },
		// 	  {
		// 			'name': 'channel',
		// 			'value': `#${reaction.message.channel.name}`,
		// 			'inline': true,
		// 	  },
		// 	],
		// 	'footer': {
		// 		'text': `Message created: ${time.toDateString()}`,
		// 	},
		// 	'url': reaction.message.url,
		//   };
		user.send(`👁‍🗨 **${reaction.message.author.username}’s message**

*${reaction.message.guild.name} | #${reaction.message.channel.name} | ${time.toDateString()}*

${reaction.message.content}
		 
🔗 ${reaction.message.url}`);

	// checks if channel is dm and reaction is 💚, deletes resolved messages marked wit selected emoji
	} else if (reaction.message.channel.type === 'DM') {
		if (reaction.emoji.name === '✅') {
			reaction.message.delete()
				.catch(console.error);
		}
		// React with 🇭 to resend in an HOUR
		else if (reaction.emoji.name === '🇭') {
			reaction.message.delete()
				.catch(console.error);
			setTimeout(() => {
				user.send(reaction.message.content);
			}, 3600000);
		}
		// React with 🇩 to resend in a DAY
		else if (reaction.emoji.name === '🇩') {
			reaction.message.delete()
				.catch(console.error);
			setTimeout(() => {
				user.send(reaction.message.content);
			}, 86400000);
		}
		// React with 🇼 to resend in a WEEK
		else if (reaction.emoji.name === '🇼') {
			reaction.message.delete()
				.catch(console.error);
			setTimeout(() => {
				user.send(reaction.message.content);
			}, 604800000);
		}
		// React with 🇲 to resend in a MONTH
		else if (reaction.emoji.name === '🇲') {
			reaction.message.delete()
				.catch(console.error);
			setTimeout(() => {
				user.send(reaction.message.content);
			}, 2629746000);
		}
		// React with 🇾 to resend in a YEAR
		else if (reaction.emoji.name === '🇾') {
			reaction.message.delete()
				.catch(console.error);
			setTimeout(() => {
				user.send(reaction.message.content);
			}, 31556952000);
		}
	}

});

// Login to Discord with your client's token
client.login(process.env.token);

