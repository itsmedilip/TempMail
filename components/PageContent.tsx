import React from 'react';

const PageSection: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-[#2ab38b] mb-2">{title}</h3>
    <div className="space-y-2 text-gray-400 text-sm leading-relaxed">{children}</div>
  </div>
);

const contentMap: { [key: string]: { title: string; content: React.ReactNode } } = {
  about: {
    title: 'About TEMPMAIL',
    content: (
       <PageSection title="What is TEMPMAIL?">
          <p>TEMPMAIL provides a temporary, secure, anonymous, and free disposable email address service. Forget about spam, advertising mailings, hacking, and attacking robots. Keep your real mailbox clean and secure.</p>
          <p>Our service is designed to protect your privacy by allowing you to receive emails at a temporary address that self-destructs after a set time. This is perfect for signing up for websites, forums, and social media without revealing your personal email.</p>
        </PageSection>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <PageSection title="Our Commitment to Privacy">
          <p>Your privacy is important to us. This service is designed to be simple, anonymous, and respectful of your data. We do not require any personal information to use our service.</p>
        </PageSection>
        <PageSection title="Data Collection and Usage">
          <p><strong>Temporary Emails:</strong> Emails sent to your temporary address are stored on the servers of our provider, Mail.tm, for a short period and are then permanently deleted. We do not have access to the content of your emails.</p>
          <p><strong>Local Storage:</strong> We use your browser's local storage to save your theme preference (light or dark mode). This information is stored only on your computer and is not transmitted to us.</p>
          <p><strong>Analytics:</strong> We do not use any tracking or analytics software. Your activity on this site is not monitored.</p>
        </PageSection>
        <PageSection title="Third-Party Services">
          <p>This service relies on the Mail.tm API to provide temporary email functionality. We encourage you to review their privacy policy for information on how they handle data.</p>
        </PageSection>
        <PageSection title="Data Security">
          <p>While the email addresses are temporary, you should not use this service for receiving sensitive information. The inboxes are not password-protected in the traditional sense and should be considered temporary and disposable.</p>
        </PageSection>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    content: (
      <>
        <PageSection title="Acceptance of Terms">
          <p>By using this temporary email service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.</p>
        </PageSection>
        <PageSection title="Acceptable Use">
          <p>You agree not to use this service for any illegal or malicious activities, including but not limited to spamming, phishing, registering for illegal services, or any form of harassment.</p>
          <p>Any accounts found to be in violation of these terms may be blocked from our service without notice.</p>
        </PageSection>
        <PageSection title="Service Availability">
          <p>This service is provided on an "as-is" and "as-available" basis. We do not guarantee that the service will be uninterrupted or error-free. We are not liable for any loss of data or other damages that may result from the use of this service.</p>
        </PageSection>
        <PageSection title="Limitation of Liability">
          <p>We are not responsible for the content of emails received through our service. You are solely responsible for your use of the temporary email addresses and any consequences that may arise.</p>
        </PageSection>
      </>
    ),
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: (
      <>
        <PageSection title="How does this work?">
          <p>This website uses the public API from Mail.tm to generate a real, temporary email address. Any email sent to that address will appear in your inbox here automatically.</p>
        </PageSection>
        <PageSection title="How long does an email address last?">
          <p>The email address is active for 10 minutes. You can extend this time by clicking the "Extend" button. When the timer runs out, the address is no longer accessible, but you can generate a new one instantly.</p>
        </PageSection>
        <PageSection title="Is this service anonymous and secure?">
          <p>Yes, it's anonymous. No registration or personal information is required. However, remember that this is a temporary, disposable email service. Do not use it for sensitive information like banking or important accounts.</p>
        </PageSection>
        <PageSection title="Can I send emails from this address?">
          <p>No, this service is for receiving emails only. You cannot send emails from the temporary address.</p>
        </PageSection>
      </>
    ),
  },
  contacts: {
    title: 'Contact Us',
    content: (
      <PageSection title="Get in Touch">
        <p>For inquiries, feedback, or bug reports, please feel free to reach out to us.</p>
        <p>You can contact our support team at: <strong className="text-[#2ab38b]">dsvinjora@gmail.com</strong>.</p>
        <p>We appreciate your feedback and will do our best to respond in a timely manner.</p>
      </PageSection>
    ),
  },
  advertising: {
    title: 'Advertising',
    content: (
      <PageSection title="Advertise With Us">
        <p>Reach a large, privacy-conscious audience by advertising on TEMPMAIL.</p>
        <p>We offer a variety of ad placements that are seamlessly integrated into the user experience. For more information on our advertising packages and to discuss opportunities, please contact our marketing team at: <strong className="text-[#2ab38b]">dsvinjora@gmail.com</strong>.</p>
      </PageSection>
    ),
  },
};

export const getPageContent = (page: string) => {
  return contentMap[page] || { title: 'Not Found', content: <p>This page does not exist.</p> };
};