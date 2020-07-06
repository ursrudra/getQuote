const express = require("express");
const app = express();
const fs = require('fs');
const PORT = "8080";
let sendersData = {
  senders: []
}
const path = './data/senders.json';

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}
const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

const isExist = (data, key) => {
  return data.some(record => record.name === key.name && record.email === key.email);
}

app.use('/requestquote', (req, res) => {
  let status = '';
  const data = loadData(path) || JSON.stringify(sendersData);
  sendersData = JSON.parse(data);
  let senders = sendersData["senders"];
  let temp = {
    name: req.query.name,
    email: req.query.email
  };
  if (!isExist(senders, req.query)) {
    senders.push(temp);
    storeData(sendersData, path);
    status = 'Thank you for your subscription'
  } else {
    status = "Hey! you have alredy subscribed"
    console.log("Hey! you have already subscribed");

  }

  res.send(status);

})

app.listen(PORT, () => console.log(`Running on port ${PORT}`));