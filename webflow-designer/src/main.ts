
type WebsiteComponent =
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


interface WebsiteConfig {
  backgroundColor: string;
  components: WebsiteComponent[];
}

const websiteConfig: WebsiteConfig = {
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

const backgroundColorInput = document.querySelector<HTMLInputElement>(
  '#backgroundColorInput'
);


const componentEditor = document.querySelector<HTMLDivElement>(
  '#componentEditor'
);

const componentTextInput = document.querySelector<HTMLInputElement>(
  '#componentTextInput'
);


let selectedComponentId: string | null = null;

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
    element.dataset.componentId = component.id;

    if (component.id === selectedComponentId) {
      element.classList.add('selected-component');
    }

    element.addEventListener('click', () => {
      selectedComponentId = component.id;

      if (componentEditor && componentTextInput) {
        componentEditor.hidden = false;
        componentTextInput.value = component.text;
      }

      renderWebsite(websiteConfig);
    });

    preview.appendChild(element);

  });
}

backgroundColorInput?.addEventListener('input', () => {
  websiteConfig.backgroundColor = backgroundColorInput.value;
  renderWebsite(websiteConfig);
});


const addParagraphButton =
  document.querySelector<HTMLButtonElement>(
    '#addParagraphButton'
  );

addParagraphButton?.addEventListener('click', () => {
  const newParagraph: WebsiteComponent = {
    id: crypto.randomUUID(),
    type: 'paragraph',
    text: 'This is a new paragraph.',
  };

  websiteConfig.components.push(newParagraph);

  renderWebsite(websiteConfig);
});


componentTextInput?.addEventListener('input', () => {
  const selectedComponent = websiteConfig.components.find(
    (component) => component.id === selectedComponentId
  );

  if (!selectedComponent) {
    return;
  }

  selectedComponent.text = componentTextInput.value;

  renderWebsite(websiteConfig);
});


renderWebsite(websiteConfig);
