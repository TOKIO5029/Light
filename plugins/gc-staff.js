let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return m.reply(`[🌸]𝗜𝗻𝗴𝗿𝗲𝘀𝗮 𝗲𝗹 𝘁𝗲𝘅𝘁𝗼 𝗽𝗮𝗿𝗮 𝗹𝗹𝗮𝗺𝗮𝗿 𝗮𝗹 𝘀𝘁𝗮𝗳𝗳 𝗱𝗲𝗹 𝗴𝗿𝘂𝗽𝗼`)
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => ` ».${i + 1} ».@${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `${pesan}_`

let textoA = 
`⊱ ────《.sᴛᴀғғ ɢʟᴏʙᴀʟ.》
 ↪ ${oi}
⊱ ────《.⋅𝙡𝙞𝙜𝙝𝙩 𝙔𝙖𝙜𝙖𝙢𝙞 𝙗𝙤𝙩⋅.》   `

let textoB = 
` ${listAdmin} 

by 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲`.trim()
await conn.sendFile(m.chat, pp, 'error.jpg', textoA + textoB, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
//await conn.sendButton(m.chat, textoA, textoB, pp, [[smsConMenu(), `.menu`]], m, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.command = /^(staff|Staffs|STAFF)$/i
handler.group = true
handler.admin = true
export default handler
