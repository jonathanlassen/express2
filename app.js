const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const apps = require('./playstore.js')

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;
    const validSearches =  ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
    if(sort) {
      if(!['rating', 'app'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of title or rank');
      }
    }
    let results = []
    if(genres) {
        if(!validSearches.includes(genres)) {
          return res
            .status(400)
            .send('search must be of provided categories');
        }
        results = apps.filter(app => app.Genres === genres )
        console.log(results)
        console.log('hi')
      } else
      {
          results = apps
      }

    if(sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      }); 
    }  
  
    res.json(results);
  });

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});