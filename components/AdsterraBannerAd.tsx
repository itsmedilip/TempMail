import React, { useEffect, useRef } from 'react';

const AdsterraBannerAd: React.FC = () => {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        // Prevent script from being loaded multiple times on re-renders (e.g., in Strict Mode)
        if (scriptLoaded.current) {
            return;
        }

        if (adContainerRef.current) {
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
            
            adContainerRef.current.appendChild(configScript);
            adContainerRef.current.appendChild(invokeScript);

            scriptLoaded.current = true;
        }
    }, []);

    return (
        <div ref={adContainerRef} className="w-[728px] h-[90px] max-w-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-center text-gray-500 dark:text-gray-400 relative">
            {/* This placeholder content will remain if the ad script is blocked or fails to load. 
                A successful ad load should place an iframe that covers this content. */}
            <div className="p-2">
                <p className="font-semibold text-sm">Banner Advertisement (728x90)</p>
                <p className="text-xs mt-1">Ad not loading? Please check your ad-blocker.</p>
            </div>
        </div>
    );
};

export default AdsterraBannerAd;
