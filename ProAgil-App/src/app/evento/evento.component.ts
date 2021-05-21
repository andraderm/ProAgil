import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  public eventos: Evento[];
  public imagemLargura: number;
  public imagemMargem: number;
  public mostrarImagem: boolean;
  public eventosFiltrados: Evento[];
  public modalRef: BsModalRef;

  public _filtroLista: string;

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService
  ) {
    this.eventos = new Array<Evento>();
    this.imagemLargura = 58;
    this.imagemMargem = 2;
    this.mostrarImagem = false;
    this._filtroLista = '';
    this.eventosFiltrados = new Array<Evento>();
    this.modalRef = new BsModalRef();
  }

  ngOnInit() {
    this.getEventos();
  }

  private getEventos() {
    this.eventoService.getAll().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = _eventos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  public alternarImage(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
}
