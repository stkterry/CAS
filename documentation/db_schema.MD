# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | hash      | not null, primary key     |
| `handle`          | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |
| `password`        | string    | not null                  |
| `game_ids`        | array     |                           |
| `date`            | Date      | not null, default Now     |

+ index on `handle, unique: true`
+ index on `email, unique: true`

<!-- has many messages (shared with characters) -->


## `games`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | hash      | not null, primary key     |
| `host`            | ObjectID  | not null                  |
| `players`         | array     | not null                  |
| `rules`           | object    | not null                  |
| `card_state`      | object    | not null                  |
| `game_state`      | object    | not null                  |
| `date`            | Date      | not null, default Now     |

## `card_state object example`
```json
{
  "played_black_cards": [cardID1, cardID2, cardID3,...],
  "played_white_cards": [cardID1, cardID2, cardID3,...],
  "shuffled_white_cards": [...],
  "shuffled_black_cards": [...],
}
```

## `game_state object example`
```json
{
  "player_turn": "player_handle",,
  "player_rotation": [playerID1, playerID2, playerID3,...]
  "active_black_card" cardIDx,
  "active_white_cards": [...],
  "player_states" : {
    playerID1: {"white_cards": [...], "black_cards": [...]},
    playerID2: {"white_cards": [...], "black_cards": [...]},
    playerID3: {"white_cards": [...], "black_cards": [...]}
  }
}
```