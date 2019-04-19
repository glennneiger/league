import store from '../store'
import { State } from '../state'

export async function setLeague(state: State, league) {
	const newState = Object.assign({}, state);

	newState.app.league_id = league.id;
	newState.app.league_name = league.name;

	return newState;
}

export async function setSeason(state: State, season) {
	const newState = Object.assign({}, state);
	console.log(season)
	newState.app.season_id = season.id;
	newState.app.season_number = season.season_number;

	return newState;
}


store.registerAction('setLeague', setLeague);
store.registerAction('setSeason', setSeason);
