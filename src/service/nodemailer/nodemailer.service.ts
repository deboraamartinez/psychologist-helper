import { Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';

type EmailAttachment = {
  filename: string;
  content: Buffer;
};

export class NodemailerService {
  async sendEmail({
    to,
    subject,
    content,
    attachments,
  }: {
    to: string;
    subject: string;
    content: string;
    attachments?: EmailAttachment[];
  }) {
    try {
      const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const fromEmail =  process.env.EMAIL as string
      
      const mailOptions: {
        from: string, 
        to: string;
        subject: string;
        html: string;
        attachments: Array<EmailAttachment & { encoding: string }>;
      } = {
        from: fromEmail, 
        to,
        subject,
        html: content,
        attachments: [],
      };

      if (attachments && attachments?.length) {
        attachments.forEach((attachment) => {
          mailOptions.attachments.push({
            filename: attachment.filename,
            content: attachment.content,
            encoding: 'base64',
          });
        });
      }

      await transporter.sendMail(mailOptions);
    } catch (error) {
      Logger.error('Erro ao enviar o e-mail: ', error);
      throw error;
    }
  }
}
