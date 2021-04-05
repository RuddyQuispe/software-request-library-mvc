import { App } from './app';

/**
 * method initialize process on a port
 */
async function main(): Promise<void> {
    const app = new App(4000);
    await app.listen();
}

main();