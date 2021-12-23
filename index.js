/* eslint-disable no-mixed-spaces-and-tabs */
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
});

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
		const exampleEmbed = {
			title: `${reaction.message.author.username}’s message from #${reaction.message.channel.name}`,
			url: reaction.message.url,
			description: reaction.message.content,
			footer: {
				text: `Message created: ${reaction.message.createdAt}`,
			},
		};
		user.send({
			embeds: [exampleEmbed],
		});

	// checks if channel is dm and reaction is 💚, deletes resolved messages marked wit selected emoji
	} else if (reaction.message.channel.type === 'DM' && reaction.emoji.name === '💚') {
		reaction.message.delete()
			.catch(console.error);
	}
});

// Login to Discord with your client's token
client.login(token);