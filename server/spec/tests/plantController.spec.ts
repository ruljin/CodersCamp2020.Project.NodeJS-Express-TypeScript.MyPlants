import { PlantController } from '../controllers/plantController';
import { Plant, Comment } from '../models/plant';

const testPlant = {
  name: 'test1false',
  latin_name: 'test2latin',
  min_temperature: 1,
  max_temperature: 2,
  watering: 'test',
  watering_method: 'test',
  subsoil: 'test',
  conditioners: 'test',
  spraying: 'test',
  sunlight: 'test',
  humidity: 'test',
  application: 'test',
  accepted: false,
  species: '123123123123',
  comments: [],
  toxicity: {
    human: true,
    animal: true
  }
};

const testComment = {
  user: '123456789101',
  text: 'testtesting'
};

describe('GET /api/plant/', () => {
  const plantPath = '/api/plant/';
  const onePlantPath = (id: String) => `${plantPath}/${id}`;

  test('Getting all plants from database', async () => {
    const plnatId = '603fc89ed9f60b3f74485c9a';
    await new Plant(testPlant).save();
    const { body, status } = await get(plantController());
  });
});