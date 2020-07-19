const express = require('express');
const router = express.Router();

const config = require('config');
let BASE_ID, API_KEY;
if (config.get('ENV') === 'dev') {
  BASE_ID = config.get('BASE_ID_TEST');
  API_KEY = config.get('API_KEY_TEST');  
} else {
  BASE_ID = config.get('BASE_ID_PROD');
  API_KEY = config.get('API_KEY_PROD');  
}



const Airtable = require('airtable');
Airtable.configure({
    apiKey: API_KEY
});
const base = Airtable.base(BASE_ID);

const getMergedResponses = (res, baseName, gridName) => {
  const initData = [];
  base(baseName).select({
    view: gridName
  }).eachPage((records, fetchNextPage) => {
    initData.push(records);
    fetchNextPage();
  }).then(() => {
    res.json(initData);
  })
}


router.get('/tasks', (req, res, next) => {
  getMergedResponses(res, 'Tasks', 'Grid view');
});

router.get('/roles', (req, res, next) => {
  getMergedResponses(res, 'Role', 'roles_all');
});

router.get('/units', (req, res, next) => {
  getMergedResponses(res, 'Unit', 'unit_all');
});

router.get('/functions', (req, res, next) => {
  getMergedResponses(res, 'Functions', 'Grid view');
});

router.get('/roleunit', (req, res, next) => {
  getMergedResponses(res, 'Role_Unit', 'roles_all');
});

router.post('/addtask', (req, res, next) => {
  base('Tasks').create(req.body)
  .then((data)=> {
    res.json(data);
  })
});

router.delete('/deletetask/:id', (req, res, next) => {
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
