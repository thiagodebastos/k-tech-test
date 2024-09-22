## Running the project locally

1. Set up Mongo using Docker Compose by running `docker compose up -d`
   from the project root. If you don't have docker compose set up on your system,
   please refer to the official documentation which you can find in
   the [#Resouces] section.

2. This repo is set up as an `npm workspace` with `turborepo`.
   You can either install `turbo` globally, or run it with `npx`:

```bash
# globally installed turbo
turbo start

# with npx
npx turbo start
```

Turbo makes it easier to manage npm workspaces. Running `turbo start` will run all npm scripts
with the name `start` in each workspace. In our case, it will run the NestJS backend and
Vite React frontend.

### Developing

1. Start the client and backend api servers:

```bash
npx turbo dev
```

2. The client app is located in `apps/client` while the api backend is located in `apps/api`

- API documentation is built with Swagger and can be accessed at [http://localhost:3000/api]()

- By using NestJS's Swagger CLI plugin, we can streamline
  API endpoint documentation and provide schemas for automated code generation with
  React Toolkit by leveraging `@rtk-query/codegen-openapi`.
  This is done by exposing the schema via a JSON file at [http://localhost:3000/api/openapi.json]()

## Notes

- Do not store secrets in a GitHub repo. I have stored there
  here for demo purposes only.

## To Do

- send user friendly error messages from backend to client.

  - for example, duplicate key errors can be sent and populate the toast notifications

- add comprehensive e2e and integration testing

  - Jest, React Testing Library and Mock Service Worker on the front-end
  - Jest and Supertest for back-end tests

- [Manage sensitive data with Docker secrets](https://docs.docker.com/engine/swarm/secrets/),
  don't hard-code secrets

- Automate redux api endpoint generation. For now, any changes to NestJS endpoints
  and types requires code to be generated for the frontend with `npm run generate:api`
  from the client app

## Resources

### Development Tools

- [Turborepo Documentation](https://turbo.build/repo/docs)

### Front-end

- [ViteJS Documentation](https://vitejs.dev/guide/)
- [ReactJS Documentation](https://react.dev/reference/react)
- [ShadCN](https://ui.shadcn.com/docs) for fast prototyping
- [tailwindcss](https://tailwindcss.com/) for fast prototyping
- [Zod](https://zod.dev/) for form schema validation
- [React Hook Form](https://react-hook-form.com/) for form management
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
  and API endpoint generation with RTKQ
  - [Code Generation for OpenAPI](https://redux-toolkit.js.org/rtk-query/usage/code-generation)

### Back-end

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn
  more about the framework.
- [Docker Compose Documentation](https://docs.docker.com/compose/)
