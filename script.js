document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    const chat = document.getElementById('chat');

    fetch('/generate-text', { // '/generate-text'는 서버 측 엔드포인트입니다.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // 응답 데이터를 사용하여 채팅에 메시지 추가
        const assistantResponse = document.createElement('div');
        assistantResponse.classList.add('chat-message', 'assistant');
        assistantResponse.textContent = `어시스턴트: ${data.text}`;
        chat.appendChild(assistantResponse);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    document.getElementById('userInput').value = ''; // 입력란을 비웁니다.
});
