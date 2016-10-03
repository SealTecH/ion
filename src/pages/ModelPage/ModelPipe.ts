/**
 * Created by sealtech on 03.10.2016.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {Model} from '../../db/DbService'

@Pipe({ name: 'ModelListPipe',pure: false })
export class ModelListPipe implements PipeTransform {
  transform(Models: Model[]) {
    return Models;
  }
}
