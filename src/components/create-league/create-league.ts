
import {inject} from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { dispatchify, connectTo } from 'aurelia-store';
import { pluck } from 'rxjs/operators';
import { League, Season } from 'types'
import * as csvparser from 'papaparse';

//import { setTableName, focusTemplate, defocusTemplate } from 'store/actions/template'
import { State } from 'store/state';

@autoinject 
@connectTo()
export class CreateLeague {

    private league : League = {
        name: "",
        season: 1,
    }

    private season : Season = {
        teams: [],
        players: [],
    }

    private teamText;
    private playerCsv;

	constructor() {

    }
    
    private addTeam(){
        if(this.teamText) {
            this.season.teams.push(this.teamText);
            this.teamText = "";
        } 
    }

    private removeTeam(target) {
        console.log(target);
		this.season.teams.splice(Number(target),1);
    }
    
    private uploadPlayers() {
        console.log(this.playerCsv);
        csvparser.parse(this.playerCsv[0], {complete:this.test});
    }

    private test(r, p) {
        console.log(r);
    }
}
