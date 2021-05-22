import { RedeSocial } from './RedeSocial';
import { Evento } from './Evento';

export class Palestrante {
  id: number;
  nome: string;
  miniCurriculo: string;
  imagemURL: string;
  telefone: string;
  email: string;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];

  constructor() {
    this.id = 0;
    this.nome = '';
    this.miniCurriculo = '';
    this.imagemURL = '';
    this.telefone = '';
    this.email = '';
    this.redesSociais = new Array<RedeSocial>();
    this.palestrantesEventos = new Array<Evento>();
  }
}
