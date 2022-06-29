import { Component, Input, OnInit } from '@angular/core';
import { ManageService } from './manage.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ManageService]
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  @Input()
  resultSearch: string | undefined;
  @Input()
  msg: string | undefined;
  @Input()
  mail: string | undefined;


  register= {
    email: '',
    username:'',
    matricul: ''
  } ;
  founduser={email: '',
  username:'',
  matricul: ''};
  
  constructor(private manageService:ManageService){

  }
isFound=false
  testFind(){
    if (this.founduser.matricul) return true;
    else return false;
  }
  

  ngOnInit() {
    this.register={
      email: '',
      username:'',
      matricul:''
    }
    this.resultSearch=''
  }
 
  clickAjout(){
   this.manageService.registerUser(this.register).subscribe();
   try {
    this.resultSearch='user is created';
   } catch (error) {
    console.log(this.register)
    console.log(error);
   }
  }
  clickChercher(){
    this.manageService.findUser().subscribe((data)=>{
    const search=data.find((person: any)=> person.matricul==this.register.matricul);
    this.founduser=search;
    if (this.founduser.matricul) this.isFound=true; 
    if(this.isFound==true) this.resultSearch='username :' + this.founduser.username+'   email :'+this.founduser.email;
    else this.resultSearch='user not found'
  }
    
    )
   
  }
  clickEnvoyer(){
 
    this.manageService.findUser().subscribe((data)=>{
      const search=data.find((person: any)=> person.email==this.register.email || person.username==this.register.username);
      this.founduser=search;
      if (this.founduser.email) {this.isFound=true;
        this.msg='marticule : '+this.founduser.matricul;
      this.mail=this.founduser.email;
      this.manageService.SendMail(this.founduser).subscribe();
      }})
      //
      } 
      
}

