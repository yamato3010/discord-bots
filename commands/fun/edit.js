const { Command } = require('discord.js-commando');
const discord = require('discord.js');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'edit',
			aliases: ['!m edit'],
			group: 'fun',
			memberName: 'edit',
			description: '言い直します',
      args: [
                {
                    key: 'ID',
                    prompt: '編集したいメッセージIDをどうぞ。',
                    type: 'integer',
                    
                },
        
                {
                    key: 'editedMessage',
                    prompt: 'どのように編集しますか？',
                    type: 'string',
                    
                },
        
        ]
      
      
      
		});
	}
  
//コマンドの内容
  run( message, { ID },{editedMessage}) {
    const client = new discord.Client();
    const guild = client.guilds.get(785518604908363807);
    //client.channels.get(786221980650700800).fetchMessage(ID).edit(editedMessage)
    console.log(ID);
    console.log(editedMessage);
    //message.channel.fetch(ID).edit("おk");
    //ID.Message.edit("ok");
    message.channel.send(ID).then(sentMessage => {
    sentMessage.edit("テスト完了！")
})
	}

  
  
  
};
