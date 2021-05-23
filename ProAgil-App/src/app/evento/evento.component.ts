import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  public title: string = 'Eventos';
  public evento: Evento;
  public eventos: Evento[];
  public imagemLargura: number;
  public imagemMargem: number;
  public maxInvites: number;
  public mostrarImagem: boolean;
  public eventosFiltrados: Evento[];
  public modalRef: BsModalRef;
  public registerForm: FormGroup;
  public bodyDeletarEvento: string;

  public _filtroLista: string;
  private saveMode: string = 'post';

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
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
  ) {
    this.evento = new Evento();
    this.eventos = new Array<Evento>();
    this.imagemLargura = 58;
    this.imagemMargem = 2;
    this.maxInvites = 120000;
    this.mostrarImagem = false;
    this.eventosFiltrados = new Array<Evento>();
    this.modalRef = new BsModalRef();
    this.registerForm = new FormGroup({});
    this.bodyDeletarEvento = '';
    
    this._filtroLista = '';

    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.validation();
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

  public editEvento(evento: Evento, template: any): void {
    this.saveMode = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  public newEvento(template: any): void {
    this.saveMode = 'post';
    this.openModal(template);
  }

  public openModal(template: any): void {
    this.registerForm.reset();
    template.show();
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

  public validation(): void {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(this.maxInvites)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public salvarAlteracao(template: any): void {
    if (this.registerForm.valid) {
      if (this.saveMode === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.post(this.evento).subscribe(() => {
          template.hide();
          this.getEventos();
          this.toastr.success("Inserido com sucesso");
        }, error => {
          console.log(error);
          this.toastr.error("Erro ao inserir");
        });
      }
      else {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.update(this.evento).subscribe(() => {
          template.hide();
          this.getEventos();
          this.toastr.success("Editado com sucesso");
        }, error => {
          console.log(error);
          this.toastr.error("Erro ao editar");
        })
      }
    }
  }

  public excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.tema}`;
  }
  
  public confirmDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success("Deletado com sucesso");
        }, error => {
          console.log(error);
          this.toastr.error("Erro ao deletar");
        }
    );
  }
}
