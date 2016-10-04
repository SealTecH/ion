/**
 * Created by sealtech on 12.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DbService,Model} from '../../db/DbService'
import {ModelService} from "../../providers/ModelService";

import { Http } from '@angular/http';
import {User} from "../../user/User";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
  templateUrl: 'Model.html',
})
export class ModelPage
{

  data :Observable<Model[]>;
  Sub_id:number;
  http:Http;
  sb: any;
  status:any;
  constructor(public navCtrl: NavController,private db: DbService,private user: User,http:Http, navParams: NavParams,public models: ModelService) {
    this.Sub_id = navParams.get('id');
    this.http = http;
    this.db.getModels(this.Sub_id).then(data=>{
        if(data.res.rows.length==0)
        {
          console.log("in if");
          let flag= true;
          let page = 0;
          this.test(flag,page,this.user,this.Sub_id);
        }
      else
        {
          for(let i =0; i<data.rows.length;i++)
          {
            this.models.Models.push(new Model(data.rows[i].id,data.rows[i].Ext_id,data.rows[i].Sub_id,data.rows[i].Code,data.rows[i].Desc));
          }
        }
    });
  }



  public onClick(event,id)
  {
    console.log("model click");
    //this.navCtrl.push(SubmodelPage,{id:id,type:0});
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
         if(flag)
         {
           this.test(flag,page,this.user,this.Sub_id);
         }
       });
      return [flag,page];
     }
   })
  );
 }





}
