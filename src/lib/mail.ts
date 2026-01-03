import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendTicketEmail(to: string, ticketCode: string, carName: string, startDate: string, endDate: string, totalPrice: number) {
    const html = `
    <div style="font-family: sans-serif; background-color: #000; color: #fff; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 20px; border-radius: 8px;">
        <h1 style="color: #d4af37; text-align: center;">Confirmation de Réservation</h1>
        <p>Merci pour votre réservation. Voici votre ticket unique à présenter en agence.</p>
        
        <div style="background-color: #111; padding: 20px; margin: 20px 0; border-left: 4px solid #d4af37;">
          <h2 style="margin: 0; font-size: 24px; letter-spacing: 2px;">${ticketCode}</h2>
          <p style="color: #888; margin-top: 5px;">CODE TICKET</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Véhicule</td>
            <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right;">${carName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Du</td>
            <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right;">${startDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Au</td>
            <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right;">${endDate}</td>
          </tr>
           <tr>
            <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Total à payer</td>
            <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right; color: #d4af37; font-weight: bold;">${totalPrice} €</td>
          </tr>
        </table>

        <p style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
          Veuillez présenter ce code à notre agence pour procéder au paiement et récupérer les clés.
        </p>
      </div>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Luxury Rental" <noreply@luxuryrental.com>',
            to,
            subject: `Votre Réservation Confirmée - ${ticketCode}`,
            html,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        // On ne bloque pas l'app si l'email échoue, mais on le loggue.
        // Dans une vraie app, on gérerait ça mieux (queue, retry).
    }
}
