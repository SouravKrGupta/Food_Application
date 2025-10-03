import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className='privacy-policy'>
      <div className="privacy-content">
        <h1>Privacy Policy</h1>

        <div className="policy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account,
            place an order, or contact us for support. This may include your name, email address,
            phone number, delivery address, and payment information.
          </p>
        </div>

        <div className="policy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support</li>
            <li>Send you important updates about your orders</li>
            <li>Improve our services and develop new features</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties
            without your consent, except as described in this policy. We may share your information
            with trusted partners who assist us in operating our website and conducting our business.
          </p>
        </div>

        <div className="policy-section">
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </div>

        <div className="policy-section">
          <h2>5. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize
            content. You can control cookie settings through your browser preferences.
          </p>
        </div>

        <div className="policy-section">
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </div>

        <div className="policy-section">
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at:
          </p>
          <p>
            Email: privacy@jalpaanexpress.com<br/>
            Phone: +91-XXXXXXXXXX
          </p>
        </div>

        <div className="policy-footer">
          <p>Last updated: October 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;