export class Lote {
  id: number;
  nome: string;
  preco: number;
  dataInicio?: Date;
  dataFim?: Date;
  quantidade: number;
  eventoId: number;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.preco = 0;
    this.dataInicio = new Date();
    this.dataFim = new Date();
    this.quantidade = 0;
    this.eventoId = 0;
  }
}
