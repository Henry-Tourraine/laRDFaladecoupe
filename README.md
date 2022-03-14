This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install

```
Then, launch the hardhat blockchain on localhost and deploy the contract.

```bash
cd webthree
npx hardhat node
npx hardhat run scripts/deploy --network localhost

```

it will output the contract address:
```bash
Election2022 has been deployed to 0x2222222...

```

Paste it in the next.config.js in the var "contract_address".

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

You can follow [the Facebook page](https://www.facebook.com/Elections-2022-105192315464099) that will be active until the 1st May of 2022:
