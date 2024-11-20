let handler = async (m, { conn, text, isROwner, isOwner }) => {

if (text) {
global.db.data.chats[m.chat].sRules = text
conn.reply(m.chat, `Las reglas del grupo han sido configuradas`, m)  

} else throw `Escribe las reglas del grupo`
}

handler.tags = ['group']
handler.command = ['setrules'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
