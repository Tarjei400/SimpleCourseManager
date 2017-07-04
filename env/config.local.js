export const ServerAdress = "0.0.0.0";
export const MongoAdress = "0.0.0.0";

export const APIUrl = `http://${ServerAdress}:3000/api`;
export const AppHost = `http://${ServerAdress}`;
export const AppPort = 8085;
export const AppWebSocketUrl = `ws:/${ServerAdress}:${AppPort}`;

export const MongoUrl = `mongodb://${MongoAdress}`;
export const UseGraphiql = true;
