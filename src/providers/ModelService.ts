import {Injectable} from "@angular/core"
import {Model} from '../db/DbService'
@Injectable()
export class ModelService
{
  Models: Model[];
  constructor()
  {
	  this.Models = [];
  }
}
