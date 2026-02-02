export interface AppFeatures {
    useExternalApi: boolean;
    helpButton: boolean;
    advancedEdit: boolean;
}

export interface AppInfo {
    version: string;
    name: string;
}

export interface Branding {
    roundness: string;
    primaryColor: string;
    primaryHover: string;
    successColor: string;
    secondaryColor: string;
    bgColor: string;
    cardBg: string;
    textColor: string;
    textLight: string;
    borderRadius: string;
    fontFamilyAlt: string;
    shadowSm: string;
    shadowMd: string;
    fontFamily: string;
}

export interface AppConfig {
    appName: string;
    features: AppFeatures;
    app: AppInfo;
    branding: Branding;
}

export const AppConfig = {
    appName: 'To-Do List App',

    features: {
        useExternalApi: true,
        helpButton: true,
        advancedEdit: true,
    },

    app: {
        version: '0.6.0',
        name: 'To-Do List App'
    },

    branding: {
        roundness: '8px',
        primaryColor: '#006aff',
        primaryHover: '#0056b3',
        successColor: '#28a745',
        secondaryColor: '#00ff48',
        bgColor: '#f4f7f6',
        cardBg: '#ffffff',
        textColor: '#333',
        textLight: '#777',
        borderRadius: '8px',
        fontFamilyAlt: "'Segoe UI', Tahoma, sans-serif",
        shadowSm: '0 2px 5px rgba(0,0,0,0.05)',
        shadowMd: '0 4px 10px rgba(0,0,0,0.1)',
        fontFamily: 'Roboto, sans-serif',
    }
};