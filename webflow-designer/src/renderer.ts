
import type { WebsiteConfig, WebsiteComponent } from './types';
import { getSelectedComponentId } from './state';

export function renderWebsite(
    config: WebsiteConfig,
    onSelect: (component: WebsiteComponent) => void
): void {
    const preview = document.querySelector<HTMLDivElement>(
        '#preview'
    );

    if (!preview) return;

    preview.replaceChildren();
    preview.style.backgroundColor = config.backgroundColor;

    config.components.forEach((component) => {
        let element: HTMLElement;

        switch (component.type) {
            case 'heading':
                element = document.createElement('h1');
                break;

            case 'paragraph':
                element = document.createElement('p');
                break;

            case 'button':
                element = document.createElement('button');
                break;
        }

        element.textContent = component.text;
        element.dataset.componentId = component.id;

        if (component.id === getSelectedComponentId()) {
            element.classList.add('selected-component');
        }

        element.addEventListener('click', () => {
            onSelect(component);
        });

        preview.appendChild(element);
    });
}
