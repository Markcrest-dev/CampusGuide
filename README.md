# 🎓 Student Guide App

A comprehensive Progressive Web App (PWA) designed to help Nigerian university students navigate campus life with ease. Discover everything you need to know about campus maps, hostels, transport, dining options, and student services.

## ✨ Features

- 🗺️ **Interactive Campus Maps** - Navigate your university campus with detailed interactive maps
- 🏠 **Hostel Guide** - Find the best accommodation options with pricing and facilities information
- 🚌 **Transport Information** - Get around campus and the city with comprehensive transport guides
- 🍽️ **Food & Dining** - Discover the best places to eat on and around campus
- 📚 **Academic Resources** - Access important academic information and contacts
- 🏥 **Student Services** - Find essential services like banks, printing, and healthcare
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 📱 **PWA Support** - Install as a mobile app for offline access
- 🔍 **University Search** - Search and select from multiple Nigerian universities

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/School-map.git
   cd School-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Layout, Navigation, etc.)
│   └── ...
├── context/            # React Context providers
├── data/              # Static data and configurations
├── pages/             # Page components
├── utils/             # Utility functions
├── assets/            # Static assets
├── App.jsx            # Main App component
└── main.jsx           # Application entry point
```

### Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS
- **Maps**: Leaflet, React Leaflet
- **Icons**: Lucide React
- **Build Tool**: Vite
- **PWA**: Service Worker, Web App Manifest

## 🌍 Supported Universities

The app currently supports multiple Nigerian universities with comprehensive information about:
- Campus facilities and locations
- Hostel accommodations
- Transportation options
- Dining and food services
- Student services and amenities

## 📱 PWA Features

This app is a Progressive Web App that offers:
- **Offline Access** - Browse cached content without internet
- **Install Prompt** - Add to home screen on mobile devices
- **Fast Loading** - Optimized performance with service worker caching
- **Responsive Design** - Works seamlessly on all device sizes

## 🚀 Deployment

The app can be deployed to various platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Vercel (Recommended)
- Netlify
- GitHub Pages
- Firebase Hosting

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure PWA functionality remains intact

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@studentguide.ng
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/School-map/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/School-map/wiki)

## 🙏 Acknowledgments

- Nigerian university students for feedback and testing
- Open source community for the amazing tools and libraries
- Contributors who help improve the app

---

**Made with ❤️ for Nigerian students**

*Trusted by thousands of students across Nigeria • Updated regularly • Free to use*
