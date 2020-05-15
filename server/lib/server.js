const users = require('./users');
const express = require('express');
const { createServer } = require('http');
const socket = require('./socket');
const multer = require('multer')
const cors = require('cors');
const app = express();
const server = createServer(app);
var fs = require('fs');
var dir = './upload';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use('/', express.static(`${process.cwd()}/`));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post('/enter', upload.single('postImage'), (req, res, next) => {
  try {
    const clientId = req.body.clientId
    // const userAccount = req.body.userAccount.userAccount
    const sizeOf = require('image-size')
    const src = req.file.path
    const dimensions = sizeOf(src)
    const user = users.get(clientId)
    // const user = userAccount
    if (user) {
      user.login = true
      user.clientName = req.body.clientName
      user.account = req.body.account
      user.priceHour = req.body.priceHour
      user.country = req.body.country
      user.language = req.body.language
      user.postImage = {
        src,
        width: dimensions.width,
        height: dimensions.height,
      }
    }
    res.send()
  } catch (error) {
    console.log(error);
    res.send(400);
  }
})

app.post('/getonlineusers', (req, res, next) => {
  try {
    const allusers = users.getAll()
    const onlineUsers = []
    for (const key in allusers) {
      const user = allusers[key]
      if (user.login) {
        onlineUsers.push({
          clientId: user.clientId,
          account: user.account,
          clientName: user.clientName,
          priceHour: user.priceHour,
          postImage: user.postImage,
          country: user.country,
          language: user.language
        })
      }
    }
    res.send(onlineUsers)
  } catch (error) {
    console.log(error);
    res.send(400);
  }
})

module.exports.run = (config) => {
  server.listen(config.PORT);
  socket(server);
  console.log(`Server is listening at :${config.PORT}`);
}
