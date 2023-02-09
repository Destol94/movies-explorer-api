const allowedCors = [
  'https://project-mesto.nomoredomains.club',
  'http://project-mesto.nomoredomains.club',
  'https://api.project-mesto.nomoredomains.club',
  'http://api.project-mesto.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccesCode: 200,
  Credential: true,
};

module.exports = corsOptions;