require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const urlParser = require('url');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urlDatabase = [];
let id = 1;

app.post('/api/shorturl', (req, res) => {
  const original_url = req.body.url;

  try {
    const parsedUrl = new URL(original_url);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return res.json({ error: 'invalid url' });
    }
    dns.lookup(parsedUrl.hostname, (err) => {
      if (err) {
        return res.json({ error: 'invalid url' });
      } else {
        const short_url = id++;
        urlDatabase[short_url] = original_url;
        res.json({ original_url, short_url });
      }
    });
  } catch (e) {
    return res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const short_url = req.params.short_url;
  const original_url = urlDatabase[short_url];
  if (original_url) {
    res.redirect(original_url);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
