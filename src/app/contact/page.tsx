"use client";
import { useState } from "react";
import { Contact } from "@/types";
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Instagram,
    Youtube,
    MessageSquare,
    Twitter,
    Facebook,
    Send,
    Clock,
    HeadphonesIcon
} from "lucide-react";
import { useGlobalStore } from "@/store/useGlobalStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { contacts: contact } = useGlobalStore()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!contact?.email) {
            alert("No contact email available. Please try again later.");
            setIsSubmitting(false);
            return;
        }

        // Create email content
        const emailSubject = encodeURIComponent(formData.subject);
        const emailBody = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n\n` +
            `Message:\n${formData.message}`
        );

        // Create mailto link
        const mailtoLink = `mailto:${contact.email}?subject=${emailSubject}&body=${emailBody}`;

        // Open default email client
        window.location.href = mailtoLink;

        // Reset form after a short delay
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const socialLinks = [
        { icon: Instagram, href: contact?.instagram, label: "Instagram" },
        { icon: Youtube, href: contact?.youtube, label: "YouTube" },
        { icon: MessageSquare, href: contact?.tiktok, label: "TikTok" },
        { icon: Twitter, href: contact?.twitter, label: "Twitter" },
        { icon: Facebook, href: contact?.facebook, label: "Facebook" },
        { icon: MessageCircle, href: contact?.whatsapp, label: "WhatsApp" },
    ].filter(link => link.href);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-5 md:py-12 text-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-start md:mb-10">
                        <div className="flex justify-start items-center gap-2 mb-4">
                            <div className="w-5 h-10 bg-primary-300 rounded"></div>
                            <span className="text-primary-300 font-semibold">Contact Us</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Contact Cards */}
                            <div className="bg-white shadow-sm p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <HeadphonesIcon className="w-5 h-5 text-primary-300" />
                                    Contact Information
                                </h3>

                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary-50 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-primary-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Email</h4>
                                            <a
                                                href={`mailto:${contact?.email}`}
                                                className="text-gray-600 hover:text-primary-300 transition-colors"
                                            >
                                                {contact?.email}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    {contact?.phone && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-50 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-primary-300" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Phone</h4>
                                                <a
                                                    href={`tel:${contact?.phone}`}
                                                    className="text-gray-600 hover:text-primary-300 transition-colors"
                                                >
                                                    {contact?.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Address */}
                                    {contact?.address && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-50 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-primary-300" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Address</h4>
                                                <p className="text-gray-600">{contact?.address}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* WhatsApp */}
                                    {contact?.whatsapp && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-6 h-6 text-green-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">WhatsApp</h4>
                                                <a
                                                    href={`https://wa.me/${contact?.whatsapp}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-600 hover:text-green-500 transition-colors"
                                                >
                                                    +{contact?.whatsapp}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Social Media */}
                            {socialLinks.length > 0 && (
                                <div className="bg-white shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Follow Us</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {socialLinks.map((social, index) => {
                                            const Icon = social.icon;
                                            return (
                                                <a
                                                    key={index}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 bg-gray-50 hover:bg-primary-50 flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                                                    aria-label={social.label}
                                                >
                                                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary-300 transition-colors" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-sm p-8 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                                <p className="text-gray-600 mb-8">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent transition-all duration-200"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary-300 text-black py-4 px-6 hover:bg-primary-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                                Opening Email...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message via Email
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-white shadow-sm border border-gray-100">
                                    <div className="w-12 h-12 bg-primary-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-6 h-6 text-primary-300" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Fast Response</h4>
                                    <p className="text-gray-600 text-sm">We typically reply within 2 hours during business days</p>
                                </div>

                                <div className="text-center p-6 bg-white shadow-sm border border-gray-100">
                                    <div className="w-12 h-12 bg-primary-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <HeadphonesIcon className="w-6 h-6 text-primary-300" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                                    <p className="text-gray-600 text-sm">Emergency support available for urgent matters</p>
                                </div>

                                <div className="text-center p-6 bg-white shadow-sm border border-gray-100">
                                    <div className="w-12 h-12 bg-primary-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageCircle className="w-6 h-6 text-primary-300" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Multiple Channels</h4>
                                    <p className="text-gray-600 text-sm">Contact us via email, phone, or social media</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}