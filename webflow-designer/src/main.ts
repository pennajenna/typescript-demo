
const headingInput = document.querySelector<HTMLInputElement>(
  '#headingInput'
);

const updateButton = document.querySelector<HTMLButtonElement>(
  '#updateButton'
);

const previewHeading = document.querySelector<HTMLHeadingElement>(
  '#previewHeading'
);

updateButton?.addEventListener('click', () => {
  if (headingInput && previewHeading) {
    previewHeading.textContent = headingInput.value;
  }
});
