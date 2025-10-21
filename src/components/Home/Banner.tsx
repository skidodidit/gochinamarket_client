import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '@/store/useGlobalStore';
import Link from 'next/link';

const Banner = () => {
    const { settings } = useGlobalStore()
    const [currentTime, setCurrentTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        day: 0,
        date: 0,
        month: 0,
        year: 0
    });

    // Real-time clock effect
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime({
                hours: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds(),
                day: now.getDay(),
                date: now.getDate(),
                month: now.getMonth(),
                year: now.getFullYear()
            });
        };

        // Update immediately
        updateTime();

        // Update every second
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    type TimeCircleProps = {
        value: number | string;
        label: string;
    };

    const TimeCircle: React.FC<TimeCircleProps> = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-300 font-bold text-lg md:text-xl">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span className="text-white text-xs md:text-sm mt-2 font-medium">
                {label}
            </span>
        </div>
    );

    const DayCircle: React.FC<{ day: number }> = ({ day }) => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        return (
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                        <span className="text-primary-300 font-bold text-xs md:text-sm block leading-tight">
                            {days[day]}
                        </span>
                        <span className="text-primary-300 font-bold text-lg md:text-xl block leading-tight">
                            {String(currentTime.date).padStart(2, '0')}
                        </span>
                        <span className="text-primary-300 font-bold text-xs md:text-sm block leading-tight">
                            {months[currentTime.month]}
                        </span>
                    </div>
                </div>
                <span className="text-white text-xs md:text-sm mt-2 font-medium">
                    Today
                </span>
            </div>
        );
    };

    return (
        <div className='bg-primary-300 w-full'>
            <div className="w-full text-white max-w-7xl mx-auto px-5 md:px-10 py-12">
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left Side - Content */}
                        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                            {/* Categories Badge */}
                            <div className="inline-block">
                                <span className="text-black font-semibold text-sm md:text-base capitalize">
                                    {settings?.siteName}
                                </span>
                            </div>

                            {/* Main Heading */}
                            <div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    Enhance Your
                                </h1>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    Shopping Experience
                                </h1>
                            </div>

                            {/* Current Time Display */}
                            <div className="flex justify-center lg:justify-start gap-4 md:gap-6 py-6">
                                <DayCircle day={currentTime.day} />
                                <TimeCircle value={currentTime.hours} label="Hours" />
                                <TimeCircle value={currentTime.minutes} label="Minutes" />
                                <TimeCircle value={currentTime.seconds} label="Seconds" />
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <Link 
                                    href={'/products'} 
                                    className="bg-white text-primary-300 font-bold py-3 md:py-4 px-8 md:px-12 text-base md:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                                >
                                    Shop Now!
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Product Image */}
                        <div className="flex justify-center lg:justify-end">
                            <img src="/images/products.png" alt="products" className='w-full h-full'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;