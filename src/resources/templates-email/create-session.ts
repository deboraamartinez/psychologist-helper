export default function CreateSession(
    psychologistName: string,
    patientName: string,
    sessionDateTime: string,
    psychologistPhone: string,
  ) {
    return `<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmação de Sessão de Psicologia</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f0f4f8;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    color: #333333;
                }
        
                .logo {
                    width: 100%;
                    max-width: 150px;
                    height: auto;
                    margin-bottom: 20px;
                }
        
                .title {
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    color: #005a9c;
                }
        
                .content {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
        
                .highlight {
                    font-weight: bold;
                    color: #005a9c;
                }
        
                .contact-info {
                    font-size: 14px;
                    margin-top: 20px;
                    color: #555555;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="title">Confirmação de Sessão de Psicologia</div>
                <div class="content">
                    Olá, <span class="highlight">${patientName}</span>, <br /><br />
                    Sua sessão de psicologia com o(a) profissional <span class="highlight">${psychologistName}</span> foi agendada para a seguinte data e horário:
                    <br /><br />
                    <strong>Data e Horário:</strong> ${sessionDateTime}
                    <br /><br />
                    Caso tenha qualquer dúvida ou precise entrar em contato, por favor, utilize o número abaixo:
                    <br /><br />
                    <strong>Telefone do(a) psicólogo(a):</strong> ${psychologistPhone}
                </div>
                <div class="contact-info">
                    <em>Estamos aqui para ajudar. Agradecemos por confiar no nosso serviço.</em>
                    <br />
                    <strong>Equipe de Psicologia</strong>
                </div>
            </div>
        </body>
        </html>
        `;
  }
  