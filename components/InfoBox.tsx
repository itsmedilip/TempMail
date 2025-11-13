import React from 'react';

const InfoBox: React.FC = () => {
  return (
    <div className="bg-[#2e333b] shadow-md rounded-md p-6 relative bg-noise">
      <div className="max-w-3xl mx-auto">
        <h4 className="font-bold text-lg text-white mb-3 text-center">What is Disposable Temporary E-mail?</h4>
        <p className="text-sm text-gray-400 text-left leading-relaxed">
          Disposable email - is a free email service that allows to receive email at a temporary address that self-destructed after a certain time elapses. It is also known by names like : tempmail, 10minutemail, 10minmail, throwaway email, fake-mail , fake email generator, burner mail or trash-mail. Many forums, Wi-Fi owners, websites and blogs ask visitors to register before they can view content, post comments or download something. Temp-Mail - is most advanced throwaway email service that helps you avoid spam and stay safe.
        </p>
      </div>
    </div>
  );
};

export default InfoBox;
