import { BankService } from './../../../core/services/main/bank.service';
import { Component, EventEmitter, Output } from '@angular/core';

import { FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { Bank } from 'src/app/core/models/entity/bank.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';


export interface PersonalForm {
  fullName: string;
  age: number;
  dni: string;
  bank: number;
  selectedBank: number;
  selectedBankColor: string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})



export class PersonalComponent {

  banks: Bank[] = [
    {
      id: 1,
      name: 'Interbank'
    },
    {
      id: 2,
      name: 'BCP'
    }
  ]

  fullNameFormGroup = this._formBuilder.group({
    fullNameForm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z ]*$')]],
  });
  ageFormGroup = this._formBuilder.group({
    ageForm: [0, [Validators.required, Validators.min(18), Validators.max(99), Validators.pattern('^[0-9]*$')]],
  });
  dniFormGroup = this._formBuilder.group({
    dniForm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
  });
  bankFormGroup = this._formBuilder.group({
    bankForm: [0, [Validators.required]],
  });
  condicion = false;

  @Output() personalDataComplete = new EventEmitter<PersonalForm>();


  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }


  onPersonalDataComplete() {
    if (this.fullNameFormGroup.invalid || this.ageFormGroup.invalid || this.dniFormGroup.invalid || this.bankFormGroup.invalid) {
      return;
    }
    let personalData = {
      fullName: this.fullNameFormGroup.get('fullNameForm')?.value,
      age: this.ageFormGroup.get('ageForm')?.value,
      dni: this.dniFormGroup.get('dniForm')?.value,
      bank: this.bankFormGroup.get('bankForm')?.value,
      selectedBank: this.selectedBank,
      selectedBankColor: this.selectedBankColor,
    } as PersonalForm;
    this.personalDataComplete.emit(personalData);
  }

  selectedBank: number = 1;
  selectedBankColor: string = ' #00337c';

  onBankChange(event: any) {
    this.selectedBank = event.value;
    if (this.selectedBank === 2) {
      this.selectedBankColor = ' #00337c';
      this.condicion = true;
    } else if (this.selectedBank === 1) {
      this.selectedBankColor = '#04bf50';
      this.condicion = false;
    }
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  goToSavedLoan(): void{
    this.router.navigate(['/saved-loan']);
  }

  ngOnInit(): void {
    this.getBanks()
  }

  getBanks() {

  }

}

