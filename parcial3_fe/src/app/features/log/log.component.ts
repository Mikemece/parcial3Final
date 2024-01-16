import { Component } from '@angular/core';
import { PruebaService } from '../../services/prueba-serv/prueba.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css',
  providers: [PruebaService]
})
export class LogComponent {

  logs: any[] = [];

  constructor(private pruebaService: PruebaService) { }

  ngOnInit(): void {

    this.pruebaService.getLogs().subscribe(data =>{
      this.logs = data;
    })
  }
}
