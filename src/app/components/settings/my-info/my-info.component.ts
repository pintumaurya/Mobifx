import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ApiService } from '../../..//services/api.service';
import { CommonToasterService } from '../../../../app/services/common-toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../providers/CustomValidators';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
