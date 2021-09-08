FROM node:12.10-alpine

USER nobody

# specify the working directory
WORKDIR app

# expose server and debug port
EXPOSE 3000

# run application
CMD ["node", "dist/index.js"]