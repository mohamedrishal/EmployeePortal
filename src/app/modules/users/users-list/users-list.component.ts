import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../users.model';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent  implements OnInit{

  searchKey:string=""
  allUsers:UserModel[]=[]

  adminLoginTime = new Date()

  p: number = 1;
  // collection: any[] = this.getallusers(); 

  constructor(private api:UserApiService){}



  // 
  ngOnInit(): void {

    this.getallusers()
    
  }

  getallusers(){
    console.log('inside All users');

    this.api.getAllUserAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUsers = res
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
    
  }

  removeUser(id:any){
    this.api.deleteUserAPI(id).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('User Removed Successfully...')
          this.getallusers()
        },
        error:(err:any)=>{
          alert(err.message)
        }

    })
  }

  sortByID(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatePDF(){
    let pdf = new jspdf()
    let head = [['Id','Username','Email','Status']]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })

    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslist.pdf')
  }

   
  
  

}
