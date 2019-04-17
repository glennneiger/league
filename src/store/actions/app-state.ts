import store from '../store'
import { State } from '../state'

export async function setLeague(state: State, leagueNumber) {
	const newState = Object.assign({}, state);

	newState.app.league = leagueNumber;

	return newState;
}


store.registerAction('setLeague', setLeague);
// store.registerAction('Logout', logout);
