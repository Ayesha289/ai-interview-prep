import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY); 

export default async function handler (req, res) {
  try {
    const response = await resend.emails.send({
      from: 'preppyyc@preppyy.com', // Replace with your Resend verified sender email
      to: email,
      subject: 'Welcome to Preppy!',
      text: 'Thank you for joining the waitlist! We will notify you when Preppy launches.',
    });

    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
