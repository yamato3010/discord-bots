const http = require('http');
const querystring = require('querystring');
const {discord,RichEmbed} = require('discord.js');
const { Menu } = require('discord.js-menu');
//const Discord = require('discord.js');
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
        ['utils', 'ユーティリティ'],
        ['fun', '遊び'],
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

client.login( process.env.DISCORD_BOT_TOKEN );

client.on('ready', message =>{
  console.log('Bot準備完了～');
  //client.user.setPresence({ game: { name: '!m | 精一杯ご奉仕いたしますね♪' } });
});


// List of available statuses
let statuses = [
    {game: {name: `コマンドがわからなくなったら!m helpですっ`}, type: "WATCHING"},
    {game: {name: `精一杯ご奉仕いたしますね♪`}, type: "PLAYING"},
    //{game: {name: `お仕えさせていただきます！`}, type: "PLAYING"}
];
// Our pointer
let i = 0;
// Every 15 seconds, update the status
setInterval(() => {
     // Get the status
     let status = statuses[i];
     // If it's undefined, it means we reached the end of the array
     if(!status){
         // Restart at the first status
         status = statuses[0];
         i = 0;
     }
     client.user.setPresence(status);
     i++;
}, 10000);


client.on("guildMemberAdd", (member) => {

    let channel = client.channels.get('787269819158102036');
    console.log("someone joined this server"); 
    channel.send(`おかえりなさいませ ${member.user}様！ ようこそPON WORLDへ！！\n <#786613511643332639>を御一読ください！ \n そのあと<#786897885286629387>でロール設定をお願いしますっ`); 
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
    let text = "にゃ～ん♪";
    sendMsg(message.channel.id, text);
    return;
  }
  
  if (message.content==="は？"){
    const gomen = ()=>{
      const text = "なんか...ごめんなさい...";
      sendMsg(message.channel.id, text);
    };
    const text = "は？";

    sendMsg(message.channel.id, text);
    setTimeout(gomen,5000);
    return;

  }
  
  if (message.content.match(/!m omikuji|!momikuji|!m omikuzi|!momikuzi/)){
    let arr = ["おめでとうございます！大吉です！！いいことありそうです♪", "吉ですっ。悪くないと思います♪", "き、凶です...大丈夫です。ランダムで出しているだけなので...", "（おみくじはない！！）", "あれ？出てきませんね...", "(からっぽ！！)"];
    lottery(message.channel.id, arr);
    return;
  }
  
  if (message.content.startsWith("!m say")) {
      message.delete(0);
      message.channel.send(message.content.slice(6, message.content.length));
      //六文字以降を消してる？？
      
   }
  
  if (message.content==="/dissoku up!"){
    if (!message.member.hasPermission("ADMINISTRATOR")){
    //let text = "dissoku upありがとうございます！！"
    //sendReply(message, `bumpをありがとうございます！！ \nまた宜しければよろしくお願いします♪`);
    let arr = ["dissoku upをありがとうございます！！ \nまた宜しければよろしくお願いします♪","dissoku upしてくださりありがとうございます！とっても嬉しいですっ","ありがとうございます！一緒にこのサーバーを有名にしていきましょうね♪"];
    lotteryReply(message, arr);
      return;
    }
    else{
      let arr = "お疲れ様です♪"
      sendReply(message,arr);
      return;
    };
    return;
    
  }
  
  
  if (message.content.match("死ね")){
    message.channel.send("死ねはよくないです...")
    if (message.content.match("ごめん"|"ごめんなさい"|"すみません"|"すみませんでした")){
      console.log('謝罪を検知')
      message.edit("許します♪")
      return;
    }else{
      return;
    }
  }


  
  
if (message.content==="!d bump"){
  if (!message.member.hasPermission("ADMINISTRATOR")){
    //let text = "dissoku upありがとうございます！！"
    //sendReply(message, `bumpをありがとうございます！！ \nまた宜しければよろしくお願いします♪`);
    let arr = ["bumpをありがとうございます！！ \nまた宜しければよろしくお願いします♪","bumpしてくださりありがとうございます！とっても嬉しいですっ","ありがとうございます！一緒にこのサーバーを有名にしていきましょうね♪"];
    lotteryReply(message, arr);
    return;
  }
  else{
    let arr = "お疲れ様です♪"
      sendReply(message,arr);
    return;
  };
  }

  if (message.content === "!help") {
    // Provide a menu with a channel, an author ID to let control the menu, and an array of menu pages.
    let helpMenu = new Menu(message.channel, message.author.id, [
        // Each object in this array is a unique page.
        {
            // A page object consists of a name, used as a destination by reactions...
            name: 'main',
            // A MessageEmbed to actually send in chat, and...
            content: new RichEmbed({
                title: 'Help Menu',
                description: 'This is some helpful info!'
            }),
            // A set of reactions with destination names attached.
            // Note there's also special destination names (read below)
            reactions: {
                '⏹': 'delete',
                '▶': 'extra'
            }
        },
        {
            name: 'extra',
            content: new RichEmbed({
                title: 'Extra menu',
                description: 'This is another page. You can have as many of these as you want.'
            }),
            reactions: {
                '◀': 'first'
            }
        }
        // The last parameter is the number of milliseconds you want the menu to collect reactions for each page before it stops to save resources
        // The timer is reset when a user interacts with the menu.
        // This is optional, and defaults to 180000 (3 minutes).
    ], 300000)
    // Run Menu.start() when you're ready to send the menu in chat.
    // Once sent, the menu will automatically handle everything else.
    helpMenu.start()
}
  
});

const mainChannelId = "786526388836368404";

client.on('voiceStateUpdate', (oldGuildMember, newGuildMember) =>{
  console.log("通話を検出！");
  if( newGuildMember.voiceChannelID !== undefined){
    console.log("通話を検出1");
    if(client.channels.get(newGuildMember.voiceChannelID).members.size == 1){
      
        newGuildMember.voiceChannel.createInvite({"maxAge":"0"})
          .then(invite => sendMsg(
            mainChannelId, "<@" + newGuildMember.user.id +"> 様が通話を開始されました！\n 皆さんもぜひご参加ください！\n <@&787293332547043398> \n"+  invite.url
          ));
      
      
      
    }
  }
});




if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}



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

function lotteryReply(message, arr){
  let random = Math.floor( Math.random() * arr.length);
  sendReply(message, arr[random]);
}