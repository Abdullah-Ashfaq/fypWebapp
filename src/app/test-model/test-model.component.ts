import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
  styleUrls: ['./test-model.component.scss']
})
export class TestModelComponent implements OnInit {

  constructor(
    private dialoge: MatDialog,
    private firestore: AngularFirestore,
    private papa: Papa,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.currentDiv = 'show-models'
    this.minDiv = 'querry'
    this.spin = false
  }

  models: any;
  currentDiv: string;
  spin: boolean;
  data: any;
  selectedCSVFileName: string;
  isCSV_Valid: boolean;
  minDiv: string;


  showNoti(message) {
    this.snackBar.open(message, '', {
      panelClass: ['blue-snackbar'],
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });

  }

  close() {
    this.dialoge.closeAll()
  }

  getHistory() {
    this.firestore.collection('HotelRecommendationFyp', ref =>
      ref.orderBy('timestamp', 'desc')).valueChanges().subscribe(res => {
        console.log(res);
        this.models = res
      })
  }

  switchView(param) {
    this.currentDiv = param
    this.minDiv = 'querry'
    this.spin = false
    this.review = ''
    this.operation = ''
    this.dispRes.splice(0, this.dispRes.length)
    this.reviews.splice(0, this.reviews.length)
    this.selectedCSVFileName = ''
  }

  switchMinView(param) {
    this.minDiv = param
    this.spin = false
    this.review = ''
    this.operation = ''
    this.dispRes.splice(0, this.dispRes.length)
    this.reviews.splice(0, this.reviews.length)
    this.selectedCSVFileName = ''
  }


  modelT: any;
  testModel(model) {
    this.modelT = model
    this.currentDiv = 'test-model'
    console.log(this.modelT);

  }

  fileChangeListener($event: any): void {
    this.spin = true
    const files = $event.srcElement.files;

    if (files !== null && files !== undefined && files.length > 0) {
      this.selectedCSVFileName = files[0].name;

      const reader: FileReader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = e => {

        const csv = reader.result;
        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isCSV_Valid = true;

          // PERFORM OPERATIONS ON PARSED CSV
          let csvTableHeader = results.data[0];

          let csvTableData = [...results.data.slice(1, results.data.length)];
          console.log(csvTableData)
          this.data = csvTableData
          this.data = this.data.slice(0, 3)
          this.spin = false
        } else {
          for (let i = 0; i < results.errors.length; i++) {
            this.showNoti('Error Parsing CSV File: ' + results.errors[i].message);
            this.spin = false

          }
        }
      };
    } else {
      this.showNoti('No File Selected');
      this.spin = false

    }

  }

  review: string;
  resp: any
  reviews: string[] = []
  labels: any;
  dispRes: string[] = []
  label: string;
  operation: string;

  validateProceed() {
    if (!this.review && !this.data) {
      this.showNoti('field cannot be empty')
    }
    else if (this.review) {
      this.spin = true
      this.operation = 'single'
      this.http.post('http://localhost:5000/test/run-time', {
        mlModel: this.modelT.modelName,
        featureName: this.modelT.features,
        review: [this.review],
        modelPath: this.modelT.modelPath
      }).subscribe((resp: any) => {
        console.log(resp)
        this.resp = resp
        this.spin = false
        this.label = this.resp.labels[0]

        console.log(this.dispRes);

        this.minDiv = 'show-prediction'

        this.showNoti('Successfully predicted labels')


      }, (() => {
        this.showNoti('Something went wrong!!!')
        this.minDiv = 'querry'
        this.spin = false
      }))

    }
    else if (this.data) {
      this.spin = true
      for (var i = 0; i < this.data[0].length; i++) {
        this.reviews.push(this.data[i][1])
      }
      console.log('this.reviews-->', this.reviews);

      this.operation = 'multiple'

      this.http.post('http://localhost:5000/test/run-time', {
        mlModel: this.modelT.modelName,
        featureName: this.modelT.features,
        review: this.reviews,
        modelPath: this.modelT.modelPath
      }).subscribe((resp: any) => {
        console.log(resp)
        this.resp = resp
        this.spin = false
        this.showNoti('Successfully predicted labels')
        this.labels = this.resp.labels
        this.selectedCSVFileName = ''
        for (var i = 0; i < this.reviews.length; i++) {
          if(this.labels[i]=='1'){
            this.dispRes.push(this.reviews[i] + 'Positive')
       
          }
          else if(this.labels[i]=='1'){
              this.dispRes.push(this.reviews[i] + 'Negative')
           
          }
          else{
            this.dispRes.push(this.reviews[i] + ' Neutral')
           
          }

         }
        console.log(this.dispRes);

        this.minDiv = 'show-prediction'

      }, (() => {
        this.showNoti('Something went wrong!!!')
        this.minDiv = 'querry'
        this.spin = false
      }))

    }

  }



  ngOnInit(): void {
    this.getHistory()
  }

}
