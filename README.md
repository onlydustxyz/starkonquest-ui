<div align="center">
  <h1 align="center">StarKonquest</h1>
  <p align="center">
    <a href="http://makeapullrequest.com">
      <img alt="pull requests welcome badge" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=onlydust_xyz">
        <img src="https://img.shields.io/twitter/follow/onlydust_xyz?style=social&logo=twitter"
            alt="follow on Twitter"></a>
    <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
            alt="License"></a>
    <a href=""><img src="https://img.shields.io/badge/semver-0.0.1-blue"
            alt="License"></a>            
  </p>
  
  <h3 align="center">StarKonquest Contracts written in Cairo for StarkNet.</h3>
</div>

StarKonquest is an educational game to learn Cairo, in which you implement ship AIs that fight each others in a finite 2D grid to catch as much dust as possible.

This repository contains the user interface to allow anyone to join a tournament and watch the battles running.
It works in combination with the [Starkonquest](https://github.com/onlydustxyz/starkonquest) repository which contains all the smart contracts needed to run a tournament.

## Prerequisite

Before starting, you need to install these tools

- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

## Install project

```bash
yarn install
```

## Copy abi files

Copy abi files from original Workshop repository [starkonquest](https://github.com/onlydustxyz/starkonquest) in the folder `src/abis`.
_You have to compile the artifacts from the project [starkonquest](https://github.com/onlydustxyz/starkonquest), before being able to copy those files._

In case both `starkonquest` and `starkonquest-ui` are located in the same directory, you can run these commands.

```bash
cp ../starkonquest/build/battle_abi.json ./src/abis/battle.json
cp ../starkonquest/build/tournament_abi.json ./src/abis/tournament.json
```

## Start FrontEnd

You can start the UI using the following command.

```bash
yarn dev
```

## Troubleshooting

### Can't register my ship because of missing starkonquest_boarding_pass token

To be able to register a ship, an wallet need to get a specific token `starkonquest_boarding_pass` which works like a whitelist to access tournaments.

To add this token to your account from ArgentX or Braavos, you need to
temporarily update the script `../starkonquest/scripts/run/setup-player.py` and replace `player.address` by your account address.
Then you can run the script to get a boarding pass.
