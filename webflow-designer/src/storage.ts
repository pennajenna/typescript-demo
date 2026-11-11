
import type { WebsiteConfig } from './types';

const STORAGE_KEY = 'mini-webflow-design';

// Validate data loaded from storage
export function isWebsiteConfig(
    value: unknown
): value is WebsiteConfig {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (
        !('backgroundColor' in value) ||
        typeof value.backgroundColor !== 'string'
    ) {
        return false;
    }

    if (
        !('components' in value) ||
        !Array.isArray(value.components)
    ) {
        return false;
    }

    return value.components.every((component: unknown) => {
        if (typeof component !== 'object' || component === null) {
            return false;
        }

        if (
            !('id' in component) ||
            typeof component.id !== 'string'
        ) {
            return false;
        }

        if (
            !('text' in component) ||
            typeof component.text !== 'string'
        ) {
            return false;
        }

        if (!('type' in component)) {
            return false;
        }

        return (
            component.type === 'heading' ||
            component.type === 'paragraph' ||
            component.type === 'button'
        );
    });
}

// Save configuration
export function saveDesign(config: WebsiteConfig): void {
    const json = JSON.stringify(config);
    localStorage.setItem(STORAGE_KEY, json);
}

// Load configuration
export function loadDesign(): WebsiteConfig | null {
    const savedJson = localStorage.getItem(STORAGE_KEY);

    if (!savedJson) {
        return null;
    }

    const parsed: unknown = JSON.parse(savedJson);

    if (!isWebsiteConfig(parsed)) {
        throw new Error('Invalid saved configuration');
    }

    return parsed;
}
