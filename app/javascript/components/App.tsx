import React, { useState } from 'react';

function App() {
    const [prompt, setPrompt] = useState('');
    const [author, setAuthor] = useState('');

    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
        };

    const submitForm = async (e) => {
            e.preventDefault();
            const body = {
               author,
               sent_body: prompt
                };

            const token = document.querySelector('meta[name="csrf-token"]').content;
            await fetch(`/messages`, {
                    method: 'POST',
                    headers: {
                            'X-CSRF-Token': token,
                            'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(body),
                }).then((response) => {
                    if(response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not OK.')
                    }).catch((error) => { console.log(error.message); });
        };

    return(
    <div>
        <h1>ChatGPT - Rewrite</h1>
       
       <form onSubmit={submitForm}>
        <textarea value={prompt} onChange={(e) => onChange(e, setPrompt)} required />
        <button type="submit">Rewrite</button>
        <p>In the style of...</p>
        <input type="text" value={author} onChange={(e) => onChange(e, setAuthor)} required />
       </form>
    </div>
    );
}

export default App;
