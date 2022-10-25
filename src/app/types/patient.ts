import { Gender } from "./gender";

export interface Patient {
    id: number;
    name: string;
    gender: Gender;
    dateOfBirth: string;
}