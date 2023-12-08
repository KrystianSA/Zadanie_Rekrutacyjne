public type User record {|
    int id;
    string email;
    string password;
|};

public class DataSeeder {

    public function SeedData() returns User[] {

        User[] users = [
            {id: 1, email: "user1@gmail.com", password: "User1!"},
            {id: 2, email: "user2@gmail.com", password: "User2!"},
            {id: 3, email: "user3@gmail.com", password: "User3!"}
        ];
        return users;
    }

}
