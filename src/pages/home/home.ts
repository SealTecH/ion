import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Platform} from 'ionic-angular';
import {AlertController} from "../../../node_modules/ionic-angular/components/alert/alert";
//declare var cordova: any;
//const fs:string = cordova.file.dataDirectory;

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  url:string;
  username: string;
  pass:string;

  constructor(private nav:NavController, private platform:Platform, private alertCtrl:AlertController) {





  }





}
