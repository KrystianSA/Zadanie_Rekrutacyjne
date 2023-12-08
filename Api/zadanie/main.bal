import ballerina/http;

listener http:Listener httpListener = new (8080);
DataSeeder dataSeeder = new DataSeeder();
User[] users = dataSeeder.SeedData();

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:4200"]
    }
}

service / on httpListener {

    resource function get users() returns json {
        return users;
    }

    resource function get users/[int id]() returns json {
        return users.filter(user => user.id == id);
    }

    resource function post users(@http:Payload User user) {
        users.push(user);
    }

    resource function post users/resetPassword(
            @http:Payload json payload,
            http:Caller caller,
            http:Request request) returns error? {

        string email = check payload.email;
        var user = users.filter(user => user.email == email);
        http:Response resp = new;
        if (user.length() > 0)
        {
            resp.statusCode = http:STATUS_ACCEPTED;
            check caller->respond(resp);
        }
        else
        {
            resp.statusCode = http:STATUS_METHOD_NOT_ALLOWED;
            check caller->respond(resp);
        }
    }

    resource function post auth/login(
            @http:Payload json payload,
            http:Caller caller,
            http:Request request) returns error? {

        string email = check payload.email;
        string password = check payload.password;

        var user = users.filter(user => user.email == email);
        http:Response resp = new;
        if (user.length() <= 0) {
            resp.statusCode = http:STATUS_UNAUTHORIZED;
            check caller->respond(resp);
        }

        var userPassword = user.filter(userPassword => userPassword.password == password);
        if (userPassword.length() > 0)
        {
            resp.statusCode = http:STATUS_ACCEPTED;
            check caller->respond(resp);
        }
        else
        {
            resp.statusCode = http:STATUS_UNAUTHORIZED;
            check caller->respond(resp);
        }
    }
}