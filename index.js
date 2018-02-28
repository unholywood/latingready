const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '436509006:AAGJp5U_hOvnpp2JuBwyXXyUux8lRngNs38'

const bot = new TelegramBot(TOKEN, {
    polling: true
})

const KB = {
    info: 'Информация',
    birk: 'Бумажная бирка',
    etik: 'Этикетка',
    back: 'Назад',
    zakaz: 'Заказ',
    contacts: 'Контакты'
}

bot.onText(/\/start/, msg => {

    const text = `${msg.from.first_name}, Вас приветсвует LabidNET\nВыберите услугу`

    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            keyboard: [
                [KB.info, KB.zakaz],
                [KB.contacts],
            ]
        }
    })

})

bot.on('message', msg => {

        switch (msg.text) {
            case KB.info:
                sendText(msg.chat.id)
                break
            case KB.zakaz:
                bot.sendMessage(msg.chat.id, `https://labid.net/#order`)
                break
            case KB.contacts:
                bot.sendMessage(msg.chat.id, `
Адрес:
г. Харьков ул. Конторская,  14
Телефон:
+38 (050) 624-22-50
Email:
info@labid.net
Время работы:
Пн. - Пт. - 9:00-19:00
Сб-Вс - Выходной`)
                break
            case KB.birk:
                bot.sendMessage(msg.chat.id, `Навесной картонный ярлык или бумажная бирка – это лицо любого изделия, по которому покупатель судит о том, где и кем, был произведен этот товар. Одежда, обувь и аксессуары без фирменной этикетки не вызывают доверия, что негативно сказывается на желании покупателя оформить покупку и репутации производителя в целом.`)
                break
            case KB.etik:
                bot.sendMessage(msg.chat.id, `Текстильная вшивная этикетка на жаккарде (дамаск, тафт), сатине, атласе, нейлоне или натуральных тканях – тканные и печатные этикетки для одежды вшиваются в изделие различными способами. Материалы из которых они создаются являются максимально комфортными при носке, при контакте с кожей не вызывают дискомфорта. На таких этикетках принято размещать название бренда, фирменный логотип и даже контактную информацию. Такая этикетка всегда находится на изделии и ненавязчиво напоминает о производителе, повышая узнаваемость торговой марки в целом.`)
                break
            case KB.back:
                bot.sendMessage(msg.chat.id, `что вы хотите сделать?`, {
                    reply_markup: {
                        keyboard: [
                            [KB.info, KB.zakaz],
                            [KB.contacts],
                        ]
                    }
                })
                break
    }

})


function sendText(chatId) {
    bot.sendMessage(chatId, `Виды брендированной фурнитуры`, {
        reply_markup: {
            keyboard: [
                [KB.birk, KB.etik],
                [KB.back]
            ]
        }
    })
}