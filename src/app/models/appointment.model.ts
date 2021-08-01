import {UserLogged} from './user-logged.model';

export class AppointmentModel extends UserLogged{
    id?: number;
    specialty: string = "";
    date: string = "";
    time: string = "";
    clinicId!: number;
    patientId!: number;
}