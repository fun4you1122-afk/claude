# Node.js Docker Setup

Docker has specific installation instructions for each operating system.
Please refer to the official documentation at https://docker.com/get-started/

## Pull the Node.js Docker image

```sh
docker pull node:24-slim
```

## Create a Node.js container and start a Shell session

```sh
docker run -it --rm --entrypoint sh node:24-slim
```

## Verify the Node.js version

```sh
node -v # Should print "v24.15.0".
```

## Verify npm version

```sh
npm -v # Should print "11.12.1".
```
