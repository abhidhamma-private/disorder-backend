import './env';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';
import { uploadMiddleware, uploadController } from './upload';
import cors from 'cors';
//const whiteList = ['192.168.0.79', 'localhost'];

const pubsub = new PubSub();
const NEW_CHAT = 'NEW_CHAT';
let chattingLog = new Array(
  {
    id: 0,
    userid: 'ck55hcdftlhv80b00dfvlkqmp',
    writer: '편붕이',
    description: '안녕하세요',
    avatar: '#ff5722',
  },
  {
    id: 1,
    userid: 'ck55hcdftlhv80b00dfvlkqmp',
    writer: '대가리',
    description: '야좀맞자',
    avatar: '#3f51b5',
  }
);
const PORT = process.env.PORT;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    request,
    isAuthenticated,
    pubsub,
    chattingLog,
    NEW_CHAT,
  }),
  getEndpoint: true,
});

server.express.use(cors());
server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);

server.express.get('/uploads/**', function(req, res) {
  const { path } = req;
  const file = `${__dirname}/..${path}`;
  res.download(file);
});

server.start(
  {
    port: PORT,
    subscriptions: '/socket',
  },
  () => console.log(`✅ Server running on http://localhost:${PORT}`)
);
