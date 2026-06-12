# Pet Adoption Platform
🇬🇷 Read this in [Ελληνικά](README_GR.md)

Interactive Single Page Application (SPA) pet adoption platform built with Vanilla JavaScript. It features an advanced state router, live custom-validated form validations, modern Web APIs for social sharing, accessible modal views, interactive FAQ elements, and dynamic Call-to-Action (CTA) state tracking.

## Features

- Vanilla JS Single Page Routing: Fluid, instant page transitions without browser refreshes.
- Dynamic Content Filtering: Real-time catalog filtering based on pet type, age, and location.
- Custom Web Share API Integration: Native mobile sharing drawer trigger for easy social media propagation.
- Form Validation: Real-time feedback with custom error states, overriding default browser behavior.
- Priority Toggle Mechanism: Interactive form selectors that update submission priority and badges dynamically.
- Accessible Adoption Modal: Secure focus management and strict keyboard traps for screen-reader compliance (`a11y`).

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)

## Local Setup

1. Clone repository

```bash
git clone https://github.com/dgiagkoudi/pet-adoption-platform.git
cd pet-adoption-platform
```

2. Run project
Open `index.html`directly in your browser.

## Functionality

The application allows users to:

- Experience an uninterrupted, zero-refresh browsing flow across all application views via a custom client-side router.
- Instantly filter the pet directory by specific demographic and geographic criteria with real-time DOM updates.
- Initiate adoption requests through secure, intuitive dialogs optimized for seamless UX and strict keyboard navigation.
- Broadcast any pet's profile across social networks with a single tap utilizing the device's native system sheet.
- File inquiries through an interactive contact portal that dynamically updates submission priority on the fly.

## Mobile & Accessibility Support

Optimized for:

- Responsive CSS Grid and Flexbox viewport breakpoints.
- Native touch targets and interactive radio cards for mobile interactions.
- Screen readers via explicit aria-live, aria-invalid, aria-hidden, and role="dialog" implementation.
- Keyboard-only navigation using optimized tabindex shifts during cross-routing.

## Future Improvements

- Search bar with typing autocompletion
- Favorites list backed by browser LocalStorage
- Live counter animations for total successful adoptions
- Advanced database/API integration for dynamic animal profiles

## License

This project is licensed under the MIT License.
