# Database Schema (MongoDB)


## `User`
| column name       | data type | details                   |
|:------------------|:----------|:--------------------------|
| `_id`             | ObjectID  | not null, primary key     |
| `handle`          | String    | not null, unique          |
| `email`           | String    | not null, unique          |
| `password`        | String    | not null                  |
| `games`           | Array(`Game` ObjectId)     | array                    |
| `date`            | Date      | not null, default Now     |


# `Game`
| column name       | data type | details                   |
|:------------------|:----------|:--------------------------|
| `_id`             | ObjectID  | not null, primary key     |
| `host`            | `User` ObjectID  | not null, game owner                  |
| `players`         | Array(`User` ObjectId)     | players, includes owner                  |
| `rules`           | Object    | game rules                  |
| `cardPacks `      | Array(`CardPack` ObjectId)    | expansions/card packs in use                  |
| `white`      | Array(ObjectId `Card`)    | all white cards in game                  |
| `black`      | Array(ObjectId `Card`)    | all black cards in game                  |
| `discardedWhite`      | Array(ObjectId `Card`)    | previously used white cards                  |
| `name`      | String    | game name, not fixed                  |
| `playerStates`      | Array(Object)    | player hands, scores, see `Note 1: playerState` |
| `currentTurn`      | 'User' ObjectId    | id of current card czar |
| `cardsInPlay`      | Array(Object)    | cards up for selection, see `Note 2: cardsInPlay` |
| `rounds`          | Number    | Total czar turns in game so far |
| `messages`          | Array(`Message` ObjectId)    | in game chat messages |
| `date`            | Date      | not null, default Now     |

### `Note 1: playerState`

| column name       | data type | details                   |
|:------------------|:----------|:--------------------------|
| `_id`             | ObjectID  | not null, primary key     |
| `white`           | Array(`Card` ObjectID)  | cards in player's hand     |
| `black`           | Array(`Card` ObjectID)  | cards player has one this game     |
| `score`           | Number  | points/total cards player has accrued this game     |


### `Note 2: cardsInPlay`

| column name       | data type | details                   |
|:------------------|:----------|:--------------------------|
| `_id`             | ObjectID  | not null, primary key     |
| `white`           | Array(`Card` ObjectID)  | white cards up for selection this round     |
| `black`           | `Card` ObjectID  | card czar's card this round     |


# `CardPack`
| column name       | data type | details                   |
|:------------------|:----------|:--------------------------|
| `_id`             | ObjectID  | not null, primary key     |
| `url_id`          | String    | url friendly card pack name          |
| `name`           | String    | card pack name          |
| `quantity`        | Object    | no. of white, black, and total cards
| `white`           | Array(`Game` ObjectId)     | white cards in pack    |
| `black`           | Array(`Game` ObjectId)     | black cards in pack    |
| `date`            | Date      | not null, default Now     |

## `Card`
| column name       | data type | details                   |
|:------------------|:----------|:--------------------------|
| `_id`             | ObjectID  | not null, primary key     |
| `color`          | String    | card color, 'white'/'black'          |
| `content`           | String    | card phrase          |
| `pick`        | Number    | no. of cards to pick from hand (black only)
| `draw`        | Number    | no. of cards to draw before picking (black only)
| `cardPack`           | `CardPack` ObjectId    | associated cardPack    |
| `date`            | Date      | not null, default Now     |

