# Rewrite with ChatGPT
An application interface for interacting with the OpenAI API to achieve various results with user inputs. The purpose of this application is for me to practice using the OpenAI API
in creative ways, leveraging the Ruby on Rails framework to save and explore results and delivering the user interface with a React/TypeScript frontend.

# Features
I'm experimenting with adding more features to this application as I come up with them. 

## Rewrite 
Enter desired text, such as a paragraph from your favorite book, or snippet of writing. Next, enter a preferred author. Click Rewrite and the text will be rewritten in the
style of the given author, courtesy of OpenAI's language models.

## Features I want to add
- Generate Bucket List Item + Generate Steps to Achieve It
- Enter OpenAI API Key in simple input box

# Run locally
1. Git clone the app
2. Run the command `bundle install`
3. Run the command `yarn install`
4. Go into config folder and create a file called 'application.yml'
5. Type `OPENAI_ACCESS_TOKEN: "YOUR OPENAI API KEY HERE"` Enter your OpenAI API key in the quotes, making sure it's exact.
6. Run the command `bin/dev`
7. Go to localhost:3000
