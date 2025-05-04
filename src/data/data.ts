interface navLink {
    name: string;
    href: string;
    icon: string;
}

export const navLinks: navLink[] = [
    {
        name: 'Inicio',
        href: '/',
        icon: 'home'
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: 'home'
    },
    
    { name: 'Nosotros', 
        href: '/nosotros', 
        icon: 'about'
    },
    { name: 'Contacto', 
        href: '/contact', 
        icon: 'help'
    }
];