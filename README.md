

# 🌦 Collaborative Weather Alert & Tip System

An AI-powered multi-agent solution aligned with **SDG 11: Sustainable Cities and Communities**, providing **real-time weather alerts** and **personalized daily tips** to help people prepare for changing weather conditions.

---

## 🚀 Features
- **Real-time weather data** fetched from OpenWeatherMap API
- **Daily personalized tips** (e.g., carry an umbrella, wear sunscreen)
- **Automated notifications** via email 
- **User dashboard** to update preferences or unsubscribe
- **Responsive modern UI** for desktop and mobile
- **Temporarily Deployed on Ngrok** for development.

---

## 🛠 Tech Stack
- **Frontend:** Next.js, React, CSS
- **Backend:** Relay.app
- **Database:** MongoDB Atlas
- **API:** OpenWeatherMap (for weather data)
- **Auth & Links:** JWT (JSON Web Token) for secure dashboard links
- **Temporary Deployment:** Ngrok

---

## 📂 Folder Structure
```.
├── pages/ # Next.js pages (routes)
│ ├── index.js # Signup page
│ ├── dashboard.js # User dashboard
│ ├── weather-info.js # Motivational blog/info page
│ └── api/ # Serverless API routes
│ ├── signup.js
│ ├── get-user.js
│ ├── update.js
│ └── unsubscribe.js
├── styles/ # CSS styles for each page
├── lib/ # Utility functions (e.g., MongoDB connection)
├── public/ # Static assets
└── README.md
```
---


## ⚙️ Installation & Setup
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/weather-alert-system.git
cd weather-alert-system
```

### 2️⃣ Install dependencies

Using npm:
```
npm install
```


### 3️⃣ Create .env.local file
```
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=your-db-name
JWT_SECRET=your-jwt-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
OPENWEATHERMAP_API_KEY=your-api-key
NEXT_PUBLIC_RELAY_SIGNUP_WEBHOOK=relay-url
NEXT_PUBLIC_RELAY_UPDATE_WEBHOOK=relay-url
```
### 4️⃣ Run the development server
```
npm run dev
```
```
📜 How It Works

    User signs up → Email, preferred alert time, timezone, and city are stored.

    System schedules alerts → At the chosen time, it fetches weather data.

    AI agent maps tips → Example: "Rain" → "Carry an umbrella".

    User gets alerts → Email is sent with the tip.

    Dashboard → User can update preferences or unsubscribe anytime.
```
<img width="1918" height="918" alt="ss1(1)" src="https://github.com/user-attachments/assets/c02f8075-dc32-4a39-9cb8-19231b8121c1" />
<img width="1918" height="906" alt="ss2(1)" src="https://github.com/user-attachments/assets/18056edc-fc0e-4ba2-8d52-1fd43cee3233" />
<img width="1918" height="907" alt="ss3(1)" src="https://github.com/user-attachments/assets/c45f76e6-f7a7-4eeb-9015-817572f6c42a" />
<img width="1918" height="1007" alt="output1" src="https://github.com/user-attachments/assets/a3258d3c-abae-4f4c-8df3-94931cfbf875" />
<img width="847" height="862" alt="relay_ss" src="https://github.com/user-attachments/assets/dc90a70d-ec70-46eb-b427-434f9cd2b68a" />
<img width="1918" height="956" alt="output7" src="https://github.com/user-attachments/assets/b9d2d9c5-b2f5-4112-a586-d648cacbaac2" />
<img width="1838" height="830" alt="email_ss" src="https://github.com/user-attachments/assets/87bd0e14-1b27-4b46-8fbd-52daef757b9d" />
<img width="1100" height="893" alt="output11" src="https://github.com/user-attachments/assets/f2cb3d56-a13c-4cb1-8a9f-65702166f8ad" />
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
