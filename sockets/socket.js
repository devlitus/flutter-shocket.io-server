const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands;
bands.addBands(new Band('Queen'));
bands.addBands(new Band('Bon Jovi'));
bands.addBands(new Band('Metallica'));
bands.addBands(new Band('AC/DC'));


// Mensajes de Sockets
io.on('connection', client => {
  console.log('Cliente conectado');

  client.on('disconnect', () => { console.log('Cliente desconectado') });

  client.on('message', (payload) => {
    console.log('Mensaje', payload);
    client.broadcast.emit('message', payload);
  });
  client.emit('bands', bands.getBands());


});