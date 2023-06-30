import { config } from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers, typeDefs } from './schema.js';
import http from 'http';
import db from './config/database.js';
import { MONGO_URL, PORT } from './config/config.js';
import formatError from './helpers/formatError.js';
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import bodyParser from 'body-parser';
import packageJson from "../package.json" assert {type: "json"};
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';



config()
interface MyContext {
	token?: String;

}

new db(console).connect(MONGO_URL as string);
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
	formatError,
	typeDefs,
	resolvers,
	csrfPrevention: false,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();
app.get('/', (req, res) => {
	res.json({ name: packageJson.name, version: packageJson.version })
})

const corsOptions = {
	origin: ["http://localhost:3000", "https://pay.netapps.ng"],
	credentials: true // <-- REQUIRED backend setting

};
app.use(cookieParser())
app.use(cors<cors.CorsRequest>(corsOptions))


app.use('/graphql', bodyParser.json({ limit: '5mb' }), expressMiddleware(server, {
	context: async ({ req, res }) => {
		return {
			req,
			res,
		}

	},
}),
);



await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);


