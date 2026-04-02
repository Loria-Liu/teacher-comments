const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname));

// 这个接口负责转发请求到 DeepSeek
app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: '服务器请求失败' });
    }
});

// Vercel 环境下不需要 app.listen，直接导出
module.exports = app;
