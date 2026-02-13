const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '🛡️ Guild Supply System API',
    description: '公會補給站後端 API 文件',
    version: '1.0.0',
  },
  host: 'localhost:3000', 
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: '請輸入: Bearer <你的Token>'
    }
  },
  security: [
    { bearerAuth: [] }
  ]
};

const outputFile = './swagger_output.json'; 
const endpointsFiles = ['./src/server.js']; 

// 開始生成
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('✅ Swagger 文件已生成！');
});