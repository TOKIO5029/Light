const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {

  let fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  }

  const miniopcion = ` *OPCIONES PARA GRUPOS*

${usedPrefix + command} welcome
${usedPrefix + command} autoaceptar
${usedPrefix + command} autorechazar
${usedPrefix + command} autoresponder
${usedPrefix + command} detect
${usedPrefix + command} antidelete
${usedPrefix + command} antilink
${usedPrefix + command} antilink2
${usedPrefix + command} nsfw
${usedPrefix + command} autolevelup
${usedPrefix + command} autosticker
${usedPrefix + command} reaction
${usedPrefix + command} antitoxic
${usedPrefix + command} audios
${usedPrefix + command} modoadmin
${usedPrefix + command} antifake
${usedPrefix + command} antibot
${usedPrefix + command} antiarabe

👑︎ *OPCIONES PARA MI PROPIETARIO*

${usedPrefix + command} public
${usedPrefix + command} status
${usedPrefix + command} serbot
${usedPrefix + command} restrict
${usedPrefix + command} autoread
${usedPrefix + command} antillamar
${usedPrefix + command} antispam
${usedPrefix + command} pconly
${usedPrefix + command} gconly
${usedPrefix + command} antiprivado`

  const isEnable = /true|enable|(turn)?on|1/i.test(command)
  const chat = global.db.data.chats[m.chat]
  const user = global.db.data.users[m.sender]
  const bot = global.db.data.settings[conn.user.jid] || {}

  const type = (args[0] || '').toLowerCase()
  let isAll = false
  const isUser = false

  switch (type) {
    case 'welcome':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break

    case 'detect':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break

    case 'autolevelup':
      user.autolevelup = isEnable
      break

    case 'modoadmin':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.modoadmin = isEnable
      break

    case 'audios':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.audios = isEnable
      break

    case 'antidelete':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antidelete = isEnable
      break

    case 'autosticker':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autosticker = isEnable
      break

    case 'antitoxic':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antitoxic = isEnable
      break

    case 'antifake':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antifake = isEnable
      break

    case 'antibot':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antibot = isEnable
      break

    case 'antilink':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiLink = isEnable
      break

    case 'antilink2':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiLink2 = isEnable
      break

    case 'antiarabe': case 'arabes': case 'antiarabes': case 'rechazararabes':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiArabe = isEnable
      break

    case 'autoread':
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.autoread = isEnable
      break

    case 'gconly':
    case 'pconly':
    case 'antiprivado':
    case 'antillamar':
    case 'antispam':
    case 'public':
    case 'status':
    case 'serbot':
    case 'restrict':
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot[type] = isEnable
      break

    default:
      if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, { text: miniopcion, mentions: [m.sender] }, { quoted: fkontak })
      throw false
  }

  conn.reply(m.chat, `𖤍 *La función ${type} se ha ${isEnable ? 'activado' : 'desactivado'} correctamente.*`, m)
}

handler.help = ['enable', 'disable'].map(v => v + ' [opcion]')
handler.tags = ['owner', 'group']
handler.command = /^((en|dis)able|(turn)?[01]|on|off)$/i

export default handler