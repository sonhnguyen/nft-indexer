# NFT Indexer

This is a RESTful API server for querying various data of NFTs aggregated by multiple popular sources (OpenSea, Alchemy, ...).

## Overview

The NFT Indexer API server provides functionalities to query and retrieve data related to NFT collections, including ownership information, sales history, and general statistics.

## API References

For convenience, if you using Postman you can import the collection at `nft-indexer.postman_collection.json`.

The backend is temporarily deployed at `157.230.252.99`

### Authentication

#### Login

`POST http://157.230.252.99/login`

- Input:
  - `username` (string): The username for authentication.

- Output:
  - `token` (string): A JSON Web Token (JWT) used for subsequent authenticated requests.

  ```json
  {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsImlhdCI6MTY5NjU0NzU5NywiZXhwIjoxNzA1MTg3NTk3fQ.-80e3exuYg3qm70U_n5zN4qU97ZUW76Oyu5l85kyLHY"
  }

### Collection Endpoints

#### Get Collection Information

`GET http://157.230.252.99/collection/:contractAddress`

- Input:
  - `contractAddress` (string): The address of the NFT contract.

- Authentication: Required (JWT token)

- Output:
  - JSON object containing information about the NFT collection, such as the collection name, contract address, and other relevant details.
  ```json
  {
      "name": "Bored Ape Yacht Club",
      "slug": "boredapeyachtclub",
      "description": "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.",
      "featuredImageUrl": "https://i.seadn.io/gae/RBX3jwgykdaQO3rjTcKNf5OVwdukKO46oOAV3zZeiaMb8VER6cKxPDTdGZQdfWcDou75A8KtVZWM_fEnHG4d4q6Um8MeZIlw79BpWPA?w=500&auto=format",
      "fee": 500,
      "imageUrl": "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format",
      "largeImageUrl": "https://i.seadn.io/gae/RBX3jwgykdaQO3rjTcKNf5OVwdukKO46oOAV3zZeiaMb8VER6cKxPDTdGZQdfWcDou75A8KtVZWM_fEnHG4d4q6Um8MeZIlw79BpWPA?w=500&auto=format",
      "externalLink": "http://www.boredapeyachtclub.com/"
  }

#### Get Collection Statistics

`GET http://157.230.252.99/collection/:contractAddress/stats`

- Input:
  - `contractAddress` (string): The address of the NFT contract.

- Authentication: Required (JWT token)

- Output:
  - JSON object representing statistics about the NFT collection, including the volume, sales, average price, unique holders, floor price across different intervals.
  - Example:
  ````json
  {
      "volume": 1293696.377596656,
      "sales": 39430,
      "averagePrice": 32.80995124515993,
      "numOwners": 5567,
      "marketCap": 262230.3420797279,
      "floorPrice": 26.99,
      "floorPriceSymbol": "ETH",
      "totalSupply": 9998,
      "statsByIntervals": [
          {
              "interval": "oneDay",
              "volume": 685.90995,
              "volumeDiff": 261.04045,
              "volumeChange": 0.6144014809253195,
              "sales": 25,
              "salesDiff": 0.6666666666666666,
              "averagePrice": 27.436398
          },
          {
              "interval": "oneWeek",
              "volume": 3855.5571400000003,
              "volumeDiff": -3116.929960000009,
              "volumeChange": -0.44703273240907176,
              "sales": 147,
              "averagePrice": 26.22827986394558
          },
          {
              "interval": "oneMonth",
              "volume": 23512.69234000002,
              "volumeDiff": -10149.60429802322,
              "volumeChange": -0.30151253217104435,
              "sales": 915,
              "averagePrice": 25.696931519125705
          }
      ]
  }

#### Get Collection Holders

`GET http://157.230.252.99/collection/:contractAddress/holders`

- Input:
  - `contractAddress` (string): The address of the NFT contract.

- Authentication: Required (JWT token)

- Output:
  - JSON array containing objects representing the top holders of tokens in the collection. Each object includes the holder's address and the number of tokens they possess.
  - Example:
  ```json
  {
    "collectionHolders": [{
      "address": "0xffe313ea5ae56f677aa1b4ae0f35c5296f5a7edd",
      "holdingBalance": 1,
      "holdingIds": [
          609
      ]
    }]
  }
  ```

#### Get NFTs in Collection

`GET http://157.230.252.99/collection/:contractAddress/nfts`

- Input:
  - `contractAddress` (string): The address of the NFT contract.
  - `next` (string): The cursor for the next page of results. This is returned from a previous request.

- Authentication: Required (JWT token)

- Output:
  - JSON array containing detailed information about the NFTs in the collection. Each object represents an NFT and includes properties such as token ID, name, attributes, and metadata.
  - Example:
  ```json
  {
      "nfts": [
          {
              "identifier": "96618923974388205241996055621262658944527698167114540048478317136137327993589",
              "collection": "boredapeyachtclub",
              "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              "tokenStandard": "erc721",
              "name": "boredapeyachtclub #96618923974388205241996055621262658944527698167114540048478317136137327993589",
              "description": null,
              "imageUrl": null,
              "metadataUrl": null
          }
      ],
      "next": "LXBrPTIzMTQzNzAz"
  }
  ```
#### Get NFT by Token ID

`GET http://157.230.252.99/collection/:contractAddress/nfts/:tokenId`

- Input:
  - `contractAddress` (string): The address of the NFT contract.
  - `tokenId` (string): The ID of the specific NFT token.

- Authentication: Required (JWT token)

- Output:
  - JSON object representing the detailed information about the specified NFT, including its name, attributes, and other associated metadata.
  - Example:

  ```json
  {
      "tokenId": "5888",
      "collection": "boredapeyachtclub",
      "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      "tokenStandard": "erc721",
      "name": "boredapeyachtclub #5888",
      "description": null,
      "imageUrl": "https://ipfs.io/ipfs/QmdaEYfLcbGdmuyWq2AcRRGUYnH6tQaHGf27A52qgch3zR",
      "metadataUrl": "https://opensea.mypinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/5888",
      "creator": "0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03",
      "traits": [
          {
              "traitType": "Eyes",
              "value": "Sad"
          },
          {
              "traitType": "Background",
              "value": "Aquamarine"
          },
          {
              "traitType": "Fur",
              "value": "Dark Brown"
          },
          {
              "traitType": "Clothes",
              "value": "Black Holes T"
          },
          {
              "traitType": "Mouth",
              "value": "Phoneme Vuh"
          }
      ],
      "owners": [
          {
              "address": "0x951ef0c6718ee35a7c1fcac85f750c14ab19952b",
              "quantity": 1
          }
      ],
      "rarity": 8235
  }


#### Get NFT Sales by Token ID

`GET http://157.230.252.99/collection/:contractAddress/nfts/:tokenId/sales`

- Input:
  - `contractAddress` (string): The address of the NFT contract.
  - `tokenId` (string): The ID of the specific NFT token.

- Authentication: Required (JWT token)

- Output:
  - JSON array containing the price history of the specified NFT, including the sale prices and corresponding timestamps.
  - Example
  ```json
  {
      "sales": [
          {
              "marketplace": "wyvern",
              "contractAddress": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              "tokenId": "5888",
              "quantity": "1",
              "buyerAddress": "0x4ce96aacbf4a605084d757141be016de8431b285",
              "sellerAddress": "0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459",
              "taker": "buyer",
              "sellerFee": {
                  "amount": "551000000000000000",
                  "tokenAddress": "0x0000000000000000000000000000000000000000",
                  "symbol": "ETH",
                  "decimals": 18
              },
              "protocolFee": {
                  "amount": "14500000000000000",
                  "tokenAddress": "0x0000000000000000000000000000000000000000",
                  "symbol": "ETH",
                  "decimals": 18
              },
              "royaltyFee": {
                  "amount": "14500000000000000",
                  "tokenAddress": "0x0000000000000000000000000000000000000000",
                  "symbol": "ETH",
                  "decimals": 18
              },
              "blockNumber": 12529605,
              "transactionHash": "0x761f40875096472caad61ecfb2b13a40ca8f82bd1c8b139a4a7015ed3319fb3b"
          }
      ]
  }

#### Get NFT Ownership History by Token ID

`GET http://157.230.252.99/collection/:contractAddress/nfts/:tokenId/ownerships`

- Input:
  - `contractAddress` (string): The address of the NFT contract.
  - `tokenId` (string): The ID of the specific NFT token.

- Authentication: Required (JWT token)

- Output:
  - JSON array containing the ownership history of the specified NFT, including the previous owners and the corresponding timestamps.
  - Example:

  ```json
  {
      "currentHoldingTime": 1340409,
      "averageHoldingTime": 1783495846.7209303,
      "ownerships": [
          {
              "event_type": "transfer",
              "chain": "ethereum",
              "transaction": "0x55122fc1ef96b731f81438a50ce081d9338894db118c58d2b1d65cc3eab95f4b",
              "from_address": "0x0097b9cfe64455eed479292671a1121f502bc954",
              "to_address": "0x951ef0c6718ee35a7c1fcac85f750c14ab19952b",
              "quantity": 1,
              "timestamp": 1696544735000,
              "holdingTime": 29328000
          },
      ]
  }


## Development

This project is developed using TypeScript and comes with a collection of npm scripts to facilitate the development process. You can run these scripts using the command `npm run <script name>`:

- `build`: Builds the project to the `dist/` folder and performs linting.
- `serve`: Starts the server using the `dist/server.js` file.
- `test`: Runs all tests located in the `tests/` directory.
- `watch`: Serves the application and hot-reloads the server when changes are detected.

**To build and serve or watch the server**:
```
cp .env.sample .env

npm install
npm run build
npm run serve
npm run watch
```

**To run tests**:
```
npm install
npm run test
```
