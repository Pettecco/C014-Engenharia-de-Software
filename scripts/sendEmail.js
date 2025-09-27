import nodemailer from 'nodemailer';

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

if (!user || !pass) {
  console.error('Erro ao verificar EMAIL_USER ou EMAIL_PASS');
  process.exit(1);
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
      to: 'pettersonibs@gmail.com',
      subject: 'Pipeline Notification',
      text: 'Pipeline executado com sucesso!',
      html: '<b>Pipeline executado com sucesso!</b>',
    });

    console.log('Email enviado:', info.messageId);
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    process.exit(1);
  }
}

sendPipelineEmail();
