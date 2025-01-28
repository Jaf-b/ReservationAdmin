import { AbstractControl, FormControl } from '@angular/forms';

export const mindate = (control: AbstractControl) => {
  const ControlValue = control.value;
  const controlDate = new Date(ControlValue);
  const today = new Date();
  let retour: any = null;

  if (today.getFullYear() > controlDate.getFullYear()) {
    retour = { mindate: true };
  } else if (today.getMonth() > controlDate.getMonth()) {
    retour = { mindate: true };
  } else if (today.getFullYear() === controlDate.getFullYear()) {
    console.log('yes');

    if (today.getMonth() === controlDate.getMonth()) {
      if (today.getDate() >= controlDate.getDate()) {
        retour = { mindate: true };
      }
    }
  }
  return retour;
};
