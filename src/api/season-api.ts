import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Configuration } from '../config';

@autoinject()
export class SeasonApi{
	constructor(private http){
		this.http = new HttpClient();
	}
	
	public async createSeason(season){
		let path = "seasons";
		path = Configuration.getBaseURI() + path;
		console.log(path)
		return await this.http.fetch(path, {
            method: 'POST',
            body: JSON.stringify(season)
		})
		.then((response) => response.json())
	}
}

