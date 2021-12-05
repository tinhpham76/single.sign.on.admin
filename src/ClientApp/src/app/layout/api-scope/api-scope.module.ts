import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiScopeComponent } from './api-scope.component';
import { ApiScopeRoutingModule } from './api-scope-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { AddScopeComponent } from './add-scope/add-scope.component';
import { EditScopeComponent } from './edit-scope/edit-scope.component';
import { ScopePropertyComponent } from './scope-property/scope-property.component';

@NgModule({
  declarations: [
    ApiScopeComponent,
    AddScopeComponent,
    EditScopeComponent,
    ScopePropertyComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzTabsModule,
    NzButtonModule,
    NzDividerModule,
    NzSwitchModule,
    NzSpinModule,
    NzDescriptionsModule,
    NzNotificationModule,
    NzCardModule,
    NzCheckboxModule,
    NzButtonModule,
    NzModalModule,
    NzTagModule,
    NzToolTipModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzGridModule,
    NzDatePickerModule,
    NzFormModule,
    NzAlertModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    ApiScopeRoutingModule
  ]
})
export class ApiScopeModule { }
