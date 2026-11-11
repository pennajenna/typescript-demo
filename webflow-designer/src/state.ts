
import type { WebsiteConfig } from './types';

export const websiteConfig: WebsiteConfig = {
    backgroundColor: '#ffffff',
    components: [
        {
            id: 'heading-1',
            type: 'heading',
            text: 'Welcome to my website',
        },
        {
            id: 'paragraph-1',
            type: 'paragraph',
            text: 'Built with TypeScript!',
        },
        {
            id: 'button-1',
            type: 'button',
            text: 'Learn More',
        },
    ],
};

let selectedComponentId: string | null = null;

export function getSelectedComponentId(): string | null {
    return selectedComponentId;
}

export function setSelectedComponentId(id: string | null): void {
    selectedComponentId = id;
}
