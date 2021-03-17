import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import app from './app';

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
