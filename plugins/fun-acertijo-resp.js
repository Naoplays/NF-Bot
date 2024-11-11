import similarity from 'similarity';
const threshold = 0.72;
const handler = (m) => m;

handler.before = async function(m, { conn }) {
  const id = m.chat;

  // Verifica si el mensaje citado es una respuesta válida a un acertijo enviado por el bot
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return true;

  conn.tekateki = conn.tekateki || {};

  // Verifica si existe un acertijo en curso para el chat actual
  if (!(id in conn.tekateki)) {
    m.reply('✨️ Ese acertijo ya ha terminado!');
    return true;
  }

  // Obtiene los datos del acertijo
  const acertijoData = conn.tekateki[id];

  // Verifica si el ID del mensaje citado coincide con el ID del acertijo
  if (m.quoted.id === acertijoData[0].id) {
    const json = JSON.parse(JSON.stringify(acertijoData[1]));
    const respuestaCorrecta = json.response.toLowerCase().trim();
    const respuestaUsuario = m.text.toLowerCase().trim();

    // Compara la respuesta del usuario con la respuesta correcta
    if (respuestaUsuario === respuestaCorrecta) {
      global.db.data.users[m.sender].estrellas += acertijoData[2];
      m.reply(`🌟 *Respuesta correcta!*\n+${acertijoData[2]} Centavos`);
      clearTimeout(acertijoData[3]);
      delete conn.tekateki[id];
    } else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
      m.reply('Casi lo logras!');
    } else {
      m.reply('Respuesta incorrecta!');
    }
  }

  return true;
};

handler.exp = 0;
export default handler;
