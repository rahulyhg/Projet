import { Group } from './Group'; 

export interface User {
  id: number
  login: string
  password: string
  group: Group
  picture: string
  log: string
  connection: Date
  inscription: Date
}