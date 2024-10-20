import laravel from 'laravel-vite-plugin'
import { defineConfig, loadEnv } from 'vite'

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        },
        plugins: [
            laravel({
                refresh: true,
                input: [
                    'resources/css/site.css',
                    'resources/js/site.js',
                ]
            })
        ],
        server: {
            // open: env.APP_URL,
            // respond to all network requests
            host: '0.0.0.0',
            port,
            strictPort: true,
            // Defines the origin of the generated asset URLs during development,
            // this will also be used for the public/hot file (Vite devserver URL)
            origin,
        }
    }
});
