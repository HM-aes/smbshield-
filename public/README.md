# Public Assets Folder

This folder contains static assets that are served directly by Next.js.

## Folder Structure

- **`images/`** - Image assets
  - **`logos/`** - Business logos and brand assets
- **`videos/`** - Video assets

## Usage

Files in this folder are accessible at the root URL. For example:
- `public/images/logos/logo.png` → `/images/logos/logo.png`
- `public/videos/demo.mp4` → `/videos/demo.mp4`

### In React/Next.js Components

```tsx
// Using Next.js Image component (recommended for images)
import Image from 'next/image'

<Image 
  src="/images/logos/logo.png" 
  alt="Company Logo" 
  width={200} 
  height={50}
/>

// Using regular img tag
<img src="/images/logos/logo.png" alt="Company Logo" />

// Using video tag
<video src="/videos/demo.mp4" controls />
```

## Best Practices

- **Images**: Use Next.js `Image` component for optimized loading
- **Videos**: Keep file sizes reasonable for web delivery
- **Logos**: Provide multiple formats (PNG, SVG) and sizes when possible
- **Naming**: Use kebab-case for file names (e.g., `business-logo.png`)

