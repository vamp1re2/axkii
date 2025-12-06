# 💕 Our App - A Couple's Website

A beautiful, modern, and private website designed for couples to share music, memories, messages, and love notes.

## Features

✨ **Authentication**
- Email/password login and signup with Firebase
- Protected routes for logged-in users only
- Persistent authentication sessions

🎵 **Music Page**
- Add songs with name and URL
- Audio player for each song
- Shows who uploaded each song
- Delete songs (your own)

📸 **Gallery**
- Upload images to Firebase Storage
- Add captions to images
- Grid layout for browsing
- Shows who uploaded each image
- Delete images (your own)

💬 **Live Chat**
- Real-time messaging with polling
- See sender and timestamp for each message
- Auto-scrolling to latest messages
- Clean message interface

🎮 **Mini Games**
- Click game with 30-second timer
- Track and display score
- Replay functionality
- Fun and interactive

✨ **Love Notes & Surprises**
- Pre-made love notes and special messages
- Modal view for reading full content
- Beautiful and romantic design

🌙 **Dark/Light Theme**
- Global theme toggle
- Smooth transitions
- Persistent theme preference
- Beautiful color scheme for both themes

🎨 **Responsive Design**
- Works perfectly on mobile and desktop
- Beautiful cards with hover effects
- Modern and playful UI

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Authentication**: Firebase (Email/Password)
- **Database**: Neon PostgreSQL
- **Storage**: Firebase Storage
- **Deployment**: Netlify

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Email/Password authentication
4. Create a Storage bucket
5. Get your Firebase config credentials

### 2. Neon Database Setup

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new PostgreSQL project
3. Get your database connection string
4. The app will automatically create tables on first run

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Neon PostgreSQL
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and start building your memories!

## Project Structure

```
app/
├── login/          # Login page
├── signup/         # Signup page
├── music/          # Music player and management
├── gallery/        # Image gallery with upload
├── chat/           # Real-time chat
├── games/          # Mini games
├── extra/          # Love notes and surprises
└── layout.jsx      # Main layout with providers
components/
├── navbar.jsx      # Navigation bar with theme toggle
├── ProtectedRoute.jsx  # Protected route wrapper
└── ...
context/
├── AuthContext.jsx # Authentication context
├── ThemeContext.jsx # Theme context
styles/
└── globals.css     # Global styles with theme variables
lib/
└── db.js           # Database utilities
```

## Database Schema

### Users Table
```sql
- id (primary key)
- email (unique)
- name
- firebaseId (unique)
- createdAt
```

### Songs Table
```sql
- id (primary key)
- name
- url
- uploadedBy
- userId (foreign key)
- createdAt
```

### Gallery Images Table
```sql
- id (primary key)
- url
- caption
- uploadedBy
- userId (foreign key)
- createdAt
```

### Messages Table
```sql
- id (primary key)
- content
- sender
- senderId (foreign key)
- timestamp
```

## Pages

- **/** - Home page with links to all features
- **/login** - Login page
- **/signup** - Sign up page
- **/music** - Music player and song management
- **/gallery** - Image gallery with upload
- **/chat** - Real-time chat
- **/games** - Mini click game
- **/extra** - Love notes and surprises

## Customization

### Edit Love Notes
Open `app/extra/page.jsx` and modify the `loveNotes` and `surprises` arrays to add your own messages.

### Change Colors
Edit `styles/globals.css` to modify the color scheme:
```css
:root[data-theme='light'] {
    --accent-color: #ec4899; /* Change this to your favorite color */
    /* ... other colors ... */
}
```

## Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
DATABASE_URL
```

## Notes

- Chat uses polling (every 2 seconds) instead of real-time listeners for simplicity. For production, consider using WebSockets or Firebase Realtime Database.
- All user data is encrypted in transit (HTTPS)
- Only the logged-in user can see their app
- Users can only delete their own uploads

## Future Enhancements

- Implement real-time chat with WebSockets
- Add video calling functionality
- Countdown timers for special dates
- Anniversary celebration page
- Photo albums with dates
- Wishlist sharing
- Budget tracker for shared expenses

## Support

For issues or questions, contact the developer or refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Neon Documentation](https://neon.tech/docs)

---

Made with ❤️ for couples in love. Enjoy creating memories together!
