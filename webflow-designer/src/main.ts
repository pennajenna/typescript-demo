
interface WebsiteConfig {
  heading: string;
  backgroundColor: string;
}

const websiteConfig: WebsiteConfig = {
  heading: 'Welcome to my website',
  backgroundColor: '#ffffff',
};

// Get references to our HTML elements
const headingInput = document.querySelector<HTMLInputElement>(
  '#headingInput'
);

const backgroundColorInput = document.querySelector<HTMLInputElement>(
  '#backgroundColorInput'
);

const updateButton = document.querySelector<HTMLButtonElement>(
  '#updateButton'
);

const previewHeading = document.querySelector<HTMLHeadingElement>(
  '#previewHeading'
);

const preview = document.querySelector<HTMLDivElement>(
  '#preview'
);

// Update the page using our configuration
function renderWebsite(config: WebsiteConfig): void {
  if (!previewHeading || !preview) {
    return;
  }

  previewHeading.textContent = config.heading;
  preview.style.backgroundColor = config.backgroundColor;
}

// Handle button clicks
headingInput?.addEventListener('input', () => {
  websiteConfig.heading = headingInput.value;
  renderWebsite(websiteConfig);
});

backgroundColorInput?.addEventListener('input', () => {
  websiteConfig.backgroundColor = backgroundColorInput.value;
  renderWebsite(websiteConfig);
});


// Render the initial configuration
renderWebsite(websiteConfig);
