# Pearl Waves - Modern Business Website

A stunning, modern website for Pearl Waves digital agency featuring web development, software development, mobile apps, and web applications services.

## 🌟 Features

- **Modern Design**: Beautiful gradient UI with smooth animations
- **Multiple Pages**: Home, Services, Portfolio, Media, Contact, Login, Register, Resources
- **Supabase Integration**: Database and authentication ready
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth transitions using Framer Motion
- **Loading Effects**: Modern loading screens and page transitions
- **Forms**: Contact forms integrated with Supabase
- **Authentication**: User login and registration system

## 📋 Pages

- **Home**: Hero section with services overview and statistics
- **Services**: Detailed service offerings with features
- **Portfolio**: Showcase of completed projects with filters
- **Media**: Gallery of project highlights and team photos
- **Login**: User authentication
- **Register**: New user registration
- **Contact**: Contact form with business information
- **Resources**: Learning materials and tutorials

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file based on `.env.example`:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🛠️ Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **React Router**: Navigation
- **Framer Motion**: Animations and transitions
- **Supabase**: Backend and authentication
- **React Icons**: Icon library
- **React Hook Form**: Form handling
- **CSS Modules**: Styling

## 🎨 Design Highlights

- Dark modern theme with vibrant gradients
- Smooth page transitions and loading effects
- Interactive hover animations
- Responsive grid layouts
- Accessible form elements
- Custom scrollbar styling

## 📱 Responsive Breakpoints

- Desktop: 1400px max-width container
- Tablet: Optimized for 768px and below
- Mobile: Optimized for 480px and below

## 🔐 Supabase Setup

### Required Tables

1. **portfolio_projects**
   - id (UUID)
   - title (text)
   - description (text)
   - image_url (text)
   - category (text)
   - created_at (timestamp)

2. **contact_submissions**
   - id (UUID)
   - name (text)
   - email (email)
   - phone (text)
   - subject (text)
   - message (text)
   - created_at (timestamp)

3. **media_gallery**
   - id (UUID)
   - title (text)
   - media_url (text)
   - media_type (text)
   - created_at (timestamp)

## 🌐 API Endpoints

All API interactions are handled through `src/utils/supabaseClient.js` with functions for:

- User authentication (sign up, sign in, sign out)
- Portfolio management
- Contact submissions
- Media gallery

## 📦 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   └── LoadingScreen.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── Media.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Contact.jsx
│   └── Resources.jsx
├── styles/             # Global styles
│   └── index.css
├── utils/              # Utility functions
│   └── supabaseClient.js
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🎯 Key Features Implementation

### Animations

- Fade-in animations on page load
- Slide animations for content
- Float animations on hover
- Gradient shifting backgrounds
- Loading spinner animations

### Forms

- Contact form with validation
- User registration and login
- Email field validation
- Error handling and feedback

### Navigation

- Sticky header with smooth scroll
- Mobile hamburger menu
- Active link indicators
- Quick auth buttons

## 🔧 Customization

### Colors

Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --primary: #0066ff;
  --secondary: #00d4ff;
  --accent: #ff006e;
  /* ... more variables */
}
```

### Content

Update service descriptions, portfolio projects, and resources in respective page files.

### Animations

Adjust animation timings in component `transition` props.

## 📄 License

This project is proprietary to Pearl Waves.

## 📞 Support

For inquiries and support, contact info@pearlwaves.com

---

**Built with ❤️ for digital excellence**
