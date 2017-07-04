export const ServerAdress = "0.0.0.0";
export const MongoAdress = "0.0.0.0";

export const APIUrl = `http://${ServerAdress}:3000/api`;
export const AppHost = `http://${ServerAdress}`;
export const AppPort = process.env.PORT;
export const AppWebSocketUrl = `ws:/${ServerAdress}:${AppPort}`;

export const MongoUrl = `${process.env.MongoLab}`;
export const UseGraphiql = true;
