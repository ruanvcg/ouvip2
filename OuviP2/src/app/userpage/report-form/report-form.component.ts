import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CrudReportService } from 'src/app/services/crud-report.service';
import { ApiService } from 'src/app/services/login.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {

  auth: any;
  // @ts-ignore
  reportForm: FormGroup;
  tipoReporte: string = '';
  userCpfd: string | null = null; // Store user CPF here
  userNamed: string | null = null; // Store user name here
  userEmaild: string | null = null; // Store user Email here
  userPhoned: string | null = null; // Store user Phone here
  userIdd: string | null = null; // Store user ID here

  suaSiteKey = '6Ldob1UoAAAAAAJ-k9mvpfJVvjNU4x7A3WZ4bu0M';
  recaptchaValue: string = '';
  recaptchaValidated: boolean = false;

  onRecaptchaResolved(event: any) {
    this.recaptchaValidated = event;
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private crudReportService: CrudReportService,
    private formBuilder: FormBuilder,
    private loginService: ApiService,
    private route: ActivatedRoute
  ) {
    // Set user information
    this.userIdd = this.loginService.getTokenUserId();
    this.userNamed = this.loginService.getTokenUserName();
    this.userCpfd = this.loginService.getTokenUserCpf();
    this.userEmaild = this.loginService.getUserToken();
    this.userPhoned = this.loginService.getTokenUserPhone();

    this.reportForm = this.formBuilder.group({
      usuarioId: [this.userIdd],
      nome: [this.userNamed],
      cpf: [this.userCpfd],
      email: [this.userEmaild],
      telefone: [this.userPhoned],
      tipoReporte: [this.tipoReporte, [Validators.required, Validators.maxLength(30), Validators.pattern(/^[\p{L} ]+$/u)]],
      categoria: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[\p{L} ]+$/u)]],
      descricao: ['', [Validators.required, Validators.maxLength(3000)]],
      lat: [''],
      longi: [''],
      endereco: ['', [
        Validators.required,
        Validators.maxLength(40)
      ]],
      numero: ['', [
        Validators.maxLength(3),
        Validators.pattern(/^[0-9]*$/),
        this.validateNumeroRange.bind(this)
      ]],
      bairro: ['', [Validators.maxLength(100), Validators.required]],
      referencia: ['', [Validators.maxLength(35)]],
      statusReporte: ['Pendente'],
      media: [null]
    });
  }

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenUser');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }


    this.route.params.subscribe(params => {
      this.tipoReporte = params['tipoReporte'];

      this.reportForm.patchValue({
        tipoReporte: this.tipoReporte
      });
    });

    // Rola a página para o topo
    window.scrollTo(0, 0);
  }


  getAddressFromLatLng(latlng: google.maps.LatLngLiteral): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results && results[0]) {
            const addressComponents = results[0].address_components;
            const addressArray: string[] = [];

            for (const component of addressComponents) {
              // Filtrar apenas os tipos de componente desejados (neste caso, 'route' que representa o endereço)
              if (component.types.includes('route')) {
                addressArray.push(component.long_name);
              }
            }

            resolve(addressArray);
          } else {
            reject('Nenhum resultado encontrado');
          }
        } else {
          reject('Geocodificação falhou devido a: ' + status);
        }
      });
    });
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

  addMarker(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (latLng) {
      this.markerPositions = [];
      this.markerPositions.push(latLng.toJSON());

      // Arredonde as coordenadas para um número específico de casas decimais
      const lat = latLng.lat().toFixed(3); // Por exemplo, arredondei para 6 casas decimais
      const lng = latLng.lng().toFixed(3);

      // Preencher os campos "lat" e "long" com os valores arredondados
      const latControl = this.reportForm.get('lat');
      const longControl = this.reportForm.get('longi');
      if (latControl && longControl) {
        latControl.setValue(lat);
        longControl.setValue(lng);
        console.log('Latitude:', latControl.value);
        console.log('Longitude:', longControl.value);
      }

      this.getAddressFromLatLng(latLng.toJSON())
        .then((addressArray) => {
          const enderecoControl = this.reportForm.get('endereco');

          if (enderecoControl) {
            enderecoControl.setValue(addressArray.join(', '));
          }
        })
        .catch((error) => {
          console.error('Erro na geocodificação:', error);
        });
    }
  }




  validateNumeroRange(control: AbstractControl): ValidationErrors | null {
    const numero = control.value;

    // Check if the field is empty
    if (numero === null || numero === '') {
      return null; // If empty, no validation is needed
    }

    // Define the allowed range for the number
    const minNumero = 1;
    const maxNumero = 9999;

    // Check if the number is within the allowed range
    if (isNaN(numero) || numero < minNumero || numero > maxNumero) {
      return { 'numeroRange': true };
    }

    return null; // Validation passed
  }

  checkFileSize(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileSizeInMB = (fileReader.result as ArrayBuffer).byteLength / (1024 * 1024);
        resolve(fileSizeInMB <= 30); // Resolve true if file size is less than or equal to 10MB, false otherwise
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  async uploadFile(event: any) {
    const file = event?.target.files ? event.target.files[0] : '';
    if (file) {
      const isFileSizeValid = await this.checkFileSize(file);
      if (isFileSizeValid) {
        this.reportForm.patchValue({
          media: file
        });
        this.reportForm.get('media')?.updateValueAndValidity();
      } else {
        alert('O arquivo excede o limite máximo de 30MB.');
      }
    }
  }


  // Handle form submission
  postdata() {
    const isConfirmed = confirm('Deseja realmente enviar a manifestação?');

    console.log(this.reportForm.value);

    if (!isConfirmed) {
      return;
    }

    const tipoReporteControl = this.reportForm.get('tipoReporte');
    const categoriaControl = this.reportForm.get('categoria');
    const descricaoControl = this.reportForm.get('descricao');
    const enderecoControl = this.reportForm.get('endereco');
    const numeroControl = this.reportForm.get('numero');
    const referenciaControl = this.reportForm.get('referencia');
    const bairroControl = this.reportForm.get('bairro');

    if (this.reportForm?.invalid) {
      if (tipoReporteControl?.invalid) {
        if (tipoReporteControl?.hasError('required')) {
          alert('O campo "Tipo de Reporte" é obrigatório.');
        } else if (tipoReporteControl?.hasError('maxlength')) {
          alert('O campo "Tipo de Reporte" deve ter no máximo 30 caracteres.');
        } else if (tipoReporteControl?.hasError('pattern')) {
          alert('O campo "Tipo de Reporte" deve conter apenas letras e espaços.');
        }
        return;
      }

      if (categoriaControl?.invalid) {
        if (categoriaControl?.hasError('required')) {
          alert('O campo "Categoria" é obrigatório.');
        } else if (categoriaControl?.hasError('maxlength')) {
          alert('O campo "Categoria" deve ter no máximo 30 caracteres.');
        } else if (categoriaControl?.hasError('pattern')) {
          alert('O campo "Categoria" deve conter apenas letras e espaços.');
        }
        return;
      }

      if (descricaoControl?.invalid) {
        if (descricaoControl?.hasError('required')) {
          alert('O campo "Descrição" é obrigatório.');
        } else if (descricaoControl?.hasError('maxlength')) {
          alert('O campo "Descrição" deve ter no máximo 3000 caracteres.');
        }
        return;
      }
      if (enderecoControl?.invalid) {
        if (enderecoControl?.hasError('required')) {
          alert('O campo "Endereço" é obrigatório.');
        } else if (enderecoControl?.hasError('maxlength')) {
          alert('O campo "Endereço" deve ter no máximo 40 caracteres.');
        }
        return;
      }
      if (numeroControl?.invalid) {
        if (numeroControl?.hasError('maxlength')) {
          alert('Insira um número válido, por favor');
        } else if (numeroControl?.hasError('numeroRange')) {
          alert('Insira um número válido, por favor');
        }
        return;
      }
      if (bairroControl?.invalid) {
        if (bairroControl?.hasError('required')) {
          alert('O campo "Bairro" é obrigatório.');
        } else if (bairroControl?.hasError('maxlength')) {
          alert('O campo "Bairro" deve ter no máximo 100 caracteres.');
        }
        return;
      }
      if (referenciaControl?.invalid) {
        if (referenciaControl?.hasError('maxlength')) {
          alert('O campo "Ponto de referencia" deve ter no máximo 35 caracteres.');
        }
        return;
      }

      return;
    } else {

      if (this.recaptchaValidated == false) {
        alert('Por favor, complete o reCAPTCHA antes de manifestar.');
        return;
      }

      // Submit registration data to the service
      this.crudReportService.createReport(
        this.reportForm.value.usuarioId,
        this.reportForm.value.nome,
        this.reportForm.value.cpf,
        this.reportForm.value.email,
        this.reportForm.value.telefone,
        this.reportForm.value.tipoReporte,
        this.reportForm.value.categoria,
        this.reportForm.value.lat,
        this.reportForm.value.longi,
        this.reportForm.value.endereco,
        this.reportForm.value.numero,
        this.reportForm.value.bairro,
        this.reportForm.value.referencia,
        this.reportForm.value.descricao,
        this.reportForm.value.statusReporte,
        this.reportForm.value.media
      ).pipe(first()).subscribe(
        data => {
          if (data.message === 'success') {
            alert('Manifestação realizada com sucesso!');
            this.router.navigate(['userpage']); // Navigate to login page on successful registration
          } else {
            alert('Erro ao realizar Manifestação: ' + data.error);
          }
        },
        error => {
          alert("Erro encontrado durante o registro.");
        }
      );
    }

  }
}
