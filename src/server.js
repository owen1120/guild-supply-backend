const express = require('express');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
require('dotenv').config();

const router = require('./routes/index'); 

const app = express();

app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send(`
    <h1>公會補給站伺服器運作中</h1>
    <p>狀態：Database 連線模式 (Supabase)</p>
    <p>測試連結：<a href="/guild-supply/products">/guild-supply/products</a></p>
  `);
});

app.use('/guild-supply', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`\n本地伺服器已啟動: http://localhost:${PORT}`);
    
    console.log('\n📋 目前可用的 API 列表:');
    console.log('--------------------------------------------------');
    listEndpoints(app).forEach(route => {
        route.methods.forEach(method => {
            console.log(`${method.padEnd(6)} ${route.path}`);
        });
    });
    console.log('--------------------------------------------------\n');
  });
}

module.exports = app;