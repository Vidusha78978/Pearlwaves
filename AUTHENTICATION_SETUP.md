# Pearl Waves Authentication Setup Guide

## ✅ Authentication System Features

### 1. **User Registration**

- Save new user credentials securely in Supabase
- Email verification (Supabase sends confirmation email)
- Password validation (minimum 6 characters)
- Full name capture
- Password confirmation validation

### 2. **User Login**

- Email and password authentication
- Session persistence (automatically logs in on refresh)
- Secure credential storage
- Error handling for invalid credentials

### 3. **Session Management**

- AuthContext for global user state
- Real-time auth state tracking
- Automatic logout handling
- User info accessible throughout app

### 4. **User Profile Display**

- Shows logged-in user email in navigation
- User profile dropdown menu
- Logout button in navigation
- Conditional rendering (Login/SignUp vs User Profile)

### 5. **User Profile Management**

- View full user details (/profile)
- Edit and update user information
- Edit form with validation
- Save changes to Supabase database
- View profile fields: Full Name, Email, Phone, Location, Bio

---

## 📁 Project Structure

```
src/
├── context/
│   └── AuthContext.jsx         (User state management)
├── pages/
│   ├── Register.jsx            (Registration form)
│   ├── Login.jsx               (Login form)
│   ├── Profile.jsx             (User profile view/edit)
│   └── ...
├── components/
│   └── Navigation.jsx          (Shows user status)
├── utils/
│   └── supabaseClient.js       (Supabase config & API)
└── App.jsx                     (Wrapped with AuthProvider)
```

---

## 🔧 How to Use

### **Register a New User**

1. Navigate to `/register`
2. Enter Full Name, Email, Password
3. Confirm password matches
4. Click "Sign Up"
5. Check email for verification link
6. Redirected to login after 2 seconds

### **Login**

1. Navigate to `/login`
2. Enter Email and Password
3. Click "Sign In"
4. Automatically redirected to home page
5. User info appears in top navigation

### **Logout**

1. Click on your username in navigation
2. Profile dropdown opens
3. Click "Logout" button
4. Session cleared, redirected to home

### **Access User Data in Components**

```jsx
import { useAuth } from "../context/AuthContext";

export default function MyComponent() {
  const { user, loading, error } = useAuth();

  return (
    <div>
      {loading ? "Loading..." : user ? `Welcome ${user.email}` : "Please login"}
    </div>
  );
}
```

---

## 🗄️ Supabase Database Setup Required

Run these SQL commands in Supabase SQL Editor to create the authentication tables:

```sql
-- Users table (created automatically by Supabase Auth)
-- But you can create an extended users profile if needed:
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id);
```

---

## 🔐 Environment Variables Required

Create `.env` file in root directory with:

```env
VITE_SUPABASE_URL=https://lzdmtftkuapbgyczdjjx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## ✨ Key Features Implemented

### **Register.jsx**

- ✅ Form validation (name, email, password)
- ✅ Password confirmation
- ✅ Min 6 character password
- ✅ Error messages
- ✅ Success message with auto-redirect
- ✅ Loading state during registration

### **Login.jsx**

- ✅ Email and password fields
- ✅ Error handling
- ✅ Loading state
- ✅ Automatic redirect on success
- ✅ Session persistence

### **AuthContext.jsx**

- ✅ Global user state management
- ✅ Auth state listeners
- ✅ Register/Login/Logout functions
- ✅ Error handling
- ✅ Loading states

### **Navigation.jsx**

- ✅ Shows user info when logged in
- ✅ Profile dropdown menu
- ✅ Logout button
- ✅ Conditional auth buttons display
- ✅ User email display

---

## 🧪 Testing the Authentication

### Test Registration:

1. Go to `/register`
2. Fill in form with test data
3. Verify email received
4. Login with credentials

### Test Login:

1. Go to `/login`
2. Enter email and password
3. Check that user appears in navigation
4. Refresh page - user should still be logged in (session persists)

### Test Logout:

1. Click username in navigation
2. Click logout
3. Verify user is removed from navigation
4. Verify redirected to home

### Test Session Persistence:

1. Login to account
2. Refresh the page
3. User should still be logged in
4. Check AuthContext preserves session

---

## 🛡️ Security Features

✅ **Encrypted Passwords** - Supabase handles hashing  
✅ **Email Verification** - Supabase sends confirmation emails  
✅ **Session Tokens** - JWT tokens stored in browser  
✅ **CORS Protected** - Supabase API only accessible from your domain  
✅ **Row Level Security** - Database tables protected with RLS policies  
✅ **Environment Variables** - Credentials not in source code

---

## 📱 Responsive Design

- Login/Register forms work on mobile
- User profile dropdown adapts to screen size
- Touch-friendly buttons and forms

---

## 🚀 Next Steps

1. **Email Verification** - Users must verify email (Supabase default)
2. **Password Reset** - Add forgot password feature
3. **User Profile Page** - Create `/profile` page to edit user info
4. **Protected Routes** - Create PrivateRoute component for admin pages
5. **Social Login** - Add Google/GitHub authentication

---

## 🆘 Troubleshooting

### **"authApi is not a function"**

- Make sure AuthContext is imported, not authApi
- Verify App.jsx wraps children with `<AuthProvider>`

### **User not persisting on refresh**

- Check browser DevTools → Application → Cookies
- Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
- Check Supabase project settings → Authentication

### **Email verification not working**

- Check Supabase Email Templates settings
- Verify domain whitelist includes localhost (dev)
- Check spam folder for email

### **Login fails with "Invalid credentials"**

- Verify email is correct
- Verify password is correct
- Check if account is email-verified

---

## 📞 Support

For issues with Supabase authentication, visit:

- Supabase Docs: https://supabase.com/docs/guides/auth
- Supabase Discord: https://discord.supabase.com
