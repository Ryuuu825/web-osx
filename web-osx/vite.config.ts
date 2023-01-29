import { sveltekit } from '@sveltejs/kit/vite';
import typescript from '@rollup/plugin-typescript';

import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), typescript()]
};

export default config;
