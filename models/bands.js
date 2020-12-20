const Band = require("./band");
class Bands {
  constructor() {
    this.bands = [];
  }

  addBands(band = new Band()) {
    this.bands.push(band);
  }

  getBands() {
    return this.bands;
  }

  deleteBand(id = '') {
    this.bands = this.bands.filter(b => b.id !== id);
    return this.bands;
  }

  voteBand(id = '') {
    this.bands = this.bands.map(b => {
      if (b.id === id) {
        band.votes++;
        return b;
      } else {
        return b;
      }
    })
  }
}

module.exports = Bands;