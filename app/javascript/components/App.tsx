import React, { useState, useEffect } from 'react';

function App() {
    const [prompt, setPrompt] = useState('');
    const [author, setAuthor] = useState('');
    const [rewrite, setRewrite] = useState('');
   
    useEffect(() => {
           fetchBookDataAuthor();
           fetchRandomQuote();
        }, [])
    const fetchRandomQuote = async () => {
        try {
                const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                        method: 'GET',
                        headers: { 'X-Api-Key': '/USAQLzEraFRbMw7Fgy3Gg==YCEr07NGKSxvHwO6'},
                        contentType: 'application/json',
                    });
                const data = await response.json();
                setPrompt(data[0].quote);
                return;

        } catch(error) {
                console.log(error);
                return;
            }
        }
    const fetchBookDataAuthor = async () => {
            try {
                    const offset = Math.floor(Math.random() * 10001);
                    const randomAuthorNumber = Math.floor(Math.random() * 12);
                    const response = await fetch(`https://openlibrary.org/subjects/literature.json?offset=${offset}`);
                    const data = await response.json();
                    const randomAuthorName = data.works[randomAuthorNumber].authors[0].name;
                    setAuthor(randomAuthorName);
                } catch(error) {
                    console.log(error);
                    return;
            }
        }

    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
        };

    const postMessage = async (e) => {
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

   const getMessage = async (e) => {
            e.preventDefault(); 

            const token = document.querySelector('meta[name="csrf-token"]').content;
            await fetch(`/messages/latest`, {
                    method: 'GET',
                    headers: {
                            'X-CSRF-Token': token,
                            'Content-Type': 'application/json',
                        }
                }).then((response) => {
                    if(response.ok) {
                            response.json().then((message) => setRewrite(message.received_body) )
                        }
                        throw new Error('Network response was not OK.')
                    }).catch((error) => { console.log(error.message); });
        };
      
      const submitForm = async (e) => {
            await postMessage(e);
            await getMessage(e);
          }

    return(
    <div>
        <h1>ChatGPT - Rewrite</h1>
       
       <form onSubmit={submitForm}>
        <textarea value={prompt} onChange={(e) => onChange(e, setPrompt)} required />
        <button type="submit">Rewrite</button>
        <p>In the style of...</p>
        <input type="text" value={author} onChange={(e) => onChange(e, setAuthor)} required />
        <p>{rewrite}</p>
       </form>
    </div>
    );
}

export default App;
