// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: '技术博客',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/dac1992/tech-blog' }],
			customCss: ['./src/styles/home.css'],
			components: {
				Header: './src/components/overrides/Header.astro',
				Sidebar: './src/components/overrides/Sidebar.astro',
			},
			sidebar: [
				{
					label: 'Java',
					collapsed: false,
					items: [
						{ slug: 'java/overview' },
						{ label: '基础语法', collapsed: true, items: [{ autogenerate: { directory: 'java/basics' } }] },
						{ label: '常用框架', collapsed: true, items: [{ autogenerate: { directory: 'java/frameworks' } }] },
						{ label: '进阶专题', collapsed: true, items: [{ autogenerate: { directory: 'java/advanced' } }] },
					],
				},
				{
					label: 'Rust',
					collapsed: true,
					items: [
						{ slug: 'rust/overview' },
						{ label: '基础语法', collapsed: true, items: [{ autogenerate: { directory: 'rust/basics' } }] },
						{ label: '常用框架', collapsed: true, items: [{ autogenerate: { directory: 'rust/frameworks' } }] },
						{ label: '进阶专题', collapsed: true, items: [{ autogenerate: { directory: 'rust/advanced' } }] },
					],
				},
				{
					label: 'Go',
					collapsed: true,
					items: [
						{ slug: 'go/overview' },
						{ label: '基础语法', collapsed: true, items: [{ autogenerate: { directory: 'go/basics' } }] },
						{ label: '常用框架', collapsed: true, items: [{ autogenerate: { directory: 'go/frameworks' } }] },
						{ label: '进阶专题', collapsed: true, items: [{ autogenerate: { directory: 'go/advanced' } }] },
					],
				},
				{
					label: 'Python',
					collapsed: true,
					items: [
						{ slug: 'python/overview' },
						{ label: '基础语法', collapsed: true, items: [{ autogenerate: { directory: 'python/basics' } }] },
						{ label: '常用框架', collapsed: true, items: [{ autogenerate: { directory: 'python/frameworks' } }] },
						{ label: '进阶专题', collapsed: true, items: [{ autogenerate: { directory: 'python/advanced' } }] },
					],
				},
			],
		}),
	],
});
