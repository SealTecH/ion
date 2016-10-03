/**
 * Created by sealtech on 12.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DbService,Subscription,Model,Submodel} from '../../db/DbService'
import {Injectable} from '@angular/core'
import {SubmodelPage} from "../SubmodelPage/SubmodelPage";
import {Device} from 'ionic-native';
import {Platform} from 'ionic-angular';
import { Http } from '@angular/http';
import {User} from "../../user/User";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'
import {Observer} from "../../../node_modules/rxjs/Observer";
import {ModelListPipe} from "ModelPipe";
@Component({
  templateUrl: 'Model.html',
})
export class ModelPage
{
  Models:Model[];
  data :Observable<Model[]>;
  Sub_id:number;
  http:Http;
  sb: any;
  status:any;
  constructor(public navCtrl: NavController,private db: DbService,private user: User,http:Http, navParams: NavParams) {
    this.Sub_id = navParams.get('id');
    this.Models = [];
    this.http = http;
    //this.Models = [];
    this.db.getModels(this.Sub_id).then(data=>{
        if(data.res.rows.length==0)
        {
          let flag= true;
          let page = 0;
          let url = 'http://preview.sysonline.com/ezparts-mobile/models.php';
          let body = JSON.stringify({u: user.username, p: user.pass,id:user.device_id,f:page,sid:this.Sub_id });
          this.http.post(url, body).subscribe(data => {
            let answer = data.json();
            if (answer.r === 'ok') {
              this.db.addModels(answer.m,0,this.Sub_id).then(()=>{
                this.db.getModels(this.Sub_id).then(
                  data=>{
                    console.log("get models data ");
                    console.log(data.res.rows);
                    if(data.res.rows.length>0) {
                      for(var i=0;i<data.res.rows.length;i++)
                      {
                        let item = data.res.rows.item(i);
                        console.log(item);
                        this.Models.push(new Model(item.id,item.Ext_id,item.Sub_id,item.Code,item.Desc));
                      }
                    }
                  });
              });
            }
          });
        }
      else
        {
          this.Models=data;
        }
    });
  }



  public onClick(event,id)
  {
    console.log("model click");
    this.navCtrl.push(SubmodelPage,{id:id,type:0});
  }
  public onRef($event,id)
  {
    this.db.getModels(this.Sub_id).then(dt=> {
      this.Models = dt;
    });
  }





 public test(flag,page,user,sub_id):Promise<any>
 {
   console.log("inside");
   let url = 'http://preview.sysonline.com/ezparts-mobile/models.php';
   let body = JSON.stringify({u: user.username, p: user.pass,id:user.device_id,f:page,sid:this.Sub_id });
  return Promise.resolve(this.http.post(url, body).subscribe(data => {
     let answer = data.json();
     if(answer.r === 'ok')
     {
       flag = answer.more;
       this.db.addModels(answer.m,0,sub_id).then(data=> {
         page++;
         //if(page<15&&flag)
         //{
         //  console.log("start "+page);
         //  this.test(flag,page,user,sub_id);
         //}
       });
      return [flag,page];
     }
   })
  );
   //return Promise.resolve({d:fg});
 }

























  //
  //
  //
  //
  //private synchModels(user,url,flag,page)
  //{
  //  console.log("go into synch at "+page);
  //  if(!flag||page>10)
  //  {
  //    console.log("flag is "+flag+" page is "+page);
  //    return Promise.resolve(null);
  //  }
  //  let body = JSON.stringify({u: user.username, p: user.pass,id:user.device_id,f:page,sid:this.Sub_id });
  //   return Promise.resolve(this.http.post(url, body).subscribe(data => {
  //    console.log(data);
  //    let answer = data.json();
  //    console.log(answer);
  //    if (answer.r === 'ok') {
  //      flag = answer.more;
  //      this.db.addModels(answer.m,0).then(data=>{
  //        page++;
  //        this.synchModels(user,url,flag,page);
  //      });
  //    }
  //    else
  //    {
  //      console.log(answer);
  //      flag = false;
  //    }
  //  })
  //   );
  //}
}
