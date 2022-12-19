export interface RouterLink {
    name: string;
    path: string;
    title: string;
}

export const routerLinks: RouterLink[] = [
    { path: '/', name: 'Home', title: 'Inicio' },
    { path: '/about', name: 'About', title: 'Sobre' },
    { path: '/characters', name: 'Characters', title: 'Personajes' },
]
