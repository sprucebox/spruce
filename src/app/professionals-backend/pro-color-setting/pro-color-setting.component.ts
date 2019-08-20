import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreateaccountService } from '../../createaccount.service';
import { AppComponent } from '../../app.component';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pro-color-setting',
  templateUrl: './pro-color-setting.component.html',
  styleUrls: ['./pro-color-setting.component.css']
})
export class ProColorSettingComponent implements OnInit {
  remove_user_id:any;
   select_permissions:any;
  
  is_default:any;
  modeldisplay2:any=false;
  applyback:any=false;
  public color1: string = '';
  public color2: string = '';
  public color3: string = '';
    public color4: string = '';
  allcolor:any;
  status_id:any;
  err_message:boolean = true;
  disablebutton:boolean = false;
 All_status:any;
modeldisplay:any=false;
   
   modeldisplay1:any=false;
  addstatus = {
    status : '',
    color : '',
  };
 updatestatus = {
    status : '',
    color : '',
  };
  constructor(private _CreateaccountService:CreateaccountService,private _router : Router,private _ProjectService:ProjectService,private toastr: ToastrService,private _app: AppComponent,public vcRef: ViewContainerRef, private cpService: ColorPickerService) { }
  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);


  public onChangeColor(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    const rgba = this.cpService.hsvaToRgba(hsva);


    console.log(color);
     console.log(rgba);

    return this.cpService.rgbaToCmyk(rgba);
  }
  public onChangeColor1(color1: string): Cmyk {
    const hsva1 = this.cpService.stringToHsva(color1);

    const rgba1 = this.cpService.hsvaToRgba(hsva1);


    console.log(color1);
     console.log(rgba1);

    return this.cpService.rgbaToCmyk(rgba1);
  }
  public onChangeColor2(color2: string): Cmyk {
    const hsva2 = this.cpService.stringToHsva(color2);

    const rgba2 = this.cpService.hsvaToRgba(hsva2);


    console.log(color2);
     console.log(rgba2);

    return this.cpService.rgbaToCmyk(rgba2);
  }
  update_color_detail()
  {
   
    const data3 = {
      taskcolor :this.color1,
      eventcolor :this.color2,
      meetingcolor :this.color3,
  
    }
    console.log(data3);
      this._CreateaccountService.update_color_detail(data3)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('Date Updated', 'success');
         
          this._app.loading = false;
          
     },
     err =>{ this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
      }

      );
  
  }
 
  
  ngOnInit() {
	 this.get_status_data();
    this.get_color_data();
    this.select_permissions = localStorage.getItem('permissions');
  }
  get_color_data(){
    
    this._CreateaccountService.get_color_data()
    .subscribe(
      res => {
        console.log(res.data);
        if(res){
        this.color1 = res.data[0].taskcolor;
        this.color2=  res.data[0].eventcolor;
        this.color3=  res.data[0].meetingcolor;
        }
      else 
      {
       this.color1 = '#FFFF00';
       this.color2 = '#20B2AA';
       this.color3 ='#800080';
        }
      },
      err =>{ this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }
showmodel(){
    this.modeldisplay=true;
    this.applyback = true; 
	
  }
  hidemodel(){
    this.modeldisplay=false;
    this.applyback = false; 
  }
  showmodel1(id){
    this.modeldisplay1=true;
    this.applyback = true; 
	this.status_id = id;
	console.log(this.status_id);
  }
  hidemodel1(){
    this.modeldisplay1=false;
    this.applyback = false; 
  }
  update_new_statusname()
  {
   const data = {
	   id:this.status_id,
      color :this.color4,
      status:this.updatestatus.status,
  
    }
     console.log(data);
    console.log("mayuri");
   this._CreateaccountService.update_new_statusname(data)
    .subscribe(
      res => {
        console.log(res.data);
      
        this.toastr.success('status updated', 'success');
       this.get_status_data();
      },
      err => {
       
        this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
      },
    );

  }
  get_statusname_data(id)
  {
  const data = {
     id:id,
      
    }
	console.log(data);
	this._CreateaccountService.get_statusname_data(data)
      .subscribe(
        res => {
			
          console.log(res.data);
		  
        this.updatestatus.status=res.data[0].status;
		
          this.color4=  res.data[0].color_class;
		  this.is_default=res.data[0].is_default
          this._app.loading = false;
         console.log(this.updatestatus.status);
		 console.log(this.color4);
     },
     err =>{
      this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
      }

      );
  }

  delete_status_data(id){
    this.remove_user_id =id;
    this.modeldisplay2=true;
    this.applyback=true;
  }
  hidemodel2(){ this.modeldisplay2=false;}
  remove_user(id){

    this._app.loading = true;
    const data ={
      id:id,
     
    }
    this._CreateaccountService.delete_status_data(data)
    .subscribe(
      res => {
        console.log(res);
        this.get_status_data();
        this._app.loading = false;
        this.modeldisplay2=false;
        this.applyback=false;
        
      },
      err =>{
        this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }
  
  get_status_data(){
    
    this._CreateaccountService.get_status_data()
    .subscribe(
      res => {
        console.log(res.data);
         this.All_status = res.data;
      
      },
      err =>{
         this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }
  create_new_status()
  {
   
    const data = {
      color :this.color4,
      status:this.addstatus.status,
  
    }
    console.log(data);
      this._CreateaccountService.create_new_status(data)
      .subscribe(
        res => {
			this._app.loading = false;
          console.log(res);
		  
			 
          this.toastr.success('Date insert', 'success');
         this.get_status_data();
		  
          
     },
     err =>{
       this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
      }

      );
  
  }
  check_unique_task_status($event)
  {
	  const data = {
        status:this.addstatus.status,
      }
	  this.addstatus.status;
	  console.log(this.addstatus.status);
	   this._ProjectService.check_unique_task_status(data)
      .subscribe(
        res => {
			console.log(res);
if (res.check)
{
	
	this.err_message=true;
	this.disablebutton=false;
}
else{
	
	this.err_message=false;
	this.disablebutton=true;
}
		  
          
     },
      err => console.log(err)

      );
  }
  check_unique_updatetask_status($event)
  {
	  const data = {
        status:this.updatestatus.status,
      }
      console.log(data);
	  this.updatestatus.status;
	  console.log(this.updatestatus.status);
	   this._ProjectService.check_unique_updatetask_status(data)
      .subscribe(
        res => {
			console.log(res);
if (res.check)
{
	
	this.err_message=true;
	this.disablebutton=false;
}
else{
	
	this.err_message=false;
	this.disablebutton=true;
}
		  
          
     },
     err =>{
     this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
      }

      );
  }
}
