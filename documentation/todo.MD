### Needed Pages:
+ Splash
+ Home
+ Profile
+ Games
+ Game Page
+ Hero


### Models
+ Finalize User/Game models
+ Implement card states
+ implement game states

### Cards
+ Implement card rules/packs
+ implement all cards


## Animations
+ all


### Routes/API
+ Currently cards are pulled through game documents and tied to them directly,
it would be more efficient to eventually seperate cards/cardpack/game states so
joining subsequent rooms wouldn't have to reload ALL cards via the individual game.  
Instead, cards/cardpacks could be loaded into state differentially based on the 
different cardpacks between games!