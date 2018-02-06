# Blockchain Darwin Bot Project
A project based off my modular discord bot setup, built for the blockchain darwin discord group.

## Getting Started
Typescript is being used for the source files which need to be generated into JavaScript for the distribution files. Remember to always run `tsc` in the console before commiting and deploying changes, as this will compile the Typescript code into JavaScript.

### How to Contribute
1. Clone the repo 
2. Open it in your IDE (Visual Studio Code)
3. Open the command console within VSCode
4. Run `npm install`
5. Insert your own bot token for testing (see Adding Bot Token below).
6. Make changes (you can branch off the master if you want)
7. Run `tsc` (this will generate the typescript into javascript!)
8. Commit changes (merge into master if necessary)
9. Push master branch to github
10. I will merge code changes into my private repo which contains the full modular discord bot project which runs 24/7 on heroku (essentially a prod release).

### Adding Bot Token
1. Head on over to https://discordapp.com/developers/applications/me and create a new app.
2. Fill in required fields and submit
3. Under the 'Bot' heading, select 'Create a Bot User'
4. Copy the Token
5. Open the application code and navigate to blockchain-darwin-bot > core > bootstrapper.ts
6. Add your token here `this.client.login("<TOKEN GOES HERE>");`
7. Create your own discord server
8. Go back to the discordapp bot page
9. Click the 'Generate OAuth2 URL' 
10. Add the bot to your new discord server
