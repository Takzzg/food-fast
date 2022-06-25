import axios from "axios"
import { Telegraf } from "telegraf"

console.log("wlecome bot-telegram")
// @foodfastapp_bot

const api = "http://localhost:3001/api/v1"
const client = "https://food-fast-client-8h45out5u-takzzg.vercel.app"

const fetchProducts = async () => {
    //el sort debe hacer match con los productos de mayor rating
    const response = await axios.get(
        `${api}/products?filterOrder=price&sortOrder=-1`
    )
    const products = response.data
        .map((e) => {
            return {
                id: e._id,
                nombre: e.name,
                precio: e.price,
                descripcion: e.description
            }
        })
        .slice(0, 3)
    return products
}

const bot = new Telegraf(process.env.TOKEN)

bot.command("start", (ctx) => {
    sendStartMessage(ctx)
})

function sendStartMessage(ctx) {
    const startMessage = `Bienvenid@ ${ctx.from.first_name} a FoodBot`
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Platos populares", callback_data: "productos" }],
                [{ text: "Ofertas", callback_data: "ofertas" }],
                [
                    {
                        text: "Nuestra website",
                        url: "https://food-fast-client-8h45out5u-takzzg.vercel.app/"
                    }
                ]
            ]
        }
    })
}

bot.action("productos", async (ctx) => {
    ctx.answerCbQuery()
    const fetch = await fetchProducts()

    const menuMessage = `¿Que quieres comer ${ctx.from.first_name}?`
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            inline_keyboard: [
                [{ text: fetch[0].nombre, callback_data: "0" }],
                [{ text: fetch[1].nombre, callback_data: "1" }],
                [{ text: fetch[2].nombre, callback_data: "2" }]
            ]
        }
    })
})

bot.action("0", async (ctx) => {
    ctx.deleteMessage()
    const fetch = await fetchProducts()
    const url = `${client}/products/${fetch[0].id}`
    const message = `por favor  ${ctx.from.first_name} elegi una opcion`
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "+info", url: url }],
                [
                    {
                        text: "Pagar",
                        url: "https://food-fast-client-8h45out5u-takzzg.vercel.app/"
                    }
                ],
                [{ text: "Salir", callback_data: "Salir" }]
            ]
        }
    })

    ctx.reply(`${fetch[0].nombre}
precio: ${fetch[0].precio}
descripcion: ${fetch[0].descripcion}`)
})

bot.action("1", async (ctx) => {
    ctx.deleteMessage()
    const fetch = await fetchProducts()
    const url = `${client}/products/${fetch[1].id}`
    const message = `por favor  ${ctx.from.first_name} elegi una opcion`
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "+info", url: url }],
                [
                    {
                        text: "Pagar",
                        url: "https://food-fast-client-8h45out5u-takzzg.vercel.app/"
                    }
                ],
                [{ text: "Salir", callback_data: "Salir" }]
            ]
        }
    })

    ctx.reply(`${fetch[1].nombre}
    precio: ${fetch[1].precio}
    descripcion: ${fetch[1].descripcion}`)
})

bot.action("1", async (ctx) => {
    ctx.deleteMessage()
    const fetch = await fetchProducts()
    const url = `${client}/products/${fetch[1].id}`
    const message = `por favor  ${ctx.from.first_name} elegi una opcion`
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "+info", url: url }],
                [
                    {
                        text: "Pagar",
                        url: "https://food-fast-client-8h45out5u-takzzg.vercel.app/"
                    }
                ],
                [{ text: "Salir", callback_data: "Salir" }]
            ]
        }
    })

    ctx.reply(`${fetch[1].nombre}
precio: ${fetch[1].precio}
descripcion: ${fetch[1].descripcion}`)
})

bot.action("2", async (ctx) => {
    ctx.deleteMessage()
    const fetch = await fetchProducts()
    const url = `${client}/products/${fetch[2].id}`
    const message = `por favor  ${ctx.from.first_name} elegi una opcion`
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "+info", url: url }],
                [
                    {
                        text: "Pagar",
                        url: "https://food-fast-client-8h45out5u-takzzg.vercel.app/"
                    }
                ],
                [{ text: "Salir", callback_data: "Salir" }]
            ]
        }
    })

    ctx.reply(`${fetch[2].nombre}
precio: ${fetch[2].precio}
descripcion: ${fetch[2].descripcion}`)
})

bot.action("Salir", (ctx) => {
    ctx.deleteMessage()
    const message =
        "Gracias por tu visita :) , si queres comprar podes presionar /start"
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            remove_keyboard: true
        }
    })
})

bot.launch()
