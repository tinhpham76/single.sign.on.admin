import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IdentityResourceServices } from '@app/shared/services/identity-resources.service';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { MessageConstants } from '@app/shared/constants/messages.constant';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-identity-resource',
  templateUrl: './identity-resource.component.html',
  styleUrls: ['./identity-resource.component.scss']
})
export class IdentityResourceComponent implements OnInit {

  // Load identity data
  public filter = '';
  public pageIndex = 1;
  public pageSize = 10;
  public items: any[];
  public totalRecords: number;
  public name: string;

  // Spin
  public isSpinning: boolean;

  // Modal
  public confirmDeleteModal?: NzModalRef;

  // Search value
  public searchValue = '';

  constructor(
    private identityResourceServices: IdentityResourceServices,
    private notification: NzNotificationService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    // Load identity data
    this.loadIdentityData(this.filter, this.pageIndex, this.pageSize);
  }

  // Event change page
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.loadIdentityData(this.searchValue, pageIndex, pageSize);
  }

  // Event search
  handleInputConfirm(): void {
    this.loadIdentityData(this.searchValue, this.pageIndex, this.pageSize);
  }

  // Load identity data
  loadIdentityData(filter: string, pageIndex: number, pageSize: number): void {
    this.isSpinning = true;
    this.identityResourceServices.getAllPaging(filter, pageIndex, pageSize)
      .subscribe(res => {
        this.items = res.items;
        this.totalRecords = res.totalRecords;
        setTimeout(() => {
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

  // Delete identity resource
  delete(name: string) {
    this.isSpinning = true;
    this.identityResourceServices.delete(name)
      .subscribe(() => {
        this.createNotification(
          MessageConstants.TYPE_NOTIFICATION_SUCCESS,
          MessageConstants.TITLE_NOTIFICATION,
          MessageConstants.NOTIFICATION_DELETE,
          'bottomRight'
        );
        this.ngOnInit();
        setTimeout(() => {
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

  showDeleteConfirm(name: string): void {
    this.confirmDeleteModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete identity resource?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.delete(name);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 200);
        })
    });
  }

  // Notification
  createNotification(type: string, title: string, content: string, position: NzNotificationPlacement): void {
    this.notification.create(type, title, content, { nzPlacement: position });
  }
}
