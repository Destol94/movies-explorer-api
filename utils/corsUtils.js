const allowedCors = [
  'https://project-mesto.nomoredomains.club',
  'http://project-mesto.nomoredomains.club',
  'https://api.project-mesto.nomoredomains.club',
  'http://api.project-mesto.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://my-diploma.nomoredomains.work/',
  'https://my-diploma.nomoredomains.work/',
];

const corsOptions = {
  origin: allowedCors,
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
