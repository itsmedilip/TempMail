import React, { useEffect, useRef } from 'react';

const AdsterraAd: React.FC = () => {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (scriptLoaded.current) {
            return;
        }

        if (adContainerRef.current) {
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
            
            adContainerRef.current.appendChild(configScript);
            adContainerRef.current.appendChild(invokeScript);

            scriptLoaded.current = true;
        }
    }, []);

    return (
        <div ref={adContainerRef} className="w-[300px] h-[250px] bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden text-gray-500 dark:text-gray-400 relative grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
            <div className="text-center p-2">
                <p className="font-semibold text-sm">Advertisement (300x250)</p>
                <p className="text-xs mt-1">Ad not loading? Check ad-blocker.</p>
            </div>
        </div>
    );
};

export default AdsterraAd;