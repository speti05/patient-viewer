import { Gender } from "./gender";

export interface Patient {
    id: number;
    name: string;
    gender: Gender;
    // gender: string; // TODO: AFTER JSONREASING, CHANGE TO GENDER TYPE
    dateOfBirth: string;
}