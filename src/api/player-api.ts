import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Configuration } from '../config';

@autoinject()
export class PlayerApi{
	constructor(private http){
		this.http = new HttpClient();
	}
	
	public async createPlayers(players){
		let path = "players";
		path = Configuration.getBaseURI() + path;

		return await this.http.fetch(path, {
            method: 'POST',
            body: JSON.stringify({
                players: players
            })
		})
		.then((response) => response.json())
	}
}

