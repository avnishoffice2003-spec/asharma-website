const https = require('https');

exports.handler = async function(event, context) {
    // Sirf POST requests allow karenge security ke liye
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);
        const { name, company, phone, email, sector } = data;

        // Fetching Secrets from Netlify Environment Variables
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error("Missing Telegram Env Variables");
            return { statusCode: 500, body: 'Server configuration error.' };
        }

        const message = `🚨 *New High-Value Lead (FDI Tool)* 🚨\n\n` +
                        `👤 *Name:* ${name}\n` +
                        `🏢 *Company:* ${company}\n` +
                        `📱 *Phone:* ${phone}\n` +
                        `✉️ *Email:* ${email}\n` +
                        `📊 *Sector:* ${sector}\n\n` +
                        `_Lead captured via Legal Brief Download_`;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const payload = JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        });

        const sendToTelegram = () => {
            return new Promise((resolve, reject) => {
                const req = https.request(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(payload)
                    }
                }, (res) => {
                    let responseBody = '';
                    res.on('data', (chunk) => responseBody += chunk);
                    res.on('end', () => resolve(responseBody));
                });
                req.on('error', (e) => reject(e));
                req.write(payload);
                req.end();
            });
        };

        await sendToTelegram();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Lead captured successfully!" })
        };
    } catch (error) {
        console.error("Error capturing lead:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to process lead." })
        };
    }
};