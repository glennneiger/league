
import {inject} from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { dispatchify, connectTo } from 'aurelia-store';
import { pluck } from 'rxjs/operators';

//import { setTableName, focusTemplate, defocusTemplate } from 'store/actions/template'
import { State } from 'store/state';

@autoinject 
@connectTo()
export class Game {	
	constructor() {

    }
    
    private async test(){
    }
}
