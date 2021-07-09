export class UserLogged {
    id?: number;
    userType: string = "";

    firstName?: string = "";
    lastName?: string = "";
    cnp?: string = "";
    birthday?: string = "";
    gender?: string = "";

    clinicName?: string = "";
    authorizationCode?: string = "";

    streetAddress: string = "";
    numberAddress: string = "";
    city: string = "";
    postalCode: string = "";
    phone: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";

    appointmentsId?: [
        {id: number}
    ];

    specialities?: {
        name?: string,
        description?: string,
        doctors?: [
            {
                name?: string,
                description?: string
            }
        ]
    }[] = [];

}

