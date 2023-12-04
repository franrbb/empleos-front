import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/service/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html'
})
export class SolicitudesComponent implements OnInit {

  solicitudes: Solicitud[];

  constructor(private _solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this._solicitudService.getSolicitudes().subscribe(resp => {
      this.solicitudes = resp;
    })
  }

  delete(solicitud: Solicitud){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la solicitud?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this._solicitudService.delete(solicitud.id).subscribe(resp => {
          this.solicitudes = this.solicitudes.filter(cli => cli !== solicitud);
          Swal.fire(
            'Solicitud eliminada!',
            `Solicitud eliminada con éxito`,
            'success'
          );
        }); 
      }
    });
  }

}
