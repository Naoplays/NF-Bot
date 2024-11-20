let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
        if (chat.sRules) {
            let reglas = chat.sRules;
            m.reply(reglas);
        } else {
            m.reply('No hay reglas configuradas para este grupo');
        }
}
handler.command = ['reglas', 'rules']
handler.group = true
export default handler
