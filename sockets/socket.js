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
    console.log('message', payload);
    client.broadcast.emit('message', payload);
  });
  client.emit('bands', bands.getBands());

  client.on('vote-band', (data) => {
    bands.voteBand(data.id);
    io.emit('bands', bands.getBands());
  });

  client.on('add-band', (data) => {
    bands.addBands(new Band(data.name));
    io.emit('bands', bands.getBands());
  });

  client.on('delete-band', (data) => {
    bands.deleteBand(data.id);
    io.emit('bands', bands.getBands());
  })
});