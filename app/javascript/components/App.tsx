import React, { useState, useEffect, MetaHTMLAttributes } from 'react';

function App() {
    const [prompt, setPrompt] = useState('');
    const [author, setAuthor] = useState('');
    const [rewrite, setRewrite] = useState('');

    useEffect(() => {
        fetchBookDataAuthor();
        fetchRandomQuote();
    }, []);

    const fetchRandomQuote = async () => {
        try {
            let params: Object = {
                method: 'GET',
                headers: { 'X-Api-Key': '/USAQLzEraFRbMw7Fgy3Gg==YCEr07NGKSxvHwO6' },
                contentType: 'application/json',
            }
            const response = await fetch('https://api.api-ninjas.com/v1/quotes', params);
            const data = await response.json();
            setPrompt(data[0].quote);
            return;
        } catch (error) {
            console.log(error);
            return;
        }
    };

    const fetchBookDataAuthor = async () => {
        try {
            const offset = Math.floor(Math.random() * 10001);
            const randomAuthorNumber = Math.floor(Math.random() * 12);
            const response = await fetch(`https://openlibrary.org/subjects/literature.json?offset=${offset}`);
            const data = await response.json();
            const randomAuthorName = data.works[randomAuthorNumber].authors[0].name;
            setAuthor(randomAuthorName);
        } catch (error) {
            console.log(error);
            return;
        }
    };

    const onChange = (event:Event, setFunction:Function):any => {
        setFunction((event.target as HTMLTextAreaElement).value);
    };

    const postMessage = async (event:Event) => {
        event.preventDefault();
        
        const body = {
            author,
            sent_body: prompt
        };
        const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content;
        const headers_params:Object = {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            };
        const params:Object = {
            method: 'POST',
            headers: headers_params,
            body: JSON.stringify(body),
            };
        await fetch(`/messages`, params).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not OK.')
        }).catch((error) => { console.log(error.message); });
    };

    const getMessage = async (event:Event) => {
        event.preventDefault();

        const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content;
        const params = {
            method: 'GET',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            }
        };
        await fetch(`/messages/latest`, params).then((response) => {
            if (response.ok) {
                response.json().then((message) => setRewrite(message.received_body))
            }
            throw new Error('Network response was not OK.')
        }).catch((error) => { console.log(error.message); });
    };

    const submitForm = async (event:Event) => {
        await postMessage(event);
        await getMessage(event);
    };

    return (
        <div className='flex flex-col w-full gap-8'>
            <h1 className='text-6xl font-bold self-center pb-8 text-[#dda15e] border-b-4 border-[#dda15e]'>AI REWRITE</h1>
            <div className='flex h-1/2 gap-16 justify-center'>
                <div className='w-96 p-8 shadow-lg bg-white'> 
                    <form onSubmit={submitForm} className='flex flex-col gap-2'>
                        <textarea value={prompt} onChange={(event) => onChange(event, setPrompt)} rows="10" cols="80" className="" required /> 
                        <button className='border-2 hover:bg-gray-100 active:bg-gray-200' type="submit">Rewrite</button> 
                        <p>In the style of...</p>
                        <input className="self-center border-2" type="text" value={author} onChange={(event) => onChange(event, setAuthor)} required />
                    </form>
                </div>
                <div className='w-96 p-8 shadow-lg bg-white'>
                    <p>{rewrite}</p>
                </div>
            </div>
        </div>
    );
};

export default App;
