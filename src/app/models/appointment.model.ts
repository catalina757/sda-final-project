export class AppointmentModel {
    id?: number;
    specialty: string = "";
    date: string = "";
    time: string = "";
    clinicId!: number;
    patientId!: number;
}