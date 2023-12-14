import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clreserva',
  templateUrl: './clreserva.page.html',
  styleUrls: ['./clreserva.page.scss'],
})
export class ClreservaPage implements OnInit {

  selectedDate: string = '';

  constructor() { }

  ngOnInit() {
  }

  isWeekday = (dateString: string): boolean => {
    if (!dateString) {
      // Puedes manejar el caso en el que no se haya seleccionado ninguna fecha
      console.log('Selecciona una fecha');
      return false;
    }

    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date será habilitado si no es
     * domingo (0) o sábado (6)
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  // Función para confirmar la reserva
  confirmarReserva() {
    if (!this.selectedDate) {
      // Puedes manejar el caso en el que no se haya seleccionado ninguna fecha
      console.log('Selecciona una fecha');
      return;
    }

    if (this.isWeekday(this.selectedDate)) {
      // Aquí puedes agregar la lógica para confirmar la reserva en un día laborable
      console.log('Reserva confirmada para la fecha:', this.selectedDate);
    } else {
      // Muestra un mensaje de error o realiza alguna acción si la fecha no es un día laborable
      console.log('Selecciona un día de lunes a viernes');
      // También puedes reiniciar la fecha seleccionada a un valor predeterminado
      // this.selectedDate = valorPorDefecto;
    }
  }


}
