import PatientModal from './Patient-1';
import MedHistoryModal from './Patient-2';


export const modals = {
    new_patient: PatientModal,
    new_patient_2: MedHistoryModal,

    /* ...other modals */
  };
  declare module '@mantine/modals' {
    export interface MantineModalsOverride {
      modals: typeof modals;
    }
  }