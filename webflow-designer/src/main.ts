
import type {
  WebsiteComponent,
  WebsiteConfig,
} from './types';


import {
  websiteConfig,
  getSelectedComponentId,
  setSelectedComponentId,
} from './state';

import { renderWebsite } from './renderer';

import {
  saveDesign,
  loadDesign,
} from './storage';


const backgroundColorInput = document.querySelector<HTMLInputElement>(
  '#backgroundColorInput'
);

const componentEditor = document.querySelector<HTMLDivElement>(
  '#componentEditor'
);

const componentTextInput = document.querySelector<HTMLInputElement>(
  '#componentTextInput'
);

const preview = document.querySelector<HTMLDivElement>('#preview');

function handleComponentSelect(component: WebsiteComponent): void {
  setSelectedComponentId(component.id);

  if (componentEditor && componentTextInput) {
    componentEditor.hidden = false;
    componentTextInput.value = component.text;
  }

  renderWebsite(websiteConfig, handleComponentSelect);
}


backgroundColorInput?.addEventListener('input', () => {
  websiteConfig.backgroundColor = backgroundColorInput.value;
  renderWebsite(websiteConfig, handleComponentSelect);
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

  renderWebsite(websiteConfig, handleComponentSelect);
});


componentTextInput?.addEventListener('input', () => {
  const selectedComponent = websiteConfig.components.find(
    (component) => component.id === getSelectedComponentId()
  );

  if (!selectedComponent) {
    return;
  }

  selectedComponent.text = componentTextInput.value;

  renderWebsite(websiteConfig, handleComponentSelect);
});


const moveUpButton = document.querySelector<HTMLButtonElement>(
  '#moveUpButton'
);

const moveDownButton = document.querySelector<HTMLButtonElement>(
  '#moveDownButton'
);

const deleteButton = document.querySelector<HTMLButtonElement>(
  '#deleteButton'
);

// Move a component within the array
function moveComponent(direction: -1 | 1): void {
  const index = websiteConfig.components.findIndex(
    (component) => component.id === getSelectedComponentId()
  );

  if (index === -1) return;

  const newIndex = index + direction;

  if (
    newIndex < 0 ||
    newIndex >= websiteConfig.components.length
  ) {
    return;
  }

  const [component] = websiteConfig.components.splice(index, 1);

  websiteConfig.components.splice(newIndex, 0, component);

  renderWebsite(websiteConfig, handleComponentSelect);
}

moveUpButton?.addEventListener('click', () => {
  moveComponent(-1);
});

moveDownButton?.addEventListener('click', () => {
  moveComponent(1);
});

deleteButton?.addEventListener('click', () => {
  websiteConfig.components = websiteConfig.components.filter(
    (component) => component.id !== getSelectedComponentId()
  );

  setSelectedComponentId(null);

  if (componentEditor) {
    componentEditor.hidden = true;
  }

  renderWebsite(websiteConfig, handleComponentSelect);
});

const saveButton = document.querySelector<HTMLButtonElement>(
  '#saveButton'
);

const loadButton = document.querySelector<HTMLButtonElement>(
  '#loadButton'
);

const saveStatus = document.querySelector<HTMLParagraphElement>(
  '#saveStatus'
);


saveButton?.addEventListener('click', () => {
  try {
    saveDesign(websiteConfig);

    if (saveStatus) {
      saveStatus.textContent = 'Design saved successfully!';
    }
  } catch {
    if (saveStatus) {
      saveStatus.textContent = 'Unable to save design.';
    }
  }
});

loadButton?.addEventListener('click', () => {
  try {
    const savedConfig = loadDesign();

    if (!savedConfig) {
      if (saveStatus) {
        saveStatus.textContent = 'No saved design found.';
      }
      return;
    }

    websiteConfig.backgroundColor = savedConfig.backgroundColor;
    websiteConfig.components = savedConfig.components;

    setSelectedComponentId(null);

    if (componentEditor) {
      componentEditor.hidden = true;
    }

    if (backgroundColorInput) {
      backgroundColorInput.value = websiteConfig.backgroundColor;
    }

    renderWebsite(websiteConfig, handleComponentSelect);

    if (saveStatus) {
      saveStatus.textContent = 'Design loaded successfully!';
    }
  } catch {
    if (saveStatus) {
      saveStatus.textContent = 'Unable to load design.';
    }
  }
});

renderWebsite(websiteConfig, handleComponentSelect);
