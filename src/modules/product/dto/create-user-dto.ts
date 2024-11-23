export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly role: string;
    readonly state: string;
    readonly password: string;
    readonly birthdate: Date;
}