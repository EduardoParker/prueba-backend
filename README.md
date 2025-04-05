Se hace proyecto backend en Nest.js y coneccion mongoose para base de datos NoSQL mongoDb.
Esta base de datos contiene  4 colecciones:
- Users que admite datos como son email y password (password se guarda encriptado con hash para seguridad)
- Trucks que admite datos user (id de user), year. color y plates.
- Location que admite el deato de place_ID y convierte este dato a address, latitude y longitude.
- Orders esta coleccion tiene datos de user (id del user), truck (id del truck), status (enum created, in transit o completed), pickup (id de location) y dropoff (id de location)


esta API esta compuesta de las siguientes rutas
las unicas rutas que se pueden acceder sin un token, son /user/register y /auth/login

/users/register
esta ruta es un POST con un body {"email" : email@email.com, "password": password1} cuando el usuario se registra se crea un nuevo user en la coleccion User

/auth/login
esta ruta es un POST que busca el email de usuario, si lo encuentra el servido responde un Token con payload con informacion del email y contraseña del usuario

cabe destacar, que si el usuario no esta registrado o no tiene el token, las direcciones o colecciones Orders, Trucks y Location, estan protegidas con JwtAuthGuard

rutas protegidas son las siguientes por lo que se tiene que agregar un Auth en el header (token) para tener acceso :
/trucks
Es un metodo GET el cual devuelve un JSON con todos los trucks de la base de datos
acepta un metodo POST para añadir un nevo truck a la coleccion Trucks

/trucks/:id
se añade el Id de un registro truck a la ruta, para actualizar el dato pasado, puede ser el year, color o plate o todos juntos
tambien con esta estructura se puede borrar el truck del id pasado

/locations
acepta un request POST para añadir un nuevo location pasando solo el place_id
con GET se retornan todos los registros en la coleccion locations

/locations/:id
se añade el Id de un registro location a la rua, para actualizar el dato pasado
tambien con esta estructura se puede borrar la location del id pasado

/orders
Es un metodo GET el cual devuelve un JSON con todos los orders de la base de datos
acepta un metodo POST para añadir una nueva location a la coleccion location.

/orders/:id/status
acepta un metodo Put para actualizar el status de la orden.

concidere que no es necesario un archivo .env ya que lo lo desplegariamos a produccion, solo es un archivo de prueba.

