let axios = require('axios');
let cheerio = require('cheerio');
//Aqui va a ir lo de telegram
const TelegramBot = require('node-telegram-bot-api');
const token = '1308867037:AAHvIyuzQ3AsXesttgmxNgcC9zxjrEwH0fk';
const bot = new TelegramBot(
    token,
    {polling: true});

let urlWeb = "https://www.cdkeys.com/es_es/sale";
var array = [];
axios.get(urlWeb).then(response => {
     
    let $ = cheerio.load(response.data);
    let productList = $('.product-item-info');
   
    for(let i = 0; i < productList.length; i++) {
        var product = {};
        product.title = $($(productList[i]).find('.product-item-details a')).attr('title');
        product.price = $($(productList[i]).find('.price')[0]).text(); 
        array.push(product);  
    };
    return array;
})

function formatOffer(array){
   
    for(let e = 0; e < 20; e++){
        var cadena = "El juego " + array[e].title + " cuesta " + array[e].price + " en oferta." + "\n";
        var string="";
        string = cadena.toString();
        var final = final + string; 
    }    
    return final;
}

///////////////////////////////////

function cheapGames(array){

    for(let e = 0; e < 20; e++){
        let precio = array[e].price.substring(0, array[e].price.length - 1);
        let parsePrice = parseFloat(precio);
        if(parsePrice < 10){
            var cadena = "El juego " + array[e].title + " cuesta " + array[e].price + " en oferta." + "\n";
            var string="";
            string = cadena.toString();
            var final = final + string; 
        }
        
    }   
     return final;
    
}

///////////////////////////////////////////////////////

//Evento que responde cuando le dices hi
bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id,"Hello dear user");
}});;
//Evento cuando usas el comando /ofertas
 bot.onText(/\/ofertas/, (msg) => {
    bot.sendMessage(msg.chat.id, "TOMA LAS OFERTAS" ); 
    bot.sendMessage(msg.chat.id, formatOffer(array));
            
})
bot.onText(/\/baratitos/, (msg) => {
    bot.sendMessage(msg.chat.id, "Juegos por menos de 10 euros" ); 
    bot.sendMessage(msg.chat.id, cheapGames(array));
            
})



