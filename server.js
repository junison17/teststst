require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // HTML, CSS, JS 파일이 있는 디렉토리

app.post('/generate-text', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}` // .env에서 API 키를 불러옵니다.
        },
        body: JSON.stringify({
            model: 'text-davinci-002', // 모델을 사용할 수 있는 최신 버전으로 설정하세요.
            prompt: prompt,
            max_tokens: 150
        })
    });
    const data = await response.json();
    res.json({ text: data.choices[0].text });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
