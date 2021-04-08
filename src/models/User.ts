import {IUser} from "../types/interfaces";


export class User implements IUser {
    email: string;
    name: string;
    password: string;
    avatarUrl: string;
    gender: string;
    ageRange: string;
    role: string;

    constructor(email: string,
                name: string,
                password?: string,
                avatarUrl?: string,
                gender?: string,
                ageRange?: string,
                role?: string) {
        this.email = email ? email : '';
        this.name = name ? name : '';
        this.password = password ? password : '';
        this.avatarUrl = avatarUrl ? avatarUrl : '';
        this.gender = gender ? gender : '';
        this.ageRange = ageRange ? ageRange : '';
        this.role = role ? role : '';
    }

    values(): any[] {
        return Object.values(this);
    }
}