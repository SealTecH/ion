/**
 * Created by sealtech on 22.09.2016.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DbService,Subscription} from '../../db/DbService'
import {ModelPage} from "../ModelPage/ModelPage";
import {NavParams} from "ionic-angular";
@Component({
  templateUrl: 'Subscriptions.html'
})
export class SubscriptionsPage {

  Subscriptions:Subscription[];
  UserId: number;
  constructor(public navCtrl: NavController,private db: DbService, navParams: NavParams) {
    this.Subscriptions = [];
   let UserId =  navParams.get('UserId');
    console.log("sbbpage uid "+UserId);
    this.db.returnSubscriptions(UserId).then(
      data=>{
        this.Subscriptions = [];
        if(data.res.rows.length>0){
          for(var i=0;i<data.res.rows.length;i++)
          {
            let item = data.res.rows.item(i);
            console.log(item);
            this.Subscriptions.push(new Subscription(item.Name,item.id,item.Ext_id,item.User_id));
          }
        }
      }
    );

  }

  onClick(event,id)
  {
    this.navCtrl.push(ModelPage,{id:id});
  }


}
