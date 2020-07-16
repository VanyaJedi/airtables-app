const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('config');
const BASE_ID = config.get('BASE_ID_TEST');
const API_KEY = config.get('API_KEY_TEST');


const Airtable = require('airtable');
Airtable.configure({
    apiKey: API_KEY
});
const base = Airtable.base(BASE_ID);


/* Airtable */
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

router.get('/tasks', (req, res, next) => {
    const initData = [];
    base('Tasks').select({
        view: 'Grid view'
      }).eachPage((records, fetchNextPage) => {
        initData.push(records);
        fetchNextPage();
      }).then(() => {
        res.json(initData);
      })
});

router.get('/roles', (req, res, next) => {
  const initData = [];
  base('Role').select({
      view: 'roles_all'
    }).eachPage((records, fetchNextPage) => {
      initData.push(records);
      fetchNextPage();
    }).then(() => {
      res.json(initData);
    })
});

router.get('/units', (req, res, next) => {
  const initData = [];
  base('Unit').select({
      view: 'unit_all'
    }).eachPage((records, fetchNextPage) => {
      initData.push(records);
      fetchNextPage();
    }).then(() => {
      res.json(initData);
    })
});

router.get('/functions', (req, res, next) => {
  const initData = [];
  base('Functions').select({
      view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
      initData.push(records);
      fetchNextPage();
    }).then(() => {
      res.json(initData);
    })
});

router.get('/roleunit', (req, res, next) => {
  const initData = [];
  base('Role_Unit').select({
      view: 'roles_all'
    }).eachPage((records, fetchNextPage) => {
      initData.push(records);
      fetchNextPage();
    }).then(() => {
      res.json(initData);
    })
});

router.post('/addtask', (req, res, next) => {
  console.log(req.body);
  base('Tasks').create(req.body)
  .then((data)=> {
    res.json(data);
  })
});

router.delete('/deletetask/:id', (req, res, next) => {
  console.log(req.params.id);
  base('Tasks').destroy(req.params.id)
  .then((data)=> {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
  })
});


router.put('/updatetasks/', (req, res, next) => {
  base('Tasks').update(req.body.data)
  .then((data)=> {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = router;
