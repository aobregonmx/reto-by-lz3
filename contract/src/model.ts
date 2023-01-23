export const POINT_ONE = '100000000000000000000000';

export class PostRepository {
    url: string;
    cuenta: string;

    constructor({ url, cuenta }: PostRepository) {
        this.cuenta = cuenta;
        this.url = url;
    }
}