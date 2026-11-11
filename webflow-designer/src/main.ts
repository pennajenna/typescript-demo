
type WebsiteComponent =
  | {
    type: 'heading';
    text: string;
  }
  | {
    type: 'paragraph';
    text: string;
  }
  | {
    type: 'button';
    text: string;
  };

interface WebsiteConfig {
  backgroundColor: string;
  components: WebsiteComponent[];
}

const websiteConfig: WebsiteConfig = {
  backgroundColor: '#ffffff',
  components: [
    { type: 'heading', text: 'Welcome to my website' },
    { type: 'paragraph', text: 'Built with TypeScript!' },
    { type: 'button', text: 'Learn More' },
  ],
};

const headingInput = document.querySelector<HTMLInputElement>(
  '#headingInput'
);

const backgroundColorInput = document.querySelector<HTMLInputElement>(
  '#backgroundColorInput'
);

const preview = document.querySelector<HTMLDivElement>('#preview');

function renderWebsite(config: WebsiteConfig): void {
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
    preview.appendChild(element);
  });
}

headingInput?.addEventListener('input', () => {
  const heading = websiteConfig.components.find(
    (component) => component.type === 'heading'
  );

  if (heading) {
    heading.text = headingInput.value;
    renderWebsite(websiteConfig);
  }
});

backgroundColorInput?.addEventListener('input', () => {
  websiteConfig.backgroundColor = backgroundColorInput.value;
  renderWebsite(websiteConfig);
});

renderWebsite(websiteConfig);
