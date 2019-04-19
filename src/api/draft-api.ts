import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Configuration } from '../config';

@autoinject()
export class DraftApi{
	constructor(private http){
		this.http = new HttpClient();
	}
	
	public async createDraft(season_id){
		let path = "drafts";
		path = Configuration.getBaseURI() + path;
		console.log(path)
		return await this.http.fetch(path, {
            method: 'POST',
            body: JSON.stringify({
                season_id: season_id,
            })
		})
		.then((response) => response.json())
	}
}

