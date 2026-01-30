import { appConfig } from './app-config.js';

export function applyBrandingToCSS() {
    const root = document.documentElement;
    root.style.setProperty('--border-radius', appConfig.branding.roundness);
    root.style.setProperty('--primary-color', appConfig.branding.primaryColor);
    root.style.setProperty('--font-family', appConfig.branding.fontFamily);
    root.style.setProperty('--primary-hover', appConfig.branding.primaryHover);
    root.style.setProperty('--success-color', appConfig.branding.successColor);
    root.style.setProperty('--secondary-color', appConfig.branding.secondaryColor);
    root.style.setProperty('--bg-color', appConfig.branding.bgColor);
    root.style.setProperty('--card-bg', appConfig.branding.cardBg);
    root.style.setProperty('--text-color', appConfig.branding.textColor);
    root.style.setProperty('--text-light', appConfig.branding.textLight);
    root.style.setProperty('--font-family-alt', appConfig.branding.fontFamilyAlt);
    root.style.setProperty('--shadow-sm', appConfig.branding.shadowSm);
    root.style.setProperty('--shadow-md', appConfig.branding.shadowMd);
}