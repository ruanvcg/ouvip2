import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudReportService } from 'src/app/services/crud-report.service';
import { ApiService } from 'src/app/services/login.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent {
  auth: any;
  reportDetails: any;
  reportViewForm!: FormGroup;

  constructor(
    private crudReportService: CrudReportService,
    private loginService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder 
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenAdmin');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }



    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    this.crudReportService.getReportDetails(id).subscribe(
      reportDetails => {
        this.reportDetails = reportDetails;

        // Defina o valor padrão do status usando o valor de statusReporte
        this.reportDetails.statusReporte = reportDetails.statusReporte;

        // Agora, depois de ter os detalhes do relatório, defina o valor padrão do form
        this.reportViewForm = this.fb.group({
          status: [this.reportDetails.statusReporte]
        });

        // Defina a posição do marcador
        if (this.reportDetails.lat && this.reportDetails.longi) {
          this.markerPositions = [
            {
              lat: parseFloat(this.reportDetails.lat),
              lng: parseFloat(this.reportDetails.longi)
            }
          ];
        }
      },
      error => {
        console.error('Error loading report details:', error);
        this.router.navigate(['**']);
      }
    );
  }

  center: google.maps.LatLngLiteral = {
    lat: -4.433538687705652,
    lng: -41.45794006677537
  };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    center: this.center,
    disableDefaultUI: true,
    gestureHandling: 'greedy', // Desativa o controle de rotação
    mapTypeControl: false, // Desativa o controle do tipo de mapa
    scaleControl: true,
    zoomControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  getFileType(filePath: string): string {
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif') {
      return 'img';
    } else if (fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg') {
      return 'video';
    } else {
      return 'unknown';
    }
  }

  updateReportStatus() {
    const newStatus = this.reportViewForm.value.status;
  
    this.crudReportService.updateReportStatus(this.reportDetails.id, newStatus).subscribe(
      response => {
        if (response.result === 'success') {
          alert('Status atualizado com sucesso!');
          this.router.navigate(['adminpage/']);
          // Atualizar os detalhes do relatório com o novo status
          this.reportDetails.statusReporte = newStatus;
        } else {
          console.error('Failed to update report status.');
        }
      },
      error => {
        console.error('Error updating report status:', error);
      }
    );
  }

  deleteReport(id: number) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir esta manifestação?');
    if (confirmDelete) {
      this.crudReportService.deleteReport(id).subscribe(
        response => {
          if (response.result === 'success') {
            alert('Manifestação excluida com sucesso!');
            this.router.navigate(['adminpage/']);
          } else {
            alert('Falha ao deletar a manifestação!');
          }
        },
        error => {
          console.error('Error deleting report:', error);
        }
      );
    }
  }
  
  
}
