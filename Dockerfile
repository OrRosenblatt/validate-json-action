FROM node:12-alpine as base
WORKDIR /service

FROM base as dependencies
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --production true

FROM dependencies as build
RUN npm ci --production false
COPY . ./
RUN npm run build
RUN npm run test

FROM base as release
COPY --from=dependencies /service/node_modules /service/node_modules
COPY --from=build /service/lib /service/lib
COPY --from=build /service/package.json /service
ENV NODE_ENV=production

ENTRYPOINT [ "node", "/service/lib/main.js" ]