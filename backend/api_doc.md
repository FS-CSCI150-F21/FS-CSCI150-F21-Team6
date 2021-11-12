# Pomo Kingdom Database API
## User
### Get User(s)
Accessable via **GET** request to `/api/v1/users/`<br>
To show list of users, query by `usersPerPage` and/or `page` (default values are 20 and 0).<br>
To access specific user, query by `userName` or `id`.

### Add User
Accessable via **POST** request to `/api/v1/users/`<br>
In the body of the request, include `user_name`, `password`, and `char_name`.

### Update User
Accessable via **PUT** request to `/api/v1/users/`<br>
In the body of the request, include `id` to identify the user to modify, as well as `user_name` and/or `password`. One or both may be updated in a single request.

### Delete User
Accessable via **DELETE** request to `/api/va/users/`<br>
In the body of the request, include `id` to identify the user.