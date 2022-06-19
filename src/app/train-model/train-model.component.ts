import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ViewDatasetComponent } from '../view-dataset/view-dataset.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.scss']
})
export class TrainModelComponent implements OnInit {

  constructor(
    private papa: Papa,
    public dialog: MatDialog,
    private http: HttpClient,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    // initializing features
    this.allCheck = false;
    this.bertCheck = false;
    this.doc2vecCheck = false;
    this.tfidfCheck = false;
    this.puncCheck = false;
    this.polarCheck = false;
    this.subjCheck = false;
    // this.spin=true
    console.log(this.allCheck)
    this.currentDiv = 'dataset'
    // this.selectedCSVFileName = 'dsfoi'
    // this.featureSelected = true
    // this.preprocessing = true
  }

  features: string[] = ['Subjectivity Score', 'TFIDF model features', 'Bert Model features', 'Word2Vec Model Features', 'Bert Model Features', 'doc2Vec Model Features', 'Punctuation Features']
  currentDiv: string;
  selectedCSVFileName;
  isCSV_Valid;
  data: any
  featureSelected: boolean = false;
  preprocessing: boolean = false
  modelSelected: boolean = false;
  spin: boolean = false;

  tempId: string[] = [];
  tempTweet: string[] = []
  tempBL: string[] = []
  tempMl: string[] = []
  columns: string[] = ['Tweet_ID', 'Tweet_Text', 'Tweet_Binary_Label', 'Tweet_MultiLabel']
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
          this.data = csvTableData
          this.data = this.data.slice(0, 100)

          this.spin = false
        } else {
          for (let i = 0; i < results.errors.length; i++) {
            this.showNoti('Error Parsing CSV File')
            this.spin = false

          }
        }
      };
    } else {
      this.showNoti('No File Selected')
      this.spin = false

    }

  }

  viewDataset() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '540px';
    dialogConfig.width = '100%';
    dialogConfig.data = {
      open: this.data,
    };
    this.dialog.open(ViewDatasetComponent, dialogConfig);


  }
  // features related variables
  puncCheck: boolean = false;
  subjCheck: boolean = false;
  doc2vecCheck: boolean = false;
  word2vecCheck: boolean = false;
  bertCheck: boolean = false;
  tfidfCheck: boolean = false;
  polarCheck: boolean = false;
  allCheck: boolean = false;
  selectedFeatures: string[] = []
  // preprocessing related variables
  stopWordsCheck: boolean = false;
  lemmitizationCheck: boolean = false;
  hashesCheck: boolean = false;
  numeronymsCheck: boolean = false;
  htmlEntitiesCheck: boolean = false;
  allStepsCheck: boolean = false;
  puncsCheck: boolean = false;


  subjScore(ob: MatCheckboxChange) {
    console.log("subjScore checked: " + ob.checked);
    this.subjCheck = ob.checked
    if (this.subjCheck == true) {
      this.selectedFeatures.push('subjectivityFeature')
    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('subjectivityFeature') === -1;
      });
    }
    console.log(this.selectedFeatures)
  }

  puncFeature(ob: MatCheckboxChange) {
    console.log("puncFeature checked: " + ob.checked);
    this.puncCheck = ob.checked

    if (this.puncCheck == true) {
      this.selectedFeatures.push('puncFeature')
    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('puncFeature') === -1;
      });
    }

    console.log(this.selectedFeatures)
  }

  tfidfFeature(ob: MatCheckboxChange) {
    console.log("tfidfFeature checked: " + ob.checked);
    this.tfidfCheck = ob.checked

    if (this.tfidfCheck == true) {
      this.selectedFeatures.push('tfidfFeature')
    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('tfidfFeature') === -1;
      });
    }

  }

  polarityFeature(ob: MatCheckboxChange) {
    console.log("polarityFeature checked: " + ob.checked);
    this.polarCheck = ob.checked

    if (this.polarCheck == true) {
      this.selectedFeatures.push('polarityFeature')
    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('polarityFeature') === -1;
      });
    }


  }
  word2vecFeature(ob: MatCheckboxChange) {
    console.log("word2vecFeature checked: " + ob.checked);
    this.word2vecCheck = ob.checked


    if (this.word2vecCheck == true) {
      this.selectedFeatures.push('word2vecFeature')
    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('word2vecFeature') === -1;
      });
    }


  }

  doc2vecFeature(ob: MatCheckboxChange) {
    console.log("doc2vecFeature checked: " + ob.checked);
    this.doc2vecCheck = ob.checked


    if (this.doc2vecCheck == true) {
      this.selectedFeatures.push('doc2vecFeature')
    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('doc2vecFeature') === -1;
      });
    }


  }

  bertFeature(ob: MatCheckboxChange) {
    console.log("bertFeature checked: " + ob.checked);
    this.bertCheck = ob.checked

    if (this.bertCheck == true) {
      this.selectedFeatures.push('bertFeature')
    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('bertFeature') === -1;
      });
    }


  }

  puncs(ob: MatCheckboxChange) {
    console.log("puncs checked: " + ob.checked);
    this.puncsCheck = ob.checked

    if (this.puncsCheck == true) {
      this.preprocesingChecks.push('puncs')
    }
    else {
      this.preprocesingChecks = this.preprocesingChecks.filter(function (item) {
        return item.indexOf('puncs') === -1;
      });
    }


  }

  allFeature(ob: MatCheckboxChange) {
    console.log("allFeature checked: " + ob.checked);
    this.allCheck = ob.checked
    this.bertCheck = ob.checked
    this.doc2vecCheck = ob.checked
    this.word2vecCheck = ob.checked
    this.polarCheck = ob.checked
    this.tfidfCheck = ob.checked
    this.puncCheck = ob.checked
    this.subjCheck = ob.checked


    if (this.allCheck == true) {
      this.selectedFeatures.push('allFeature')

    }
    else {
      this.selectedFeatures = this.selectedFeatures.filter(function (item) {
        return item.indexOf('allFeature') === -1;
      });
    }
    console.log(this.selectedFeatures);


  }

  preprocesingChecks: string[] = []

  stopWords(ob: MatCheckboxChange) {
    console.log("stopWords checked: " + ob.checked);
    this.stopWordsCheck = ob.checked

    if (this.stopWordsCheck == true) {
      this.preprocesingChecks.push('stopWords')
    }
    else {
      this.preprocesingChecks = this.preprocesingChecks.filter(function (item) {
        return item.indexOf('stopWords') === -1;
      });
    }

  }


  lemitization(ob: MatCheckboxChange) {
    console.log("lemitization checked: " + ob.checked);
    this.lemmitizationCheck = ob.checked

    if (this.lemmitizationCheck == true) {
      this.preprocesingChecks.push('lemitization')
    }
    else {
      this.preprocesingChecks = this.preprocesingChecks.filter(function (item) {
        return item.indexOf('lemitization') === -1;
      });
    }

  }

  hashes(ob: MatCheckboxChange) {
    console.log("hashes checked: " + ob.checked);
    this.hashesCheck = ob.checked

    if (this.hashesCheck == true) {
      this.preprocesingChecks.push('hashes')
    }
    else {
      this.preprocesingChecks = this.preprocesingChecks.filter(function (item) {
        return item.indexOf('hashes') === -1;
      });
    }

  }


  numeronyms(ob: MatCheckboxChange) {
    console.log("numeronyms checked: " + ob.checked);
    this.numeronymsCheck = ob.checked

    if (this.numeronymsCheck == true) {
      this.preprocesingChecks.push('numeronyms')
    }
    else {
      this.preprocesingChecks = this.preprocesingChecks.filter(function (item) {
        return item.indexOf('numeronyms') === -1;
      });
    }

  }


  htmlEntities(ob: MatCheckboxChange) {
    console.log("htmlEntities checked: " + ob.checked);
    this.htmlEntitiesCheck = ob.checked

    if (this.htmlEntitiesCheck == true) {
      this.preprocesingChecks.push('htmlEntities')
    }
    else {
      this.preprocesingChecks = this.preprocesingChecks.filter(function (item) {
        return item.indexOf('htmlEntities') === -1;
      });
    }

  }


  all(ob: MatCheckboxChange) {
    console.log("all checked: " + ob.checked);
    this.allStepsCheck = ob.checked
    this.stopWordsCheck = ob.checked;
    this.lemmitizationCheck = ob.checked;
    this.hashesCheck = ob.checked;
    this.numeronymsCheck = ob.checked;
    this.htmlEntitiesCheck = ob.checked;

    if (this.allStepsCheck == true) {
      this.preprocesingChecks.push('all')
    }
    else {
      this.preprocesingChecks = this.preprocesingChecks.filter(function (item) {
        return item.indexOf('all') === -1;
      });
    }

  }

  mlModel: string;
  tech: string;
  evalMat: String

  chooseModel(val) {
    console.log(val);
    this.mlModel = val
  }

  chooseEvalMat(val) {
    console.log(val);
    this.evalMat = val
  }
  chooseTech(val) {
    console.log(val);
    this.tech = val
  }

  switchViews(vName: string) {
    this.currentDiv = vName

  }

  validateFeatures() {
    if (this.selectedFeatures == null || this.selectedFeatures.length == 0) {
      this.showNoti('Please choose features')
    }
    else if (this.selectedFeatures.length > 1) {
      this.showNoti('choose only 1 feature or select all features')
    }
    else {
      this.featureSelected = true
      this.currentDiv = 'preprocessing'
    }

  }

  validatePreprocessing() {
    if (this.preprocesingChecks == null || this.preprocesingChecks.length == 0) {
      this.showNoti('please choose preprocessing steps')
    }
    else {
      this.preprocessing = true
      this.currentDiv = 'mlmodel'
    }
  }

  valModel() {
    if (!this.evalMat || !this.mlModel || !this.tech) {
      this.showNoti('Choose model along with evaluation metrics and validation technique')
    }
    else {
      this.train()
      this.showNoti('Training model in progress, Time depends upon features')
      this.modelSelected = true
      // this.currentDiv = 'results'
    }


  }

  res: any;

  train() {
    this.spin = true
    if (this.tech == 'holdout') {
      if (this.allCheck == true) {

        this.showNoti('all features choosed')
        const url = 'http://localhost:5000/features/' + this.mlModel + '/all/' + this.tech

        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'

        }))

      }
      else if (this.bertCheck == true) {
        this.showNoti('bert chosed')
        const url = 'http://localhost:5000/features/' + this.mlModel + '/' + this.selectedFeatures[0] + '/' + this.tech
        //   this.showNoti('api url-->' + url)
        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'
        }))

      }
      else if (this.doc2vecCheck == true) {
        const url = 'http://localhost:5000/features/' + this.mlModel + '/' + this.selectedFeatures[0] + '/' + this.tech
        //   this.showNoti('api url-->' + url)
        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'
        }))

        this.showNoti('doc2vec choosed')
      }
      else if (this.word2vecCheck == true) {
        this.showNoti('word2vec choosed')
        const url = 'http://localhost:5000/features/' + this.mlModel + '/' + this.selectedFeatures[0] + '/' + this.tech
        //   this.showNoti('api url-->' + url)
        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'
        }))

      }
      else if (this.polarCheck == true) {
        this.showNoti('polarity choosed')
        const url = 'http://localhost:5000/features/' + this.mlModel + '/' + this.selectedFeatures[0] + '/' + this.tech
        //   this.showNoti('api url-->' + url)
        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'
        }))

      }
      else if (this.tfidfCheck == true) {
        this.showNoti('tfidf choosed')
        const url = 'http://localhost:5000/features/' + this.mlModel + '/' + this.selectedFeatures[0] + '/' + this.tech
        //   this.showNoti('api url-->' + url)
        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'
        }))

      }
      else if (this.puncCheck == true) {
        this.showNoti('puncs choosed')
        const url = 'http://localhost:5000/features/' + this.mlModel + '/' + this.selectedFeatures[0] + '/' + this.tech
        //   this.showNoti('api url-->' + url)
        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'
        }))

      }
      else if (this.subjCheck == true) {
        this.showNoti('sobj choosed')
        const url = 'http://localhost:5000/features/' + this.mlModel + '/' + this.selectedFeatures[0] + '/' + this.tech
        //   this.showNoti('api url-->' + url)
        this.http.get(url).subscribe((data: any) => {
          console.log(data)
          this.res = data
          this.spin = false
          this.currentDiv = 'results'

        }, (() => {
          this.showNoti('Something went wrong!!!')
          this.spin = false
          this.currentDiv = 'features'
        }))

      }
      else {
        this.showNoti('please check features before preceding!!')
        this.currentDiv = 'features'
        this.spin = false
      }

    }
    else {
      this.http.post('http://localhost:5000/features/10foldcross', { mlModel: this.mlModel, featureName: this.selectedFeatures[0] }).subscribe((resp: any) => {
        this.res = resp
        this.spin = false
        this.currentDiv = 'results'

      }, (() => {
        this.showNoti('Something went wrong!!!')
        this.spin = false
        this.currentDiv = 'features'
      }))

    }

  }

  saveModel() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.res.model_url);
    link.setAttribute('download', `products.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }



  saveCloud() {
    for (var i = 0; i < this.preprocesingChecks.length; i++) {
      this.temp = this.temp + '+' + this.preprocesingChecks[i]
    }

    if (this.tech == 'crossval') {
      const timestamp = Date.now()
      const features = this.selectedFeatures[0]
      const preprocessingSteps = this.temp
      const modelURL = this.res.model_url
      const modelPath = this.res.path
      const choosedEvalMatrix = this.evalMat
      const accuracy = this.res.accuracy
      const modelName = this.mlModel
      const trainingMethod = this.tech
      const datasetName = 'Trip Advisor Dataset'
      this.firestore.collection('HotelRecommendationFyp').add({
        timestamp, features, preprocessingSteps, modelPath, modelURL, choosedEvalMatrix, modelName, trainingMethod, datasetName,
        accuracy
      }).then(d => {
        const docID = d.id
        this.firestore.collection('HotelRecommendationFyp').doc(d.id).update({
          docID
        }).then(() => {
          this.showNoti('Model Successfully Saved')
        })
      })
    }
    else {
      const timestamp = Date.now()
      const features = this.selectedFeatures[0]
      const preprocessingSteps = this.temp
      const modelURL = this.res.model_url
      const modelPath = this.res.path
      const choosedEvalMatrix = this.evalMat
      const accuracy = this.res.accuracy
      const precision = this.res.precision
      const recall = this.res.recall
      const f1Measure = this.res.f1
      const modelName = this.mlModel
      const trainingMethod = this.tech
      const datasetName = 'Trip Advisor Dataset'
      this.firestore.collection('HotelRecommendationFyp').add({
        timestamp, features, preprocessingSteps, modelPath, modelURL, choosedEvalMatrix, modelName, trainingMethod, datasetName,
        accuracy, precision, recall, f1Measure
      }).then(d => {
        const docID = d.id
        this.firestore.collection('HotelRecommendationFyp').doc(d.id).update({
          docID
        }).then(() => {
          this.showNoti('Model Successfully Saved')
        })
      })
    }
  }
  temp: string

  showNoti(message) {
    this.snackBar.open(message, '', {
      panelClass: ['blue-snackbar'],
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });

  }

  ngOnInit(): void {

    // console.log((10/100)*100).toFixed(2));

    // this.temp='0'
    // for (var i = 0; i < this.array.length; i++) {
    //   this.temp = this.temp + ',' + this.array[i]
    // }
    // console.log('temo=--',this.temp)
    // // this.viewDataset('')
  }

}
