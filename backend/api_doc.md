# Pomo Kingdom Database API
## User
### Get user(s)
Accessable via **GET** request to `/api/v1/users/`<br>
To show list of users, query by `usersPerPage` and/or `page` (default values are 20 and 0).<br>
To access specific user, query by `userName` or `id`.

### Add user
Accessable via **POST** request to `/api/v1/users/`<br>
In the body of the request, include `user_name`, `password`, and `char_name`.
