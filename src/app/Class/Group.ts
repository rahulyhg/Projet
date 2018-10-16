export class Group {
    id: number;
    droit_bar_dev: string;
    droit_edit: string;
    droit_dev: string;
    Access_MonCompte: string;
    name: string;

    constructor() {
      this.id = null,
      this.name = null,
      this.droit_bar_dev = "0",
      this.droit_dev = "0",
      this.droit_edit = "O",
      this.Access_MonCompte = "0"
    }
  }