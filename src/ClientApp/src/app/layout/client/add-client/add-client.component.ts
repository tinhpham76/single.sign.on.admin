import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { MessageConstants } from '@app/shared/constants/messages.constant';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientServices } from '@app/shared/services/clients.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  // Spin
  public isSpinning: boolean;

  // Init form
  public validateForm!: FormGroup;

  // Api upload file url
  public api_upload = (`${environment.api_url}/api/files/upload`);

  // Tags
  public tags = [
    {
      icon: '🗋',
      description: 'Empty',
      type: 'Default',
      check: 'true',
      clientType: 'empty'
    },
    {
      icon: '🖥️',
      description: 'Web App - Server Side (MVC)',
      type: 'Authorization Code Flow',
      check: 'false',
      clientType: 'web_app_authorization_code'
    },
    {
      icon: '🖥️️',
      description: 'Web App - Server Side (MVC)',
      type: 'Hybrid Flow',
      check: 'false',
      clientType: 'web_app_hybrid'
    },
    {
      icon: '💻',
      description: 'SPA - Single Page Application (e.g Angular, Blazor)',
      type: 'Authorization Code Flow',
      check: 'false',
      clientType: 'spa'
    },
    {
      icon: '📱',
      description: 'Native Application - Mobile / Desktop',
      type: 'Authorization Code Flow',
      check: 'false',
      clientType: 'native'
    },
    {
      icon: '🖥️️',
      description: 'Server',
      type: 'Client Credentials flow',
      check: 'false',
      clientType: 'server'
    },
    {
      icon: '📺',
      description: 'Devices - TVs, gaming consoles, printers, cash registers, audio appliances etc',
      type: 'Device Flow',
      check: 'false',
      clientType: 'device'
    },
  ];

  // Logo uri
  public logo = '';

  // Type client
  public clientType = 'empty';

  constructor(
    private fb: FormBuilder,
    private clientServices: ClientServices,
    private notification: NzNotificationService,
    private router: Router,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    // Form add client
    this.validateForm = this.fb.group({
      clientName: [null, [Validators.required]],
      description: [null],
      clientUri: [null, [Validators.required]],
      logoUri: [null]
    });
  }

  // Event add file
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.logo = (`${environment.api_url}${info.file.response.filePath}`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  // Validator
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  // Create new client
  submitForm(): void {
    this.isSpinning = true;
    if (this.validateForm.get('clientName').value === '' ||
      this.validateForm.get('clientUri').value === '') {
      this.createNotification(
        MessageConstants.TYPE_NOTIFICATION_SUCCESS,
        MessageConstants.TITLE_NOTIFICATION,
        MessageConstants.NOTIFICATION_ERROR,
        'bottomRight'
      );
      this.isSpinning = false;
    } else {
      const data = {
        clientName: this.validateForm.get('clientName').value,
        description: this.validateForm.get('description').value,
        clientUri: this.validateForm.get('clientUri').value,
        logoUri: this.validateForm.get('logoUri').value,
        clientType: this.clientType
      };
      this.clientServices.add(data)
        .subscribe(() => {
          this.createNotification(
            MessageConstants.TYPE_NOTIFICATION_SUCCESS,
            MessageConstants.TITLE_NOTIFICATION,
            MessageConstants.NOTIFICATION_ADD,
            'bottomRight'
          );
          setTimeout(() => {
            this.router.navigate(['/clients']);
            this.isSpinning = false;
          }, 500);
        }, errorMessage => {
          this.createNotification(
            MessageConstants.TYPE_NOTIFICATION_ERROR,
            MessageConstants.TITLE_NOTIFICATION,
            errorMessage,
            'bottomRight'
          );
          setTimeout(() => {
            this.isSpinning = false;
          }, 500);
        });
    }

  }

  checkChange(e: boolean, description: string, clientType: string): void {
    if (e === true) {
      for (let i = 0; i < this.tags.length; i++) {
        if (!(this.tags[i].description === description && this.tags[i].clientType === clientType)) {
          this.tags[i].check = 'false';
        } else {
          this.tags[i].check = 'true';
          this.clientType = clientType;
        }
      }
    } else if (e === false) {
      if (clientType === 'empty') {
        this.tags = [
          {
            icon: '🗋',
            description: 'Empty',
            type: 'Default',
            check: 'true',
            clientType: 'empty'
          },
          {
            icon: '🖥️',
            description: 'Web App - Server Side (MVC)',
            type: 'Authorization Code Flow',
            check: 'false',
            clientType: 'web_app_authorization_code'
          },
          {
            icon: '🖥️️',
            description: 'Web App - Server Side (MVC)',
            type: 'Hybrid Flow',
            check: 'false',
            clientType: 'web_app_hybrid'
          },
          {
            icon: '💻',
            description: 'SPA - Single Page Application (e.g Angular, Blazor)',
            type: 'Authorization Code Flow',
            check: 'false',
            clientType: 'spa'
          },
          {
            icon: '📱',
            description: 'Native Application - Mobile / Desktop',
            type: 'Authorization Code Flow',
            check: 'false',
            clientType: 'native'
          },
          {
            icon: '🖥️️',
            description: 'Server',
            type: 'Client Credentials flow',
            check: 'false',
            clientType: 'server'
          },
          {
            icon: '📺',
            description: 'Devices - TVs, gaming consoles, printers, cash registers, audio appliances etc',
            type: 'Device Flow',
            check: 'false',
            clientType: 'device'
          },
        ];
        this.clientType = clientType;
      } else {
        for (let i = 0; i < this.tags.length; i++) {
          this.tags[i].check = 'false';
          this.tags[0].check = ' true';
          this.clientType = 'empty';
        }
      }
    }
  }

  // Notification
  createNotification(type: string, title: string, content: string, position: NzNotificationPlacement): void {
    this.notification.create(type, title, content, { nzPlacement: position });
  }
}