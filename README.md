# Professional Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases professional work, projects, and achievements with a beautiful and intuitive user interface.

## Features

- 🌐 Multi-language support (English)
- 🌓 Dark/Light mode
- 📱 Fully responsive design
- 🎨 Modern UI with animations
- 🖼️ Image optimization and lazy loading
- 📹 Video support with lazy loading
- 🔍 SEO optimized
- ⚡ Fast performance
- 🎯 Smooth scrolling
- 📧 Contact form
- 📱 Social media integration

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- i18next
- React Router
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/izzymarc/model.git
cd model
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
├── client/
│   ├── public/
│   │   ├── images/
│   │   ├── videos/
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── locales/
│   │   ├── pages/
│   │   └── ...
│   └── ...
├── server/
└── ...
```

## Deployment

This project is configured for deployment on Netlify. Simply connect your GitHub repository to Netlify and it will automatically deploy your site.

### Netlify Configuration

The project includes a `netlify.toml` file with the following settings:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Mirabel N. Udeagha - [@izzymarc](https://github.com/izzymarc)

Project Link: [https://github.com/izzymarc/model](https://github.com/izzymarc/model) 