import axios from "axios"
import "dotenv/config"
import { Telegraf } from "telegraf"

console.log("wlecome bot-telegram")
// @foodfastapp_bot

const api = "http://localhost:3001/api/v1"
const client = "https://food-fast-client.vercel.app"
const bot = new Telegraf(process.env.TOKEN)

const fetchProducts = async () => {
    //el sort debe hacer match con los productos de mayor rating
    const response = await axios.get(
        `${api}/products?filterOrder=rating&sortOrder=-1`
    )
    const products = response.data
        .map((e) => {
            return {
                id: e._id,
                nombre: e.name,
                precio: e.price,
                descripcion: e.description,
                img: e.image
            }
        })
        .slice(0, 3)
    return products
}

bot.command("start", (ctx) => {
    sendStartMessage(ctx)
})

function sendStartMessage(ctx) {
    const startMessage = `Bienvenid@ ${ctx.from.first_name} a FoodBot🤖`
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Platos populares", callback_data: "productos" }],
                [{ text: "🔎Buscar...", callback_data: "buscar" }],
                [
                    {
                        text: "Nuestra website",
                        url: client
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
    ctx.answerCbQuery()
    ctx.deleteMessage()
    const fetch = await fetchProducts()
    const url = `${client}/products/${fetch[0].id}`
    const message = `por favor ${ctx.from.first_name} elegi una opcion`

    await ctx.reply(`${fetch[0].nombre}‼️
descripcion: ${fetch[0].descripcion}
precio:💲 ${fetch[0].precio}
`)
    await bot.telegram.sendPhoto(ctx.chat.id, fetch[0].img.secure_url)
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "+info", url: url }],
                [
                    {
                        text: "Pagar",
                        url: client
                    }
                ],
                [{ text: "Salir", callback_data: "Salir" }]
            ]
        }
    })
})

bot.action("1", async (ctx) => {
    ctx.answerCbQuery()
    ctx.deleteMessage()
    const fetch = await fetchProducts()

    const url = `${client}/products/${fetch[1].id}`
    const message = `por favor ${ctx.from.first_name} elegi una opcion`

    await ctx.reply(`${fetch[1].nombre}‼️
descripcion: ${fetch[1].descripcion}
precio:💲 ${fetch[1].precio}
`)
    await bot.telegram.sendPhoto(ctx.chat.id, fetch[1].img.secure_url)
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "+info", url: url }],
                [
                    {
                        text: "Pagar",
                        url: client
                    }
                ],
                [{ text: "Salir", callback_data: "Salir" }]
            ]
        }
    })
})

bot.action("2", async (ctx) => {
    ctx.answerCbQuery()
    ctx.deleteMessage()
    const fetch = await fetchProducts()

    const url = `${client}/products/${fetch[2].id}`
    const message = `por favor ${ctx.from.first_name} elegi una opcion`

    await ctx.reply(`${fetch[2].nombre}‼️
descripcion: ${fetch[2].descripcion}
precio:💲 ${fetch[2].precio}
😊`)
    await bot.telegram.sendPhoto(ctx.chat.id, fetch[2].img.secure_url)
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "+info", url: url }],
                [
                    {
                        text: "Pagar",
                        url: client
                    }
                ],
                [{ text: "Salir", callback_data: "Salir" }]
            ]
        }
    })
})

bot.action("buscar", async (ctx) => {
    ctx.answerCbQuery()
    ctx.deleteMessage()
    ctx.reply(`${ctx.from.first_name} ingresa lo que queres buscar :)`)
    bot.on("text", async (ctx) => {
        const response = await axios.get(
            `${api}/products?name=${ctx.update.message.text}`
        )

        if (response.data.error)
            return ctx.reply("Ups!!! no encontramos tu producto 😭")
        const url = `${client}/products/${response.data[0]._id}`
        const message = `${response.data[0].name}‼
descripcion: ${response.data[0].description}
precio:💲 ${response.data[0].price}`

        ctx.deleteMessage()
        await bot.telegram.sendPhoto(
            ctx.chat.id,
            response.data[0].image.secure_url
        )
        bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "+info", url: url }],
                    [{ text: "Salir", callback_data: "Salir" }]
                ]
            }
        })
    })
})
bot.action("Salir", (ctx) => {
    ctx.deleteMessage()
    const message =
        "Gracias por tu visita 👋😊, si queres saber mas de nuestros productos podes presionar /start"
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            remove_keyboard: true
        }
    })
})

bot.launch()
