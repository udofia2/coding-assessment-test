requirements functionalities/features/routes
1.) login
2.) Logout
3.) Register

added implementation
user persistency
home page for greeting guest user(visitors that are not registered on the websited)
profile page(for logged in users)
test
permission levels for the different routes(if you visit the registration route, you will not be able to register new visitors until you loggout any loggin user. Same with login route)

Please be careful to use the right http METHOD while testing the routes. a route that user POST method will not work with GET method

Please remember to logout before you try to use the register and login route. If you are logged in, your won't have access to the register and login route

/home route
/users list of users(protected)
/register (public)
/profile (protected)
/login (public)
/logout
