export const ServerAdress = "server";
export const MongoAdress = "database";

export const APIUrl = `http://${ServerAdress}:3000/api`;
export const AppHost = `http://${ServerAdress}`;
export const AppPort = 8085;
export const AppWebSocketUrl = `ws:/${ServerAdress}:${AppPort}`;

export const DatabaseName = "TestsDatabase";
export const MongoUrl = `mongodb://${MongoAdress}/${DatabaseName}`;
export const UseGraphiql = true;
