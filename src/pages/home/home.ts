import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DbService,Subscription,Model,Submodel} from '../../db/DbService'
import {Injectable} from '@angular/core'
import {ModelPage} from "../ModelPage/ModelPage";
import {File} from 'ionic-native';
import {Platform } from 'ionic-angular';
import {Transfer} from 'ionic-native';
import {AlertController} from "../../../node_modules/ionic-angular/components/alert/alert";
import {Sql} from "../../providers/Sql";
//declare var cordova: any;
//const fs:string = cordova.file.dataDirectory;

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  url:string;
  username: string;
  pass:string;

  constructor(private nav:NavController, private platform:Platform, private alertCtrl:AlertController,private sql: Sql) {

    sql.query("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT,Username TEXT,Password TEXT) ");
    sql.query('INSERT INTO Users (Username,Password) VALUES (?,?)',['login','pass']);
    sql.query('SELECT * from Users').then(data =>{
      if(data.res.rows.length>0)
      {
        console.log(data);
        this.username =  data.res.rows[0].login;
        this.pass =  data.res.rows[0].pass;


      }
    });
    //
    //File.createFile('files', 'feedback.txt', true).then((fileEntry) => {
    //
    //  fileEntry.createWriter((fileWriter) => {
    //
    //    fileWriter.onwriteend = () => {
    //      console.log('File writer - write end event fired...');
    //      alert('File writer - write end event fired...');
    //    };
    //
    //    fileWriter.onerror = (e) => {
    //      console.log('file writer - error event fired: ' + e.toString());
    //     alert('file writer - error event fired: ' + e.toString());
    //    };
    //
    //    fileWriter.write("ololo");
    //  });
    //}).catch(err =>{
    //  console.log(err);
    //});

  }





}
