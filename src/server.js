const express = require('express');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); 

const router = require('./routes/index'); 

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json()); 


app.get('/', (req, res) => {
  res.send(`
    <h1>公會補給站伺服器運作中</h1>
    <p>狀態：Database 連線模式 (Supabase)</p>
    <p>測試連結：<a href="/guild-supply/products">/guild-supply/products</a></p>
  `);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/guild-supply', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3000 || 5173;
  
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