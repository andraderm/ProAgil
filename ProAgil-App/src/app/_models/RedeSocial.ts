export class RedeSocial {
  id: number;
  nome: string;
  URL: string;
  eventoId?: number;
  palestranteId?: number;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.URL = '';
    this.eventoId = 0;
    this.palestranteId = 0;
  }
}