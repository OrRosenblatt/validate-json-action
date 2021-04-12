FROM node:12-alpine as base
WORKDIR /service

FROM base as build
COPY . ./
RUN npm ci --production true
RUN npm run build

FROM base as release
COPY --from=build /service/node_modules /service/node_modules
COPY --from=build /service/lib /service/lib
COPY --from=build /service/package.json /service
ENV NODE_ENV=production

ENTRYPOINT [ "node", "/service/lib/main.js" ]
