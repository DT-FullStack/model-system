
const appRouter = (app, fs) => {
  // variables
  const dataPath = './db.json';

  // READ
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  });

  // app.get('/:collection', async (req, res) => {

  // })

  app.get('/:collection', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const { collection: name } = req.params;
      const allData = JSON.parse(data);
      const collection = allData[name];
      console.log({ name, collection });
      if (collection) res.json(collection);
      else res.status(404).send(`Collection "${name}" not found`);
    });
  });

};

module.exports = appRouter;