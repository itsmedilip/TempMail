import React, { useEffect, useRef } from 'react';

const AdsterraBannerAd: React.FC = () => {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        // Prevent script from being loaded multiple times on re-renders
        if (scriptLoaded.current || !adContainerRef.current) {
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = "//winningplunder.com/1297e44076ad45d8be6da0504fbabe00/invoke.js";

        // The ad script will look for the container div by its ID.
        adContainerRef.current.appendChild(script);
        scriptLoaded.current = true;

    }, []);

    return (
        <div ref={adContainerRef} className="w-[728px] min-h-[90px] max-w-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 relative grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
            {/* This is the container the ad script will target */}
            <div id="container-1297e44076ad45d8be6da0504fbabe00"></div>

            {/* Placeholder content */}
            <div className="text-center p-2">
                <p className="font-semibold text-sm">Banner Advertisement</p>
                <p className="text-xs mt-1">Ad not loading? Please check your ad-blocker.</p>
            </div>
        </div>
    );
};

export default AdsterraBannerAd;