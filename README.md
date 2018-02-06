# Blockchain Darwin Bot Project
A project based off my modular discord bot setup, built for the blockchain darwin discord group.

---

## Overview
This project is based of my modular discord bot setup that I am using to run not only the blockchain darwin discord bot but a number of others as well. Each bot runs under this one application (so I only need one heroku server). 

Each bot is a modular component. Bots are `custom_modules` and all of the functionality specific to that bot should be contained within its own module (ie. it should not reference anything outside of its own root folder). 

There are also common components which are shared across multiple bots. These components are `common_modules` and similarly to the bots all functionality for common modules are contained within each module folder.

### Custom Modules
Each custom module is really its own app. I have removed all other custom modules and only left the `blockchain-darwin-bot` module. We shouldn't need to create any additional custom_modules.

### Common Modules
Common modules are self contained pluggable packages that inject functionality into a custom module. For example, the `coin-market-cap` module provides the ability to ask the bot to find a price for a specific coin on coin market cap.

Common modules can be injected into any custom module during the setup phase of the custom module. In order to inject a custom module go to: `src > app > app.ts` and simply add the module class to the array in this line:
```javascript 
this.bcd.setup([PriceModule, BitconnectModule]);
```

You can create as many common modules as you want or expand upon the existing common modules. Try to ensure that common modules are not made to generic as its much cleaner and easier to pick and choose between features if we make modules more specific.

### Events
The event system is somewhat complex. In the bootstrapper of each custom module you will see that an `eventService: EventService` object is created. This service maintains a list of events that the bot should listen for. Events are added to the service by the `event-manager`. 

The event manager contains a single static method:
```javascript
public static SetupEvents(eventService: EventService, modules?: any[]){...}
```
This method handles adding `Triggers` and `Events` to the event service.

#### Triggers & Events
| | Description | Example |
| --- | --- | --- |
| **Triggers** | Any actions that the user can direct the bot to perform | typing `!help` in discord |
| **Events** | Any event that triggers an action to occur but the user did not explicitly command | causing bot to print true when someone says false in any sentence |

#### Mandatory Fields
| Field Name | Description |
| --- | --- |
| type | Tells the event service what type of discord event should cause this trigger / event to activate |
| regexValidator | Tells the event service how to verify if the user input is correct for this event / trigger |
| callback | Tells the event service what to do if the regexValidator is satisfied |

**Side Notes**
> The event service contains methods for adding and removing events, these can be helpful for creating more complex events. For example, you might want to create an easter egg that when you someone says a word in the discord chat a new event is added to the event service which when triggered removes itself so it cannot be activated again.

### Commands
Each module has a `commands` folder. Commands contain all the logic required to execute a command. Multiple commands should be broken into separate files if they are large **or** if they perform different purposes.

For example: The common module `coin-market-cap` contains `price-cmd.ts` and `error-cmd.ts`.
The price command is quite large, therefore if I were to add another command to get market cap of a coin then I would create `market-cap-cmd.ts`.

---

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

---

## Questions
If you have any questions or get stuck on anything, I am happy to help out - just send me a message in the Blockchain Darwin discord.
