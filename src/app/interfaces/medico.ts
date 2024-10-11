import { Endereco } from "./endereco"

export interface Medico {
    id:number
    nome:string
    email:string
    crm:string
    especialidade:string
    endereco:Endereco
}