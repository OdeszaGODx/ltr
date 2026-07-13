export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { message } = await request.json()

    if (!message || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Message is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const botToken = env.TELEGRAM_BOT_TOKEN
    const chatId = env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('Missing Telegram credentials')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Telegram API error:', error)
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
