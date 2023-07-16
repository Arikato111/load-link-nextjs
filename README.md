<p align="center">
    <img width="40" height="30" alt="nextjs" src="https://github.com/Arikato111/Arikato111/raw/main/icons/nextjs-original.svg">
    <img width="40" height="30" alt="tailwindcss" src="https://github.com/Arikato111/Arikato111/raw/main/icons/tailwindcss-plain.svg">
    <img width="40" height="30" alt="Typescript" src="https://github.com/Arikato111/Arikato111/raw/main/icons/typescript-original.svg">
    <img height="30" width="40" src="https://github.com/tandpfun/skill-icons/raw/main/icons/Prisma.svg" alt="prisma">
    <img width="40" height="30" alt="Mongodb" src="https://github.com/Arikato111/Arikato111/raw/main/icons/mongodb-plain.svg">

</p>

# <p align="center">load link nextjs</p>

<p align="center">
    <img alt="Github License" src="https://img.shields.io/github/license/Arikato111/load-link-nextjs" />
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/Arikato111/load-link-nextjs" />
    <img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr/Arikato111/load-link-nextjs" />
    <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/Arikato111/load-link-nextjs" />
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/Arikato111/load-link-nextjs" />
    <img alt="" src="https://img.shields.io/github/repo-size/Arikato111/load-link-nextjs" />
</p>

## Get started

- **this project is developing now.**
- clone this repository.
- `npm install` or `pnpm install`
- create `.env.local` like `.env.example`
- enter **mongodb connect** in `.env.local`
- if prisma can't db push you can try to change `.env.local` to `.env`
- `npx prisma generate` to setup prisma
- `npm run dev` or `pnpm dev` to run server in dev mode

## Inside it

- Nextjs with Typescript
- Tailwindcss [css framework]
- **prisma** and **mongodb** [Database]
- firebase
- axios
- antd
- cookie
- js-cookie
- jsonwebtoken

## TODOs

- [x] create schema

- [ ] authentication with jwt

- [ ] users

  - [ ] register
  - [ ] login
  - [ ] update profile with firebase
  - [ ] delete account

- [ ] links
  - [ ] read link
  - [ ] add link
  - [ ] edit link info
  - [ ] delete link

---

## For developers

### authentication

- create token with jwt

  - access token '/api/auth/login'
  - refresh token '/api/auth/refresh'

- check auth on server side on `headers` with `authorization`
- check auth on client side by `js-cookie`
- after login token will response to client and setCookie with `js-cookie`

```js
Cookies.set("access_token", "theToken", {
  path: "/",
  expires: new Date(Date.now() * hours(1)),
});
```

- when create cookie it need to input expires with Date()
- when want to add time use `hours(1)` or `minutes(10)` and more at `./components/lib/aboutTime.ts`

### Request api

- when sending api request it will check access token.
- if access token has expired, client must sending api request to '/api/auth/refresh'
- to get new access token and resend api request.

### Cookies

- get cookies on server side use `req.headers.authorization`
- get cookies on client side use `js-cookie`

### Api

- api is in `backend` folder with `expressjs`

### Status code

- statusCode response description here
