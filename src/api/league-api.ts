import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Configuration } from '../config';

@autoinject()
export class LeagueApi{
	constructor(private http){
		this.http = new HttpClient();
	}
	
	public async createLeague(league){
		let path = "leagues";
		path = Configuration.getBaseURI() + path;
		console.log(path)
		return await this.http.fetch(path, {
            method: 'POST',
            body: JSON.stringify(league)
		})
		.then((response) => response.json())
	}
}

