import React, { useEffect } from 'react';

const AdsterraSocialBarAd: React.FC = () => {
    useEffect(() => {
        const scriptId = 'adsterra-social-bar-script';
        
        if (document.getElementById(scriptId)) {
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = '//winningplunder.com/87/87/72/878772f9cc029d2d9dc66d341a46788c.js';
        script.async = true;

        document.body.appendChild(script);

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return null;
};

export default AdsterraSocialBarAd;
