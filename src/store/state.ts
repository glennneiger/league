export interface State {
    app: {
        league_id: Number,
        league_name: String,
        season_id: Number,
        season_number:Number
    }
}

export const initialState = {
    app: {
        league_id: null,
        league_name: null,
        season_id: null,
        season_number:null
    }
};
