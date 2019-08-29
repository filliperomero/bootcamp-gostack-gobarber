export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: 'a961363f96c191',
    pass: 'c192d377dfc049',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/**
 * The providers that we can use are:
 * Production: Amazon SES, Mailgun, Sparkpost
 * Development: Mailtrap
 * Avoid: Gmail and Mandril
 */
