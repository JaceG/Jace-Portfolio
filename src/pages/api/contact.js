import { ServerClient } from 'postmark';

// Initialize the Postmark client with your server token
const client = new ServerClient(process.env.POSTMARK_API_KEY);

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { name, email, message } = req.body;

		// Basic validation
		if (!name || !email || !message) {
			return res.status(400).json({
				message: 'Missing required fields',
			});
		}

		// Send email using Postmark
		const emailData = {
			From: process.env.POSTMARK_FROM_EMAIL, // Your verified sender email
			To: process.env.POSTMARK_TO_EMAIL, // Where you want to receive emails
			Subject: `New Contact Form Message from ${name}`,
			HtmlBody: `
				<strong>Name:</strong> ${name}<br>
				<strong>Email:</strong> ${email}<br>
				<strong>Message:</strong> ${message}
			`,
			TextBody: `
				Name: ${name}
				Email: ${email}
				Message: ${message}
			`,
		};

		await client.sendEmail(emailData);

		return res.status(200).json({
			message: 'Email sent successfully!',
		});
	} catch (error) {
		console.error('Error sending email:', error);
		return res.status(500).json({
			message: 'Error sending email. Please try again later.',
		});
	}
}
