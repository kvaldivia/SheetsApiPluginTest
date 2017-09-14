import { ResultsPage } from './../results/results';
import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private sheets: any;
  private username: String;
  private values: any;
  readonly spreadsheetId: String = '1DoE-a1MdC1yuugD4266J4d-mZAaM-DB41knONFRPD94';
  readonly spreadsheetRange: String = 'Hoja 1';

  constructor(public navCtrl: NavController, private platform: Platform, private modCtrl: ModalController) {
    this.platform.ready().then(() => {
      this.sheets = cordova.require('cordova-plugin-google-sheets.GoogleSheets');
      console.log(this.sheets);
    });
  }

  public signIn() {
    this.platform.ready()
      .then(() => {
        this.sheets.signIn(
          (data) => {
            this.username = data;
          },
          (error) => {console.log(error);}
        );
      });
  }

  public getSpreadsheetData() {

    this.platform.ready()
      .then(() => {
        this.sheets.getSpreadsheet(this.spreadsheetId, this.spreadsheetRange,
          (data) => {
            this.values = { "values": JSON.parse(data).values } || {"values": []};
            this.showResults(data)
          },
          (error) => {console.log(error)}
        )
      });
  }

  public updateSpreadsheetData() {
    this.platform.ready()
    .then(() => {
      this.sheets.updateSpreadsheetValues(
        this.spreadsheetId, this.spreadsheetRange, JSON.stringify(this.values),
        (data) => {
          this.showResults(data);
          console.log(data)
        },
        (error) => {console.log(error)}
      )
    });
  }

  public showResults(results: any) {
    let modal = this.modCtrl.create(ResultsPage, {results: results});
    modal.present();
  }
}
