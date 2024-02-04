### EN - Application: advanced FullStack authentication.

## Description

The project is a fully functional, advanced FullStack authentication with secure routes on both sides (routes for non-authorized users are protected from authorized ones, routes for authorized users are protected from non-authorized ones). It includes the ability to confirm email through SMTP services. Authentication is done through JSON Web Tokens with two tokens: accessToken and refreshToken. The accessToken has a lifespan of 15 minutes, while the refreshToken has a lifespan of 30 days. Passwords are hashed, and the token refresh mechanism occurs through interceptors - in case the accessToken lifespan expires, the server sends a 401 status code response, which is intercepted by the interceptor, which then sends a request to refresh the tokens. After that, the original intercepted request is made, making the token refresh process seamless for the user.

## Routing:
* Initially, you land on the login page, where you can navigate between the login and registration pages.
* After completing the registration process, you are redirected to the account page, where user information is displayed.
* There is also a button to confirm the email if the user hasn't done so after registration. From the account page, you can navigate between the account and user list.

## Technologies:

FRONT:
* TypeScript
* React
* Sass/Scss
* Vite (Bundler)
* Axios
* MobX
* React-Router-Dom

BACK:
* Node JS
* Express
* MongoDB
* JWT
* NodeMailer


## Installation and launch of the project

- `cd ./server` `npm install` - installing dependencies for the server
- `cd ./client` `npm install` - installing dependencies for the client
- In the server folder, you need to create a .env file for environment variables and fill in the fields:
- ENV: `PORT` - the port on which the server will start
- ENV: `DB_URL` - the address to connect to the database (MongoDB)
- ENV: `JWT_KEY_ACCESS` - the key for encrypting the accessToken
- ENV: `JWT_KEY_REFRESH` - the key for encrypting the refreshToken
- ENV: `SMTP_USER` - the email address from which account confirmation messages will be sent (it needs to be pre-configured for SMTP)
- ENV: `SMTP_PASSWORD` - the password for connecting to the email from which messages are sent
- ENV: `API_URL` - the address where the server is located
- ENV: `CLIENT_URL` - the address where the client is located
- `cd ./server` `npm run dev` - starting the project (backend)
- `cd ./client` `npm run dev` - starting the project (frontend)




### RU - Приложение: продвинутая FullStack авторизация

## Описание

Проект представляет из себя полноценную, продвинутую FullStack авторизацию с защищенными роутами с обоих сторон (роуты для неавторизованных пользователей - защищенны от авторизованных, роуты для авторизованных пользователей - защищены от неавторизованных). Включена возможность подтверждения email через севрисы SMTP. Авторизация происходит через JSON Web Tokens с двумя токенами: accessToken и refreshToken, время жизни accessToken - 15 минут, время жизни refreshToken - 30d, пароли хэшируются, механизм перезаписывания токенов происходит через интерсепторы - в случае истекания времени жизни accessToken сервер присылает ответ на запрос с статус кодом 401, после этого интерсептер это перехватывает и отправляет запрос на перезаписывание токенов, после - происходит тот запрос, после которого был перехват, таким образом перезаписывание токенов становится незаметным для пользователя.

## Роутинг:
* Изначально вы попадаете на страницу логина, откуда можно переходить между страницами логина и регистрации,
* после прохождения регистрации вы попадаете на страницу аккаунта, где отображается информация о пользователе
* и кнопка подтверждения Email повторно в случае если пользователь не сделал этого после регистрации. Из страницы
* аккаунта можно переходить между аккаунтом и списком пользователей.

## Технологии:

FRONT:
* TypeScript
* React
* Sass/Scss
* Vite (Сборщик)
* Axios
* MobX
* React-Router-Dom

BACK:
* Node JS
* Express
* MongoDB
* JWT
* NodeMailer


## Установка и запуск проекта

- `cd ./server` `npm install` — установка зависимостей для сервера
- `cd ./client` `npm install` — установка зависимостей для клиента
- В папке сервера необходимо предварительно создать файл для переменных окружения `.env` и заполнить в нем поля:
- ENV: `PORT` - порт на котором будет стартовать сервер
- ENV: `DB_URL` - адресс для подключения к базе данных (MongoDB)
- ENV: `JWT_KEY_ACCESS` - ключ для шифрования accessToken
- ENV: `JWT_KEY_REFRESH` - ключ для шифрования refreshToken
- ENV: `SMTP_USER` - адресс почты с которой будут отправляться сообщения для подтверждения аккаунта (Необходимо предварительно его настроить под SMTP)
- ENV: `SMTP_PASSWORD` - пароль для подключения к почте с которой отправляются сообщения
- ENV: `API_URL` - адресс на котором находится сервер
- ENV: `CLIENT_URL` - адресс на котором находится клиент
- `cd ./server` `npm run dev` — запуск проекта (backend)
- `cd ./client` `npm run dev` — запуск проекта (frontend)
