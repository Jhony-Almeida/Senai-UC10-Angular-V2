import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  userModel = new User();

  mensagem = ""

  receberDados() {this.loginService.login (this.userModel).subscribe((response) => {
    console.log("Deu certo")
    this.router.navigateByUrl("/")
  }, (respostaErro) => {
    //alert(respostaErro.error)
    //console.log(respostaErro.error)
    if (respostaErro.error == "Email and password are required") {  // Fiz com alert porque o texto estava aparecendo do lado em vez de em baixo 
      alert("ERRO: Email e senha são obrigatórios")
    } else if (respostaErro.error == "Incorrect password") {
      alert("ERRO: Senha incorreta")
    } else if (respostaErro.error == "Cannot find user") {
      alert("ERRO: Não é Possivel encontrar o Usuario")
    } else if (respostaErro.error == "Email format is invalid") {
      alert("ERRO: Formato de email invalido")
    }
    else {
      this.mensagem = respostaErro.error
    }
  })
    
  }
}

// console.log(this.userModel)