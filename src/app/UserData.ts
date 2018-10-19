import { User } from './Class/User';
import { GROUP } from './GroupData';

export const USER: User[] = [
    {
        id: 1,
        login: "default",
        password: "c21f969b5f03d33d43e04f8f136e7682",
        group: GROUP[0], 
        profile: "default.jpg",
        statut: false, 
        date_time_logIn: "2000-01-01 01:01:01", 
        date_time_signIn: "2000-01-01 01:01:01",
        gameTag: "@default", 
        name: "default", 
        firstName: "default", 
        birthDate: "2000-01-01"
    },
    { 
        id: 2,
        login: "dev",
        password: "b22f2a7814d6e43374cea98ff1e824be",
        group: GROUP[1], 
        profile: "dev.jpg",
        statut: true, 
        date_time_logIn: "2018-10-18 11:49:48", 
        date_time_signIn: "2018-10-15 18:38:01",
        gameTag: "@dov118", 
        name: "Kévin", 
        firstName: "Carlier", 
        birthDate: "1997-11-17"
    },
];