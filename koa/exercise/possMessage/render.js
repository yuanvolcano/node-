const fs = require('fs');

async function render(page) {
  return new Promise((resolve, reject) => {
    let path = `./html/${page}`;
    fs.readFile(path, (err, data) => {
      if (err) {
        return reject(err)
      } 
      resolve(data);
    })
  })
}

module.exports = render;