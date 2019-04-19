export interface League {
    id: Number,
    name: String,
}

export interface Season {
    id: Number,
    league_id: Number,
    season_number: Number,
}

export interface Team {
    id: Number,
    season_id: Number,
    name: String,
}

// export interface Player {
//     id: Number,
//     season_id: Number,
//     name: String,
// }