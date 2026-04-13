import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogForm } from '../../../shared/components/dialog/dialog-form/dialog-form';
import { FormDailogService } from '../../../shared/components/dialog/dialog-form/service/form-dialog.service';
import { log } from 'node:console';

@Component({
    selector: 'app-task-form',
    imports: [DialogForm, ReactiveFormsModule],
    templateUrl: './add.html',
    styleUrl: './add.css',
})
export class Add {
    task = input<any>(null); // null = Add, object = Edit
    submitForm = output<any>();

    private fb = inject(FormBuilder);
    private _modal = inject(FormDailogService);

    title = computed(() => (this.task() ? 'Edit Task' : 'Add Task'));
    isEdit = computed(() => !!this.task());

    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required]],
        address: this.fb.group({
            phone: [''],
            line1: [''],
            line2: [''],
        }),
        skills: this.fb.array([]),
    });
    get arrayFormSkills() {
        return this.form.controls.skills as FormArray;
    }
    addSkill() {
        const fg = this.fb.group({
            name: [''],
            department: [''],
            amount: [''],
        });
        this.arrayFormSkills.push(fg);
        console.log('form controls =====>', this.form.controls.skills);
    }
    save(data: any) {
        console.log('data from function save ', data);
        this.submitForm.emit({ ...data, id: this.task()?.id ?? null });
        this._modal.closeModal();
        this.form.reset();
    }

    removeSkill(i: number) {
        this.arrayFormSkills.removeAt(i);
    }

    constructor() {
        effect(() => {
            const task = this.task();
            if (task) {
                this.form.patchValue({
                    name: task.name,
                    description: task.discription,
                });
            } else {
                this.form.reset();
            }
        });
    }
    
    protected readonly formControllers = [
        {
            type: 'input',
            label: 'Name',
            id: 'name',
            formControlName: 'name',
            placeholder: 'Enter name',
            validators: ['required', 'minLength:5']
        },
        {
            type: 'input',
            label: 'Description',
            id: 'description',
            formControlName: 'description',
            placeholder: 'Enter description',
            validators: ['required']
        },
        {
            type: 'group',
            key: 'address',
            label: 'Address',
            children: [
                {
                    type: 'input',
                    label: 'Phone',
                    id: 'phone',
                    formControlName: 'phone',
                    placeholder: 'Enter phone'
                },
                {
                    type: 'input',
                    label: 'Line 1',
                    id: 'line1',
                    formControlName: 'line1',
                    placeholder: 'Enter line 1'
                },
                {
                    type: 'input',
                    label: 'Line 2',
                    id: 'line2',
                    formControlName: 'line2',
                    placeholder: 'Enter line 2'
                }
            ]
        }
    ] as const;
}
