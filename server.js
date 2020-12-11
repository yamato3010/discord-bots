const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
//const client = new discord.Client();
//const noticeChannelId = [786526388836368404];
const Commando = require('discord.js-commando');

const cmd = require('discord.js-commando');
const path = require('path');
const config = require( path.resolve( __dirname, "config.json" ) );
const client = new cmd.CommandoClient({
    commandPrefix: config.prefix,
    unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utils', 'Utility'],
        ['fun', 'Fun'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(config.activity);
});

http.createServer(function(req, res){
  if (req.method == 'POST'){
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(!data){
        res.end("No post data");
        return;
      }
      var dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if(dataObject.type == "wake"){
        console.log("Woke up in post");
        res.end();
        return;
      }
      res.end();
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Discord Bot is active now\n');
  }
}).listen(3000);

client.on('ready', message =>{
  console.log('Bot準備完了～');
  client.user.setPresence({ game: { name: '!m | 精一杯ご奉仕いたしますね♪' } });
});




client.on('message', message =>{
  if (message.author.id == client.user.id || message.author.bot){
    return;
  }
  if(message.isMemberMentioned(client.user)){
    sendReply(message, "呼びましたか？");
    return;
  }
  if (message.content.match(/にゃ～ん|にゃーん/)){
    let text = "にゃ～ん";
    sendMsg(message.channel.id, text);
    return;
  }
  
  if (message.content==="は？"){
52
    let text = "ここではロールを設定することができます♪";
53
    sendMsg(message.channel.id, text);
54
    return;
55
  }
  
  if (message.content.match(/!m omikuji|!momikuji|!m omikuzi|!momikuzi/)){
    let arr = ["大吉", "吉", "凶", "ぽてと", "にゃ～ん", "しゅうまい君"];
    lottery(message.channel.id, arr);
    return;
  }
  
});







if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

function sendReply(message, text){
  message.reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option={}){
  client.channels.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}

function lottery(channelId, arr){
  let random = Math.floor( Math.random() * arr.length);
  sendMsg(channelId, arr[random]);
}