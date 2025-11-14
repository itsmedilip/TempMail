import React, { useEffect, useRef } from 'react';

const AdsterraAd: React.FC = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (adRef.current) {
            adRef.current.innerHTML = ''; // Clear previous content on remount

            const configScript = document.createElement('script');
            configScript.type = 'text/javascript';
            configScript.innerHTML = `
                atOptions = {
                    'key' : '05790082acd26581792992241ef5468e',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                };
            `;
            
            const invokeScript = document.createElement('script');
            invokeScript.type = 'text/javascript';
            invokeScript.src = '//winningplunder.com/05790082acd26581792992241ef5468e/invoke.js';
            invokeScript.async = true;
            
            adRef.current.appendChild(configScript);
            adRef.current.appendChild(invokeScript);
        }
    }, []);

    return <div ref={adRef} className="w-[300px] h-[250px] bg-gray-800 rounded-md overflow-hidden" />;
};

export default AdsterraAd;
