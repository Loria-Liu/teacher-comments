const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Zeabur 会把系统里的 Key 自动填到这里
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'AI 接口请求失败' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`服务已启动，端口: ${port}`));
