
import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/signup.css';


export default function Home() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    preferred_time: '08:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('Signup API response:', data);


// Send the same data to Relay webhook for automation
const relayWebhookUrl = process.env.NEXT_PUBLIC_RELAY_SIGNUP_WEBHOOK;

console.log('Form data sent to Relay:', form);  // Add here to log the data

if (relayWebhookUrl) {
  await fetch(relayWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
}

      if (res.ok && data.dashboard_url) {
        // Redirect to dashboard if signup succeeded
        router.push(data.dashboard_url);
      } else {
        // Show error from API or fallback
        setResult({ message: data.error || 'Signup failed.' });
      }
    } catch (err) {
      setResult({ message: 'Something went wrong. Try again.' });
    }

    setLoading(false);
  };

  return (
    <div className={`split-wrapper ${showForm ? 'show-form' : ''}`}>
      {/* Left side content */}
      <div className="side-panel">
        <div className="side-content">
          <h1>Be Weather-Ready Every Day</h1>
          <p>
            Don't let unexpected weather catch you off guard. Get concise,
            personalized tips delivered at the time you choose.
          </p>
          <button
  className="cta-button"
  onClick={() => router.push('/weather-info')}
  aria-label="Go to weather info"
>
  Get Started
</button>

        </div>
        <div className="blob blob-left" aria-hidden="true" />
      </div>
      
      {/* Right side form */}
      <div className="form-panel">
        <div className="card">
          <div className="blob blob-top" aria-hidden="true" />
          <div className="blob blob-bottom" aria-hidden="true" />
<div style={{ position: 'relative', overflow: 'hidden', padding: '40px 0' }}>
  {/* Background drifting clouds */}
  <span
    role="img"
    aria-label="cloud"
    style={{
      position: 'absolute',
      top: '20%',
      left: '-10%',
      fontSize: '3rem',
      opacity: 0.3,
      animation: 'driftCloud 25s linear infinite'
    }}
  >
    ☁️
  </span>
  <span
    role="img"
    aria-label="cloud"
    style={{
      position: 'absolute',
      top: '60%',
      left: '110%',
      fontSize: '3.5rem',
      opacity: 0.2,
      animation: 'driftCloudReverse 30s linear infinite'
    }}
  >
    ☁️
  </span>

  {/* Main heading */}
  <h1
    style={{
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '10px 0',
      animation: 'glowText 3s ease-in-out infinite',
      position: 'relative',
      zIndex: 1
    }}
  >
    <span
      role="img"
      aria-label="cloud"
      style={{
        fontSize: '2.5rem',
        animation: 'floatCloud 3s ease-in-out infinite, rotateCloud 8s linear infinite'
      }}
    >
      ☁️
    </span>
    Welcome to SkyWise
    <span
      role="img"
      aria-label="cloud"
      style={{
        fontSize: '2.5rem',
        animation: 'floatCloud 3s ease-in-out infinite 1.5s, rotateCloud 10s linear infinite'
      }}
    >
      ☁️
    </span>
  </h1>

  <style jsx>{`
    @keyframes floatCloud {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }

    @keyframes rotateCloud {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes glowText {
      0% { text-shadow: 0 0 5px rgba(37, 99, 235, 0.5), 0 0 10px rgba(96, 165, 250, 0.5); }
      50% { text-shadow: 0 0 15px rgba(37, 99, 235, 0.8), 0 0 25px rgba(96, 165, 250, 0.8); }
      100% { text-shadow: 0 0 5px rgba(37, 99, 235, 0.5), 0 0 10px rgba(96, 165, 250, 0.5); }
    }

    @keyframes driftCloud {
      0% { transform: translateX(0); }
      100% { transform: translateX(120vw); }
    }

    @keyframes driftCloudReverse {
      0% { transform: translateX(0); }
      100% { transform: translateX(-120vw); }
    }
  `}</style>
</div>

          <h2>Sign up for Daily Weather Tips</h2>
          <p className="sub">Smart, timely advice—no fluff.</p>

          <form className="form" onSubmit={submit} aria-label="signup form">
            <div className="field">
              <input
                id="name"
                type="text"
                placeholder=" "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <label htmlFor="name">Name (optional)</label>
            </div>

            <div className="field">
              <input
                id="email"
                type="email"
                placeholder=" "
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="two-grid">
              <div className="field">
                <input
                  id="preferred_time"
                  type="time"
                  required
                  value={form.preferred_time}
                  onChange={(e) =>
                    setForm({ ...form, preferred_time: e.target.value })
                  }
                />
                <label htmlFor="preferred_time">Preferred Time</label>
              </div>

              <div className="field">
                <input
                  id="timezone"
                  type="text"
                  value={form.timezone}
                  onChange={(e) =>
                    setForm({ ...form, timezone: e.target.value })
                  }
                />
                <label htmlFor="timezone">Timezone</label>
              </div>
            </div>

            <div className="field">
              <input
                id="city"
                type="text"
                placeholder=" "
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <label htmlFor="city">City (optional)</label>
            </div>

            <button className="button" type="submit" disabled={loading}>
              <div className="overlay" />
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>

          {result && (
            <div className="notification">
              <p>{result.message}</p>
              {result.dashboard_url && (
                <p>
                  Manage preferences:{' '}
                  <a className="link" href={result.dashboard_url}>
                    {result.dashboard_url}
                  </a>
                </p>
              )}
            </div>
          )}

          <div className="small">
            By signing up you can unsubscribe anytime from the dashboard link.
          </div>
        </div>
      </div>
    </div>
  );
}
