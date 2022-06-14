export const navigations = [
    {
        name: 'Home',
        path: '/home',
        icon: 'home',
    },
    {
        name: 'Chat',
        path: '/room',
        icon: 'chart',
    },
    // {
    //     name: 'My profile',
    //     path: '/profile',
    //     icon: 'account_circle',
    // },
    // {
    //     name: 'Beneficiaries',
    //     path: '/benefit',
    //     icon: 'attach_money',
    // },
    // {
    //     name: 'Insured Risk',
    //     path: '/risk',
    //     icon: 'shuffle',
    // },
    // {
    //     name: 'Staked Assets',
    //     path: '/stackedassets',
    //     icon: 'dashboard',
    // },
    // {
    //     name: 'Community',
    //     path: '/community',
    //     icon: 'people',
    // },
    // {
    //     name: 'Security',
    //     path: '/security',
    //     icon: 'lock_outline',
    // },
    // {
    //     name: 'History',
    //     path: '/history',
    //     icon: 'assignment',
    // },
    // {
    //     name: 'Help',
    //     path: '/help',
    //     icon: 'live_help',
    // },
    
    {
        label: 'PAGES',
        type: 'label',
    },
    {
        name: 'Session/Auth',
        icon: 'security',
        children: [
            {
                name: 'Sign in',
                iconText: 'SI',
                path: '/session/signin',
            },
            {
                name: 'Sign up',
                iconText: 'SU',
                path: '/session/signup',
            },
            {
                name: 'Forgot Password',
                iconText: 'FP',
                path: '/session/forgot-password',
            },
            {
                name: 'Error',
                iconText: '404',
                path: '/session/404',
            },
        ],
    },
    {
        label: 'Components',
        type: 'label',
    },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            {
                name: 'Auto Complete',
                path: '/material/autocomplete',
                iconText: 'A',
            },
            {
                name: 'Buttons',
                path: '/material/buttons',
                iconText: 'B',
            },
            {
                name: 'Checkbox',
                path: '/material/checkbox',
                iconText: 'C',
            },
            {
                name: 'Dialog',
                path: '/material/dialog',
                iconText: 'D',
            },
            {
                name: 'Expansion Panel',
                path: '/material/expansion-panel',
                iconText: 'E',
            },
            {
                name: 'Form',
                path: '/material/form',
                iconText: 'F',
            },
            {
                name: 'Icons',
                path: '/material/icons',
                iconText: 'I',
            },
            {
                name: 'Menu',
                path: '/material/menu',
                iconText: 'M',
            },
            {
                name: 'Progress',
                path: '/material/progress',
                iconText: 'P',
            },
            {
                name: 'Radio',
                path: '/material/radio',
                iconText: 'R',
            },
            {
                name: 'Switch',
                path: '/material/switch',
                iconText: 'S',
            },
            {
                name: 'Slider',
                path: '/material/slider',
                iconText: 'S',
            },
            {
                name: 'Snackbar',
                path: '/material/snackbar',
                iconText: 'S',
            },
            {
                name: 'Table',
                path: '/material/table',
                iconText: 'T',
            },
        ],
    },
    {
        name: 'Charts',
        icon: 'trending_up',

        children: [
            {
                name: 'Echarts',
                path: '/charts/echarts',
                iconText: 'E',
            },
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },
]
