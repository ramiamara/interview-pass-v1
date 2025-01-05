import { Skill } from "./skill";

export interface User {
    id: string;
    name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface UserDto {
    id: string;
    name: string;
    userType: string;
    login: string;
    email: string;
    passwordHash: string;
    dateOfBirth: Date;
    phone: string;
    skills: Skill[];
    levelOfExperience: number;
}
