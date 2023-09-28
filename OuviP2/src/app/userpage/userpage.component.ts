import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit{

  auth: any;
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenUser');

    if (!this.auth || this.auth == undefined || this.auth == null || this.auth == NONE_TYPE) {
      this.router.navigate(['/login']);
    }

    // Rola a página para o topo
    window.scrollTo(0, 0);
  }

  // Função para lidar com o clique em um elemento "report"
  onClickReport(tipoReporte: string) {
    // Navegue para a página de formulário e passe o tipoReporte como parâmetro
    this.router.navigate(['/userpage/report-form', { tipoReporte }]);
  }

}
