import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  public results: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.data != null) {
      if (navParams.get("results") != null) {
        this.results = navParams.get("results");
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
