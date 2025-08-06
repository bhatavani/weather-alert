
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/dashboard.css';

export default function Dashboard() {
  const router = useRouter();
  const { token } = router.query;
  const [form, setForm] = useState({
    name: '',
    preferred_time: '08:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    city: '',
  });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [loading, setLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState('');

useEffect(() => {
  if (!token) return;
  fetch(`/api/get-user?token=${token}`)
    .then(res => res.json())
    .then(data => {
      if (!data.valid) {
        setStatus(data.error || 'Invalid token');
        return;
      }
      const user = data.user;
      setForm({
        name: user.name || '',
        preferred_time: user.preferred_time || '08:00',
        timezone: user.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        city: user.city || '',
      });
      setEmail(user.email || '');
      setDashboardUrl(user.dashboard_url || ''); // ✅ now available
      if (user.status === 'inactive') setUnsubscribed(true);
    })
    .catch(() => setStatus('Failed to load profile.'));
}, [token]);



  // auto-clear status
  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(''), 6000);
    return () => clearTimeout(t);
  }, [status]);

  const update = async e => {
    e.preventDefault();
    if (!token) {
      setStatus('Invalid access token.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        token,
        name: form.name,
        preferred_time: form.preferred_time,
        timezone: form.timezone,
        city: form.city,
      };
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });


      // Also update Relay using its webhook
      const relayWebhookUrl = process.env.NEXT_PUBLIC_RELAY_UPDATE_WEBHOOK;
      if (relayWebhookUrl) {
        await fetch(relayWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, email }),
        });
      }

      const json = await res.json();
      if (res.ok) {
        setStatus('Settings updated successfully.');
        setLastUpdate(new Date().toLocaleString());
      } else {
        setStatus(json.error || 'Update failed.');
      }
    } catch (err) {
      setStatus('Update failed. Try again.');
    }
    setLoading(false);
  };

const unsubscribe = async () => {
  if (!token) return;
  if (!confirm('Are you sure you want to unsubscribe?')) return;
  setLoading(true);
  try {
    const res = await fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const json = await res.json();
    if (res.ok) {
      setStatus('You have unsubscribed. Redirecting to signup...');
      setUnsubscribed(true);

      // Wait 2 seconds before redirect & hard reload
      setTimeout(() => {
        window.location.href = '/signup'; // hard reload ensures CSS resets
      }, 2000);
    } else {
      setStatus(json.error || 'Unsubscribe failed.');
    }
  } catch {
    setStatus('Unsubscribe failed.');
  }
  setLoading(false);
};


const [copied, setCopied] = useState(false);

const copyLink = () => {
  if (!dashboardUrl) return;
  navigator.clipboard.writeText(dashboardUrl);
  setCopied(true);
  setStatus('Dashboard link copied to clipboard.');
  setTimeout(() => setCopied(false), 2000);
};

  return (
    <div className="dashboard-wrapper">
      <div className="card">
        <div className="flex-between">
          <div>
            <h1>Weather Tip Settings</h1>
            <div className="small">Manage when and how you get your daily tip</div>
          </div>
          <div className={`badge ${unsubscribed ? 'inactive-badge' : ''}`}>
            {unsubscribed ? 'Inactive' : 'Active'}
          </div>
        </div>
<div className="section">
  <div className="label">Your Personal Dashboard Link</div>
  <div className="inline">
    <div className="truncate-wrapper">
      <input
        type="text"
        value={dashboardUrl}
        readOnly
        aria-label="Dashboard link"
        className="truncate-input"
        onFocus={(e) => e.target.select()}
      />
      <div className="tooltip" role="tooltip">
        {dashboardUrl}
      </div>
    </div>
    <button onClick={copyLink} className="button" style={{ flexShrink: 0, minWidth: '100px' }}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  </div>
  <div className="small">
    Save this link to revisit your dashboard later. (It won't open a new dashboard here)
  </div>
</div>



        <div className="section">
          <div className="label">Email</div>
          <div className="field">
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              disabled
              aria-label="Registered email"
              style={{ background: '#f3f6fa' }}
            />
          </div>
        </div>

        <div className="section">
          <div className="label">Preferences</div>
          <form onSubmit={update}>
            <div className="input-group">
              <div className="field">
                <div className="label">Name</div>
                <input
                  type="text"
                  value={form.name}
                  placeholder="Optional"
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  disabled={unsubscribed}
                  aria-label="Name"
                />
              </div>
              <div className="field">
                <div className="label">Preferred Time</div>
                <input
                  type="time"
                  value={form.preferred_time}
                  onChange={e => setForm({ ...form, preferred_time: e.target.value })}
                  disabled={unsubscribed}
                  aria-label="Preferred time"
                />
              </div>
            </div>

            <div className="input-group">
              <div className="field">
                <div className="label">Timezone</div>
                <input
                  type="text"
                  value={form.timezone}
                  onChange={e => setForm({ ...form, timezone: e.target.value })}
                  disabled={unsubscribed}
                  aria-label="Timezone"
                />
              </div>
              <div className="field">
                <div className="label">City</div>
                <input
                  type="text"
                  value={form.city}
                  placeholder="Optional"
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  disabled={unsubscribed}
                  aria-label="City"
                />
              </div>
            </div>

            <div className="action-row">
              <button type="submit" className="button" disabled={loading || unsubscribed}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" className="secondary" onClick={unsubscribe} disabled={loading || unsubscribed}>
                Unsubscribe
              </button>
            </div>
          </form>
        </div>

        {status && (
          <div className={`notification ${unsubscribed ? 'warn' : ''}`} aria-live="polite">
            {status} {lastUpdate && !unsubscribed && <span>Last update: {lastUpdate}</span>}
          </div>
        )}

        <div className="small">
          You can always come back to this link to edit or unsubscribe. If you lose it, sign up again.
        </div>
      </div>
    </div>
  );
}
