export class ClinicModel {
    id?: number;
    userType: string = "";
    clinicName: string = "";
    authorizationCode: string = "";
    streetAddress: string = "";
    numberAddress: string = "";
    city: string = "";
    postalCode: string = "";
    phone: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    specialities?: {
        id:number,
        name: string,
        description: string,
        doctors?: [
            {
                id: number,
                name: string,
                description: string
            }
        ]
    }[] = [];
}