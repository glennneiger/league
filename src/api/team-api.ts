import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Configuration } from '../config';

@autoinject()
export class TeamApi{
	constructor(private http){
		this.http = new HttpClient();
	}
	
	public async createTeams(teams){
		let path = "teams";
		path = Configuration.getBaseURI() + path;
		console.log(teams)
		return await this.http.fetch(path, {
            method: 'POST',
            body: JSON.stringify({
                teams: teams
            })
		})
		.then((response) => response.json())
	}
}

