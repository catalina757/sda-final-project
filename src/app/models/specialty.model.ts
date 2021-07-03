export class SpecialtyModel {
    name?: string = "";
    description?: string = "";
    doctors? : [
        {
            name?: string;
            description?: string;
        }
    ]
}