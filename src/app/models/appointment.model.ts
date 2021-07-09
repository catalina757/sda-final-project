export class AppointmentModel {
    id?: number;
    firstName: string = "";
    lastName: string = "";
    CNP: string = "";
    birthday: string = "";
    gender: string = "";
    phone: string = "";
    email: string = "";
    specialty: string = "";
    date: string = "";
    time: string = "";
    clinicId!: number;
    userLoggedId!: number;
}