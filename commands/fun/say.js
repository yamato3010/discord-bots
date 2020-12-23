const { Command } = require('discord.js-commando');
const discord = require('discord.js');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			aliases: [''],
			group: 'fun',
			memberName: 'say',
			description: '私に何か言ってほしいのですか？いいですよっ',
      
		});
	}
  
//コマンドの内容
  run() {

	}

  
  
  
};
