export class CreateUserDto {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly identification: string;
    readonly role: string;
    readonly state: string;
}