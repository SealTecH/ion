import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {ModelPage} from "../pages/ModelPage/ModelPage";
import {ModelService} from "../providers/ModelService";
import {SubscriptionsPage} from "../pages/SubscriptionsPage/SubscriptionsPage";
import {DbService} from "../db/DbService";
import {User} from "../user/User";
import {Storage} from "../../node_modules/@ionic/storage/dist/es5/storage";
import {SQLite} from "../../node_modules/ionic-native/dist/es5/plugins/sqlite";
import {Sql} from "../providers/Sql";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ModelPage,
    SubscriptionsPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ModelPage,
    SubscriptionsPage
  ],
  providers: [
    DbService,
    User,
    SQLite,
    Storage,
    Sql,
	ModelService
  ]
})
export class AppModule {}
