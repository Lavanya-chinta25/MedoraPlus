// static/script.js
document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;

    if (userInput.trim()) {
        fetch('/process_input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'userInput=' + encodeURIComponent(userInput)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').textContent = data.response+"\n     ";
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter some text!');
    }
});
