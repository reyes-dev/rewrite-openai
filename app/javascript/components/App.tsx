import React, { useState } from 'react';

function App() {
    const submitForm = (e) => {
            e.preventDefault();
            console.log('test');
        }

    return(
    <div>
        <h1>ChatGPT - Rewrite</h1>
       
       <form onSubmit={submitForm}>
        <textarea />
        <button type="submit">Rewrite</button>
        <p>In the style of...</p>
        <input type="text"/>
       </form>
    </div>
    );
}

export default App;
