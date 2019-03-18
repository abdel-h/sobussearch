const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.use('/autocomplete', (req, res, next) => {
    const keyword = req.query.keyword;
    axios({
        url: 'https://interview.sobus.fr:8080/autocomplete',
        method: 'post',
        data: {
            key: 'ImBuildingASearchBar',
            locale: 'fr',
            term: keyword
        }
    }).then(results => {
        req.autocomplete = results.data;
        next();
    });
});
app.get('/autocomplete', function(req, res) {
    res.json(req.autocomplete);
});
app.get('/*', function(req, res) {
    res.send('Hello !');
});

app.listen(process.env.PORT || 8080, function() {
    console.log('Running at PORT: ' + process.env.PORT || 8080);
});
