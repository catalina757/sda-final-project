import {UserLogged} from './user-logged.model';

export class ClinicModel extends UserLogged{
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