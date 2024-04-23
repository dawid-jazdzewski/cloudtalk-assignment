###################
# ON NESTJS DEPENDENCIES
###################

FROM node:20.5.1-alpine As nestjs-dependencies
WORKDIR $

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
COPY .eslintrc.js .

RUN npm ci

###################
# ON NESTJS BUILD
###################

FROM node:20.5.1-alpine As nestjs-build
WORKDIR $

COPY --chown=node:node ./src ./src
COPY --chown=node:node --from=nestjs-dependencies /$/node_modules ./node_modules
COPY --chown=node:node --from=nestjs-dependencies /$/package.json .
COPY --chown=node:node --from=nestjs-dependencies /$/package-lock.json .
COPY --chown=node:node --from=nestjs-dependencies /$/tsconfig.json .
COPY --chown=node:node --from=nestjs-dependencies /$/tsconfig.build.json .
COPY --chown=node:node --from=nestjs-dependencies /$/nest-cli.json .
COPY --chown=node:node --from=nestjs-dependencies /$/.eslintrc.js .

RUN npm run build

###################
# ON PRODUCTION DEPENDENCIES BUILD
###################

FROM node:20.5.1-alpine As production-dependencies
WORKDIR $

ARG GH_PAT=$GH_PAT

COPY --chown=node:node --from=nestjs-build /$/package.json .
COPY --chown=node:node --from=nestjs-build /$/package-lock.json .

RUN npm install ci --omit dev

###################
# ON PRODUCTION BUILD
###################

FROM node:20.5.1-alpine As production-build

WORKDIR $

ENV NODE_ENV production

COPY --chown=node:node --from=nestjs-build /$/dist ./dist
COPY --chown=node:node --from=nestjs-build /$/package.json ./package.json
COPY --chown=node:node --from=production-dependencies /$/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
