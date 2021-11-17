# Pomo Kingdom Database API
## User
### Get User(s)
Accessable via **GET** request to `/api/v1/users/`<br>
To show list of users, query by `usersPerPage` and/or `page` (default values are 20 and 0).<br>
To access specific user, query by `userName` or `id`.

### Authenticate User
Accessable via **GET** request to `/api/v1/users/`<br>
To authenticate a user, set `auth` to 1 in the body of the request. Include `user_name` and `password` in the body of the request as well to authenticate the user.<br>
The response back to the client will include the user's info sent in the field `oldUser` as well as the authentication token sent in the field `token`.

### Add User
Accessable via **POST** request to `/api/v1/users/`<br>
In the body of the request, include `user_name`, `password`, and `char_name`.
The password will be encrypted before being entered into the database, and a token will be returned to the client to keep the user signed in.<br>
The response back to the client will include the user's info sent in the field `oldUser` as well as the authentication token sent in the field `token`.

### Update User
Accessable via **PUT** request to `/api/v1/users/`<br>
In the body of the request, include `id` to identify the user to modify, as well as `user_name` and/or `password`. One or both may be updated in a single request.

### Delete User
Accessable via **DELETE** request to `/api/v1/users/`<br>
In the body of the request, include `id` to identify the user.

## Character
### Get Character
Accessable via **GET** request to `/api/v1/users/character/`<br>
To show the character of a specific user, query by `userId` to identify the user.

### Update Character
Accessable via **PUT** request to `/api/v1/users/character/`<br>
In the body of the request, include `user_id` to identify the user.<br>
Include any of the following fields to update the corresponding field in the user's character: `char_name`, `level`, `xp_to_next_level`, `max_hp`, `current_hp`, `strength`, `defense`, and/or `gold`.

## Friends
### Get Friends
Accessable via **GET** request to `/api/v1/users/friends/`<br>
To show the friends list of a given user, query by `userId` to identify the user.<br>
The response will include an array of friends in the `friends` field as well as a total number of friends in the `num_friends` field.<br>
To search for a specific friend in the friends list, also quesry by `friendId`.<br>
The response will include a single friend in the `friend` field.

### Add Friend
Accessable via **POST** request to `/api/v1/users/friends/`<br>
In the body of the request, include `user_id` and `friend_id`.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field.

### Delete Friend
Accessable via **DELETE** request to `/api/v1/users/friends/`<br>
In the body of the request, include `user_id` and `friend_id`.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field.
