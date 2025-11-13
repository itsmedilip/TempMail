import React from 'react';

const FooterLink: React.FC<React.PropsWithChildren<{
  onClick: () => void;
}>> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-xs text-gray-400 hover:text-white transition-colors duration-200">
    {children}
  </button>
);

const Footer: React.FC<{ onLinkClick: (page: string) => void }> = ({ onLinkClick }) => {
  return (
    <footer className="bg-[#2e333b] p-4 border-t border-gray-700 w-full">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <FooterLink onClick={() => onLinkClick('about')}>About</FooterLink>
        <FooterLink onClick={() => onLinkClick('privacy')}>Privacy</FooterLink>
        <FooterLink onClick={() => onLinkClick('terms')}>Terms</FooterLink>
        <FooterLink onClick={() => onLinkClick('faq')}>FAQ</FooterLink>
        <FooterLink onClick={() => onLinkClick('contacts')}>Contacts</FooterLink>
        <FooterLink onClick={() => onLinkClick('advertising')}>Advertising</FooterLink>
      </div>
    </footer>
  );
};

export default Footer;