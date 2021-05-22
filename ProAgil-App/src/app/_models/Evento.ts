import { Lote } from './Lote';
import { RedeSocial } from './RedeSocial';
import { Palestrante } from './Palestrante';

export class Evento {
  id: number;
  local: string;
  dataEvento: Date;
  tema: string;
  qtdPessoas: number;
  imagemURL: string;
  telefone: string;
  email: string;
  lotes: Lote[];
  redesSociais: RedeSocial[];
  palestrantesEventos: Palestrante[];

  constructor() {
    this.id =  0;
    this.local = '';
    this.dataEvento = new Date();
    this.tema = '';
    this.qtdPessoas = 0;
    this.imagemURL = '';
    this.telefone = '';
    this.email = '';
    this.lotes = new Array<Lote>();
    this.redesSociais = new Array<RedeSocial>();
    this.palestrantesEventos = new Array<Palestrante>();
  }
}
