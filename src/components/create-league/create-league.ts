
import {inject} from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { dispatchify, connectTo } from 'aurelia-store';
import { pluck } from 'rxjs/operators';
import { League, Season, Team } from 'types'
import * as csvparser from 'papaparse';

//import { setTableName, focusTemplate, defocusTemplate } from 'store/actions/template'
import { State } from 'store/state';
import { LeagueApi } from 'api/league-api';
import { SeasonApi } from 'api/season-api';
import { TeamApi } from 'api/team-api';
import { setLeague, setSeason } from 'store/actions/app-state';
import { PlayerApi } from 'api/player-api';
import { DraftApi } from 'api/draft-api';

@autoinject 
@connectTo()
export class CreateLeague {

    private league : League = {
        id: null,
        name: "",
    }

    private season : Season = {
        id: null,
        league_id: null,
        season_number: 1
    }

    private teams: Team[] = [];
    private players: any[] = [];

    private teamText;
    private playerCsv;

	constructor(private leagueapi: LeagueApi, private seasonapi: SeasonApi, private teamapi: TeamApi, private playerapi: PlayerApi, private router: Router, private draftapi: DraftApi) {

    }
    
    private addTeam(){
        if(this.teamText) {
            this.teams.push({id:null, season_id: null, name: this.teamText});
            this.teamText = "";
        } 
    }

    private removeTeam(target) {
        console.log(target);
		this.teams.splice(Number(target),1);
    }
    
    private uploadPlayers() {
        console.log(this.playerCsv);
        var players = []
        csvparser.parse(this.playerCsv[0], {
            step: function(row, p){
                players.push(row.data[0]);
            },
            header: true,
            skipEmptyLines: true,
        });
        this.players = players;
    }

    private addPlayer(r, p) {
        console.log(r)
        console.log(this);
        this.players = this.players.concat(r.data);
        console.log(this.players);
    }

    async createLeague() {
        let league = await this.leagueapi.createLeague(this.league);
        dispatchify(setLeague)(league)

        this.createSeason(league.id);
    }

    async createSeason(league_id) {
        this.season.league_id = league_id;
        let season = await this.seasonapi.createSeason(this.season);
        dispatchify(setSeason)(season)

        this.createTeams(season.id);
        this.createPlayers(season.id);
        this.createDraft(season.id);
        this.router.navigateToRoute("draft");
    }

    private createTeams(season_id) {
        this.teams.map(function(team) { 
            team.season_id = season_id; 
            return team;
        });

        this.teamapi.createTeams(this.teams);
        console.log(this.teams);
    }

    private createPlayers(season_id) {
        console.log(this.players);
        this.players.map(function(player) {
            console.log(player);
            player.season_id = season_id; 
            return player;
          });
        console.log(this.players);

        this.playerapi.createPlayers(this.players);
    }

    private createDraft(season_id) {
        this.playerapi.createPlayers(season_id);
    }
}
