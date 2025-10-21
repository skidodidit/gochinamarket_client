import React, { useState } from 'react';
import { X } from 'lucide-react';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Profile: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const [user] = useState({
        signedIn: false,
        name: ''
    });

    const handleSignIn = () => {
        // Handle sign-in logic
        setIsOpen(false);
    };

    const handleCreateAccount = () => {
        // Handle create account logic
        setIsOpen(false);
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`fixed inset-0 bg-black/20 z-40 backdrop-blur-sm transition-opacity duration-300 touch-none ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            />
            
            {/* Profile Sidebar */}
            <div 
                className={`fixed touch-none top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Account
                    </h2>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Profile Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {user.signedIn ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-lg font-medium text-gray-900">{user.name}</p>
                            </div>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Profile
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Wishlist
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Compare
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Track Order
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Help Center
                            </button>
                            <button className="w-full bg-primary-300 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <button 
                                onClick={handleSignIn}
                                className="w-full bg-primary-300 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary transition-colors"
                            >
                                Sign In
                            </button>
                            <button 
                                onClick={handleCreateAccount}
                                className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors"
                            >
                                Create Account
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Wishlist
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Compare
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Track Order
                            </button>
                            <button className="w-full text-primary-300 py-3 px-4 border border-primary-300 rounded-lg font-medium hover:bg-primary-300 transition-colors">
                                Help Center
                            </button>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 p-6">
                    {/* Add footer content if needed */}
                </div>
            </div>
        </>
    );
};

export default Profile;