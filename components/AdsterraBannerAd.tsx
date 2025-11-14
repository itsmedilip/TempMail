import React, { useEffect, useRef } from 'react';

const AdsterraBannerAd: React.FC = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (adRef.current) {
            adRef.current.innerHTML = ''; // Clear previous content on remount

            const configScript = document.createElement('script');
            configScript.type = 'text/javascript';
            configScript.innerHTML = `
                atOptions = {
                    'key' : 'f45bda1598a2a13bfacab5d2f8b7449d',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                };
            `;
            
            const invokeScript = document.createElement('script');
            invokeScript.type = 'text/javascript';
            invokeScript.src = '//winningplunder.com/f45bda1598a2a13bfacab5d2f8b7449d/invoke.js';
            invokeScript.async = true;
            
            adRef.current.appendChild(configScript);
            adRef.current.appendChild(invokeScript);
        }
    }, []);

    return <div ref={adRef} className="w-[728px] h-[90px] max-w-full" />;
};

export default AdsterraBannerAd;
