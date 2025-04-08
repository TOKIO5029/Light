let cooldowns = {}

let handler = async (m, { conn }) => {
  const cooldownTime = 5 * 60 * 1000 // 5 minutos
  const now = Date.now()
  const user = m.sender
  const name = conn.getName(user)

  if (cooldowns[user] && now - cooldowns[user] < cooldownTime) {
    const timeLeft = cooldownTime - (now - cooldowns[user])
    const tiempoRestante = formatTime(timeLeft)
    return conn.reply(m.chat, `⛏️ *${name}*, ya has minado recientemente.\n⏳ Espera *${tiempoRestante}* antes de volver a la mina.`, m, rcanal)
  }

  // Probabilidad de encontrar algo
  const suerte = Math.random()
  let resultado = ''
  let expGanado = 0
  let premios = []

  if (suerte < 0.1) {
    resultado = `¡Oh no! No encontraste nada útil en la mina.`
    await m.react('❌')
  } else {
    expGanado = Math.floor(Math.random() * 4000) + 1000 // entre 1000 y 5000
    global.db.data.users[user].exp += expGanado
    premios.push(`${expGanado} 💫 XP`)

    // Objetos extra (con probabilidad)
    if (Math.random() < 0.3) {
      const oro = Math.floor(Math.random() * 1000) + 100
      global.db.data.users[user].money += oro
      premios.push(`${oro} 🪙 Oro`)
    }

    if (Math.random() < 0.1) {
      const gemas = Math.floor(Math.random() * 5) + 1
      global.db.data.users[user].gems = (global.db.data.users[user].gems || 0) + gemas
      premios.push(`${gemas} 💎 Gema${gemas > 1 ? 's' : ''}`)
    }

    if (Math.random() < 0.05) {
      const objetos = ['Pico Legendario', 'Mapa del Tesoro', 'Mineral Raro', 'Cofre Misterioso']
      const objeto = objetos[Math.floor(Math.random() * objetos.length)]
      global.db.data.users[user].items = global.db.data.users[user].items || []
      global.db.data.users[user].items.push(objeto)
      premios.push(`🎁 Objeto raro: *${objeto}*`)
    }

    const minerales = ['Hierro', 'Cobre', 'Plata', 'Platino', 'Zafiro', 'Ópalo', 'Rubí']
    const mineral = minerales[Math.floor(Math.random() * minerales.length)]

    resultado = `⛏️ *Minería completada* — Encontraste *${mineral}*!\nPremios:\n• ${premios.join('\n• ')}`
    await m.react('⛏️')
  }

  await conn.reply(m.chat, resultado, m, rcanal)
  cooldowns[user] = now
}

handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'miming', 'mine']
handler.register = true
export default handler

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds}s`
}