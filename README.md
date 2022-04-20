# Cairo Workshop UI

This project is a user interface to better visualize data from the [Starknet Onboarding Workshop](https://github.com/onlydustxyz/starknet-onboarding)

## Prerequisite

Before starting, you need to install these tools

- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

## Install project 

```bash
yarn install
```

## Copy abi files

Copy abi files from original Workshop repository [starknet-onboarding](https://github.com/onlydustxyz/starknet-onboarding) in the folder `src/abis`.
_You have to compile the artifacts from the project [starknet-onboarding](https://github.com/onlydustxyz/starknet-onboarding), before being able to copy those files._

## Set contract addresses

Copy contract addresses created by the command `nile run scripts/deploy.py` in the file `src/config.ts`.

## Start FrontEnd

You can start the UI using the following command.

```bash
yarn dev
```