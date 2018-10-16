export class Group {
    id: number;
    droit_bar_dev: string;
    droit_edit: string;
    droit_dev: string;
    Access_MonCompte: string;
    name: string;
    UserManagement: string;
    SelectedUserManagement: string;

    constructor() {
      this.id = null,
      this.name = null,
      this.droit_bar_dev = "0",
      this.droit_dev = "0",
      this.droit_edit = "O",
      this.Access_MonCompte = "0",
      this.UserManagement = "0",
      this.SelectedUserManagement = "0"
    }
  }