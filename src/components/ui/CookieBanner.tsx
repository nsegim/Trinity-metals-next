"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";

type Preferences = {
  analytics: boolean;
  functional: boolean;
};

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>({
    analytics: true,
    functional: true,
  });

  const { lang } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!consent) setShow(true);
  }, []);

  const applyConsent = (preferences: Preferences) => {
    // Google Analytics — enable or disable based on consent
    if (preferences.analytics) {
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
      });
    } else {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  const handleAcceptAll = () => {
    const all = { analytics: true, functional: true };
    localStorage.setItem("cookie_consent", JSON.stringify(all));
    applyConsent(all);
    setShow(false);
    setShowModal(false);
  };

  const handleDeclineAll = () => {
    const none = { analytics: false, functional: false };
    localStorage.setItem("cookie_consent", JSON.stringify(none));
    applyConsent(none);
    setShow(false);
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    applyConsent(prefs);
    setShow(false);
    setShowModal(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Banner */}
      {!showModal && (
        <div className="cookie-banner">
          <p>
            We use cookies to improve your experience, analyze traffic, and
            process enquiries.{" "}
            <Link href={`/${lang}/cookie-policy`}>Cookie policy</Link>
          </p>
          <div className="cookie-actions">
            <button onClick={() => setShowModal(true)} className="btn-outline">
              Preferences
            </button>
            <button onClick={handleDeclineAll} className="btn-outline">
              Decline all
            </button>
            <button onClick={handleAcceptAll} className="btn-primary">
              Accept all
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div className="cookie-overlay">
          <div className="cookie-modal">
            <h2>Cookie preferences</h2>
            <p className="modal-desc">
              Choose which cookies you allow. Strictly necessary cookies are
              always active.
            </p>

            {/* Strictly Necessary */}
            <div className="cookie-category">
              <div className="category-header">
                <span className="category-title">Strictly necessary</span>
                <span className="badge-required">Always on</span>
              </div>
              <p className="category-desc">
                Required for the site to function — session management,
                security, and form submissions (contact, job applications,
                newsletter).
              </p>
            </div>

            {/* Analytics */}
            <div className="cookie-category">
              <div className="category-header">
                <span className="category-title">Analytics</span>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) =>
                      setPrefs({ ...prefs, analytics: e.target.checked })
                    }
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
              <p className="category-desc">
                Google Analytics — helps us understand how visitors use the
                site. No personal data is shared with third parties.
              </p>
            </div>

            {/* Functional */}
            <div className="cookie-category">
              <div className="category-header">
                <span className="category-title">Functional</span>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={prefs.functional}
                    onChange={(e) =>
                      setPrefs({ ...prefs, functional: e.target.checked })
                    }
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
              <p className="category-desc">
                Remembers your preferences such as language, form autofill,
                and newsletter subscription status across visits.
              </p>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleSavePreferences} className="btn-primary">
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}