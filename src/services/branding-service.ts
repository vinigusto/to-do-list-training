import { AppConfig } from './app-config';

export function applyBrandingToCSS() {
    const root = document.documentElement;
    root.style.setProperty('--border-radius', AppConfig.branding.roundness);
    root.style.setProperty('--primary-color', AppConfig.branding.primaryColor);
    root.style.setProperty('--font-family', AppConfig.branding.fontFamily);
    root.style.setProperty('--primary-hover', AppConfig.branding.primaryHover);
    root.style.setProperty('--success-color', AppConfig.branding.successColor);
    root.style.setProperty('--secondary-color', AppConfig.branding.secondaryColor);
    root.style.setProperty('--bg-color', AppConfig.branding.bgColor);
    root.style.setProperty('--card-bg', AppConfig.branding.cardBg);
    root.style.setProperty('--text-color', AppConfig.branding.textColor);
    root.style.setProperty('--text-light', AppConfig.branding.textLight);
    root.style.setProperty('--font-family-alt', AppConfig.branding.fontFamilyAlt);
    root.style.setProperty('--shadow-sm', AppConfig.branding.shadowSm);
    root.style.setProperty('--shadow-md', AppConfig.branding.shadowMd);
}