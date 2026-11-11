
import type { WebsiteComponent } from './types';

import {
  websiteConfig,
  getSelectedComponentId,
  setSelectedComponentId,
} from './state';

import { renderWebsite } from './renderer';
import { saveDesign, loadDesign } from './storage';

// DOM references
const backgroundColorInput =
  document.querySelector<HTMLInputElement>(
    '#backgroundColorInput'
  );

const addParagraphButton =
  document.querySelector<HTMLButtonElement>(
    '#addParagraphButton'
  );

const componentEditor =
  document.querySelector<HTMLDivElement>(
    '#componentEditor'
  );

const componentTextInput =
  document.querySelector<HTMLInputElement>(
    '#componentTextInput'
  );

const moveUpButton =
  document.querySelector<HTMLButtonElement>(
    '#moveUpButton'
  );

const moveDownButton =
  document.querySelector<HTMLButtonElement>(
    '#moveDownButton'
  );

const deleteButton =
  document.querySelector<HTMLButtonElement>(
    '#deleteButton'
  );

const saveButton =
  document.querySelector<HTMLButtonElement>(
    '#saveButton'
  );

const loadButton =
  document.querySelector<HTMLButtonElement>(
    '#loadButton'
  );

const saveStatus =
  document.querySelector<HTMLParagraphElement>(
    '#saveStatus'
  );

// Component selection
function handleComponentSelect(component: WebsiteComponent): void {
  setSelectedComponentId(component.id);

  if (componentEditor && componentTextInput) {
    componentEditor.hidden = false;
    componentTextInput.value = component.text;
  }

  renderWebsite(websiteConfig, handleComponentSelect);
}

// Edit selected component
componentTextInput?.addEventListener('input', () => {
  const component = websiteConfig.components.find(
    (item) => item.id === getSelectedComponentId()
  );

  if (!component) return;

  component.text = componentTextInput.value;
  renderWebsite(websiteConfig, handleComponentSelect);
});

// Change background color
backgroundColorInput?.addEventListener('input', () => {
  websiteConfig.backgroundColor = backgroundColorInput.value;
  renderWebsite(websiteConfig, handleComponentSelect);
});

// Add paragraph
addParagraphButton?.addEventListener('click', () => {
  const newParagraph: WebsiteComponent = {
    id: crypto.randomUUID(),
    type: 'paragraph',
    text: 'This is a new paragraph.',
  };

  websiteConfig.components.push(newParagraph);
  renderWebsite(websiteConfig, handleComponentSelect);
});

// Move selected component
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

// Delete selected component
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

// Save design
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

// Load design
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

// Initial render
renderWebsite(websiteConfig, handleComponentSelect);
