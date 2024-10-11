import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../services/consumer.service';
import { Medico } from '../interfaces/medico';
import { NgForm } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  medicos: Medico[] = [];

  novoMedico: Medico = {
    id: 0, 
    nome: '',
    email: '',
    crm: '',
    especialidade: '',
    endereco: {
      logradouro: '',
      bairro: '',
      cep: '',
      numero: '',
      complemento: '',
      cidade: '',
      uf: ''
    }
  }

  constructor(private consumer: ConsumerService) {}

  ngOnInit() {
    this.consumer.getList().subscribe({
      next: (value) => {
        this.medicos = value;
      },
      error: (err) => {
        console.error('Erro ao carregar a lista de médicos:', err);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.consumer.addMedico(this.novoMedico).subscribe({
        next: (medicoAdicionado) => {
          this.medicos.push(medicoAdicionado);
          form.resetForm(); // Resetar o formulário após o envio
        },
        error: (err) => {
          console.error('Erro ao registrar o médico:', err);
        }
      });
    }
  }
}
