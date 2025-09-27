import nodemailer from 'nodemailer';

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const destinatary = process.env.EMAIL_TO;

if (!user || !pass) {
  console.error('Erro ao verificar EMAIL_USER ou EMAIL_PASS');
  process.exit(1);
}

if (!destinatary) {
  console.error('EMAIL_TO não configurado');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user, pass },
});

async function sendPipelineEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"CI Pipeline" <${user}>`,
      to: destinatary,
      subject: 'Pipeline Notification',
      text: 'Pipeline executando com sucesso!',
      html: '<b>Pipeline está sendo executada com sucesso!</b>',
    });

    console.log('Email enviado:', info.messageId);
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    process.exit(1);
  }
}

sendPipelineEmail();
