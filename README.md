# api-service-name

## Setup

### To Run

- To run once
  - `npm start` -> Cleans, builds and starts the server
  - `npm run dev` -> does everything in watch mode

### Technology Used

- Programming Language: `Typescript`
  - Compiled via `SWC`
  - TS files are watched (using `chokidar`) and transpiled in watch mode
- Templating Language: `EJS`
- Framework Used - `Express.js` for node.js runtime
  - Nodemon monitors for js file changes in dist and re-starts the server
- CSS For Views -> `Tailwind` using `postcss`
- Jest for Unit Tests

## Supported Features

### DX

- Incoming Data
  - parses JSON body
  - url encoding
  - has cookie parsers
  - supports method overrides via below for post methods
    - ?\_method=
    - X-HTTP-Method
    - X-HTTP-Method-Override
    - X-Method-Override
  - Cors
  - CSP Headers using helmet
  - Response Time Header
  - Disables `x-powered-by`
  - Logs Request
  - CSUF
  - Supports EJS Views
  - Static assets serving under `/public` from public folder
  - OpenAPI/Swagger Docs at `/api-docs`
    - Configured with Bearer Token Auth
  - K8 Health Checks at `/probes/health` and `/probes/ready`
  - 404 pages
  - Error pages
  - Versioned API at `/api/v1/...`
  - Auth Verification using JWT Token. Samples at `/api/v1/samples/protected/..`
    - Eg: `/api/v1/samples/protected/`
  - JWT Token Generation
    - With - jti, nbf, iat, exp, aud, iss
  - `test.http` file for REST Client Extension

### Runtime

- Node.js with ESM Module

## Auth

- Few sample apis are protected using JWT
- They expect the Bearer token to be passed in Authoriztion Header

To Generate A JWT Token, use [JWT Token Debugger](https://jwt.io/#debugger-io)

Sample:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhZG1pbiI6dHJ1ZX0.8d4NHbv9dJcaq7VzkMr8kO7kNiQLrWfQYfw-ExUNYOw

Payload:
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "admin": true
}

Secret:
some-jwt-secret
```
