import { Page } from './Page';

export const PAGE: Page[] = [
    { 
        id: 1,
        title: "default",
        favicon: "favicon.ico",
        refresh: 10000,
        route: "/"
    },
    { 
        id: 2,
        title: "Accueil",
        favicon: "Accueil.ico",
        refresh: 10000,
        route: "/Accueil"
    },
    { 
        id: 3,
        title: "Login",
        favicon: "favicon.ico",
        refresh: 10000,
        route: "/Login"
    },
    { 
        id: 4,
        title: "Mon Compte",
        favicon: "MonCompte.ico",
        refresh: 10000,
        route: "/MonCompte"
    },
    { 
        id: 5,
        title: "Gestion des utilisateurs",
        favicon: "favicon.ico",
        refresh: 10000,
        route: "/UserManagement"
    },
    { 
        id: 6,
        title: "Gestion des groupes",
        favicon: "favicon.ico",
        refresh: 10000,
        route: "/GroupManagement"
    },
    { 
        id: 7,
        title: "Gestion des pages",
        favicon: "favicon.ico",
        refresh: 10000,
        route: "/PageManagement"
    }
];