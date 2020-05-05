# NestJS REST API boilerplate

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

### REST Api boilerplate with TypeORM, Postgres, passport jwt auth and swagger. Built over NestJS [Nest](https://github.com/nestjs/nest)

## Installation

```bash

# Create environment files
$ cp .database.env.example .database.env && cp .env.example .env

# Install packages and deps
$ yarn install

# Start postgres server, db and pgAdmin
$ docker-compose up

```

## Running the app

```bash

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# build&run mode (used to fix some hot reload issues)
$ yarn build && yarn start

```

## Test

- *Not ready* --> _Pending_

## Roadmap

- Review and refactor some code --> _In progress_
- Add recover password functionality --> _In progress_
- Add testing with Jest --> _Pending_
- Dockerfile for app and add service on docker-compose --> _Pending_
- Add cache service --> _Pending_
- Improve swagger doc --> _Pending_
- Improve docs --> _Pending_

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch with Nest

- Nest - Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Nest - Website - [https://nestjs.com](https://nestjs.com/)
- Nest - Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
