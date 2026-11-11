
export type WebsiteComponent =
    | {
        id: string;
        type: 'heading';
        text: string;
    }
    | {
        id: string;
        type: 'paragraph';
        text: string;
    }
    | {
        id: string;
        type: 'button';
        text: string;
    };

export interface WebsiteConfig {
    backgroundColor: string;
    components: WebsiteComponent[];
}
