
const Express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = new Express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use('/public', Express.static(path.resolve(__dirname, './public')));

app.use(bodyParser());

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/bootstrap', (req, res) => {
  res.render('bootstrap');
});

app.post('/api/auth', (req, res) => {
  const { username, password } = req.body;
  if (!username) return res.status(422).json({ code: 422, type: 'missed_username', message: 'Missed username' });
  if (!password) return res.status(422).json({ code: 422, type: 'missed_password', message: 'Missed password' });
  if (username !== 'john' || password !== 'snow') return res.status(401).json({ code: 401, message: 'Invalid username or password' });

  res.status(200).json({ message: 'Success!' });
});

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log('error starting server', err.stack);
  }
  console.log(`app is launched at localhost:${app.get('port')}`);
});
