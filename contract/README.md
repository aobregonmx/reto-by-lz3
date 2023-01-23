# RetoLaZonaTres NEAR Contract

El smart contract expone dos metodos que permiten almacenar un url y obtener una colección de urls en la red de NEAR

```ts
@NearBindgen({})
class RetoNearLZ3 {
  repositories: Vector<PostRepository> = new Vector<PostRepository>("v-uid");

  @view({}) // This method is read-only and can be called for free
  get_repositories({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): PostRepository[] {
    return this.repositories.toArray().slice(from_index, from_index + limit);
  }

  /**
    * You need to send 0.1 NEAR as payment to this method.
    * Since we are going to accept payments with this method, we mark it as payableFunction.
   */

  @call({ payableFunction: true })
  add_repository({ url }: { url: string }) {
    const cuenta = near.signerAccountId();
    const deposito = near.attachedDeposit();

    // Validations
    assert(deposito >= BigInt(POINT_ONE), "Debes de pagar al menos 0.1 NEAR para registrar su repositorio.");
    const repository: PostRepository = { url, cuenta };
    this.repositories.push(repository);

    // We send a confirmation message to the console.
    near.log(`Registro exitoso del repositorio: ${url}`);
  }
}
```

<br />

# Quickstart

1. Make sure you have installed [node.js](https://nodejs.org/en/download/package-manager/) >= 16.
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

## 1. Build and Deploy the Contract
You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
npm run deploy
```

Once finished, check the `neardev/dev-account` file to find the address in which the contract was deployed:

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<br />

## 2. Retrieve the repositories

`get_repositories` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the repositories
near view <dev-account> get_repositories
```

<br />

## 3. Store a New Repository
`set_greeting` changes the contract's state, for which it is a `call` method.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to set a new greeting
near call <dev-account> add_repositiry '{"url":"https://github.com/~"}' --accountId <dev-account> --amount <near>
```

**Tip:** If you would like to call `add_repositiry` using your own account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <your-account>`.