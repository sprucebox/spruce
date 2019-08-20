import { Component, OnInit } from '@angular/core';
import { config, defaultI18n, defaultOptions } from "../formbuilder/config";
import { FormBuilderCreateor } from "../formbuilder/form-builder";
import I18N from "../formbuilder/mi18n";

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';
function initJq() {
  (function ($) {
    (<any>$.fn).formBuilder = function (options) {
      if (!options) {
        options = {};
      }
      let elems = this;
      let {i18n, ...opts} = $.extend({}, defaultOptions, options, true);
      (<any>config).opts = opts;
      let i18nOpts = $.extend({}, defaultI18n, i18n, true);
      let instance = {
        actions: {
          getData: null,
          setData: null,
          save: null,
          showData: null,
          setLang: null,
          addField: null,
          removeField: null,
          clearFields: null
        },
        get formData() {
          return instance.actions.getData('json');
        },

        promise: new Promise(function (resolve, reject) {
          new I18N().init(i18nOpts).then(() => {
            elems.each(i => {
              let formBuilder = new FormBuilderCreateor().getFormBuilder(opts, elems[i]);
              $(elems[i]).data('formBuilder', formBuilder);
              instance.actions = formBuilder.actions;
            });
            delete instance.promise;
            resolve(instance);
          }).catch(console.error);
        })

      };

      return instance;
    };
  })(jQuery);
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	constructor(private fb: FormBuilder,private _app: AppComponent,private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private toastr: ToastrService) { }
addFormData = {
    form_name : '',
    };
 formBuilder: any;
getjson:any;
  ngOnInit(): void {
    initJq();
    this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder();
    console.log(this.formBuilder);
  }
showmjson()
{
 this.getjson=this.formBuilder.actions.getData('json', true);
 console.log(this.getjson);
}

ExternalSaveJson()
{console.log("mayuri");
	 const data={
      formname:this.addFormData.form_name,
	  formjson:this.formBuilder.actions.getData('json', true)
    }
	console.log(data);
	
	this._ProjectService.add_formbuilder_data(data)
      .subscribe(
        res => {
           console.log(res);
          this.toastr.success('form data add', 'success');
          this._app.loading = false;
        },
        err =>{
          this._app.loading = false;
          console.log(err);
          this._router.navigate(["/login"]);
          }
      );
}

  title = 'app';

}

