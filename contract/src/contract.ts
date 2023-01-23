// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, assert, Vector } from 'near-sdk-js'
import { POINT_ONE, PostRepository } from './model'

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