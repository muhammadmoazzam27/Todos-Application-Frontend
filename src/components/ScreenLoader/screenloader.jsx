import React from 'react';

const ScreenLoader = ({ message = "Loading, please wait..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
            {/* Outer Glowing Container */}
            <div className="relative flex items-center justify-center">

                {/* 1. Outer Pulsing Glow */}
                <div className="absolute h-24 w-24 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>

                {/* 2. Outer Rotating Gradient Ring */}
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 p-1">
                    {/* Inner Counter-Rotating Ring */}
                    <div className="h-full w-full animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-4 border-transparent border-b-cyan-400 border-l-teal-400"></div>
                </div>

                {/* 3. Center Glowing Core Dot */}
                <div className="absolute h-4 w-4 rounded-full bg-blue-400 shadow-[0_0_12px_#3b82f6] animate-ping"></div>
                <div className="absolute h-3 w-3 rounded-full bg-cyan-300"></div>
            </div>

            {/* Animated Text Section */}
            {message && (
                <div className="mt-6 flex flex-col items-center gap-1">
                    <p className="text-base font-semibold bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent tracking-wider animate-pulse">
                        {message}
                    </p>
                    {/* Subtle Loading Dots */}
                    <div className="flex gap-1 mt-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScreenLoader;