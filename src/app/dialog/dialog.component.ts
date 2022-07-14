import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  etatRendezVous= ["En Cours", "Annuler"];
  cliniqueForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(
    private formBuilder: FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.cliniqueForm = this.formBuilder.group({
      nomComplet : ['',Validators.required],
      numeroPatient : ['',Validators.required],
      typePrestation : ['',Validators.required],
      etatRendezVous : ['',Validators.required],
      nomMedecin : ['',Validators.required],
      nomMedicament : ['',Validators.required],
      date : ['',Validators.required],
    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.cliniqueForm.controls['nomComplet'].setValue(this.editData.nomComplet);
      this.cliniqueForm.controls['numeroPatient'].setValue(this.editData.numeroPatient);
      this.cliniqueForm.controls['typePrestation'].setValue(this.editData.typePrestation);
      this.cliniqueForm.controls['etatRendezVous'].setValue(this.editData.etatRendezVous);
      this.cliniqueForm.controls['nomMedecin'].setValue(this.editData.nomMedecin);
      this.cliniqueForm.controls['nomMedicament'].setValue(this.editData.nomMedicament);
      this.cliniqueForm.controls['date'].setValue(this.editData.date);
    }

  }
  addRendezVous(){
   if(!this.editData){
    if(this.cliniqueForm.valid){
      this.api.postClinique(this.cliniqueForm.value)
      .subscribe({
        next:(res) => {
          alert("Rendez-Vous Cree avec Succes");
          this.cliniqueForm.reset();
          this.dialogRef.close("save");
        },
        error:()=>{
          alert("Error while adding the Rendez-Vous")
        }
      })
    }
   }else{
    this.updateRendezVous()
   }
  }
  updateRendezVous(){
    this.api.putRendezVous(this.cliniqueForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Rendez-Vous updated Successfully!")
        this.cliniqueForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('Error while updating the data !!!')
      }
    })
  }

}
