import { defineConfig } from 'jsrepo';

export default defineConfig({
    // configure where stuff comes from here
    registries: [],
    // configure where stuff goes here
    paths: {
        "component": './src/components',
        "components": './src/components',
        "ui": './src/components/ui',
        "hooks": './src/hooks',
        "lib": './src/lib',
        "utils": './src/lib/utils'
    },
});