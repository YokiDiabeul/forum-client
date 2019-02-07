import {Component} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    // uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };


  htmlContent: string;

  constructor() {}

}
