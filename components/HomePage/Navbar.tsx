'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [language, setLanguage] = useState<'id' | 'en'>('id');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'id' ? 'en' : 'id');
    };

    type MenuItem = {
        label: string;
        href?: string;
        submenu?: MenuItem[];
    };

    const menuItems: MenuItem[] = [
        { label: 'Beranda', href: '/' },
        {
            label: 'Tim',
            submenu: [
                {
                    label: 'Tim Utama',
                    submenu: [
                        { label: 'Pemain', href: '/tim/utama/pemain' },
                        { label: 'Officials', href: '/tim/utama/officials' }
                    ]
                },
                {
                    label: 'Academy',
                    submenu: [
                        {
                            label: 'U-20',
                            submenu: [
                                { label: 'Pemain', href: '/tim/academy/u20/pemain' }
                            ]
                        },
                        { label: 'Officials', href: '/tim/academy/officials' }
                    ]
                }
            ]
        },
        {
            label: 'Pertandingan',
            submenu: [
                { label: 'Jadwal dan Hasil', href: '/pertandingan/jadwal' },
                { label: 'Klasemen', href: '/pertandingan/klasemen' }
            ]
        },
        {
            label: 'Media',
            submenu: [
                { label: 'Berita', href: '/media/berita' },
                { label: 'Gallery', href: '/media/gallery' },
                { label: 'Infografik', href: '/media/infografik' },
                { label: 'Video', href: '/media/video' }
            ]
        },
        {
            label: 'Klub',
            submenu: [
                { label: 'Tentang Madura United FC', href: '/klub/tentang' }
            ]
        },
        { label: 'MUFA', href: '/mufa' }
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link href="/" className="navbar-logo">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png"
                        alt="Madura United FC"
                        width={100}
                        height={100}
                        priority
                        style={{ width: 'clamp(60px, 8vw, 100px)', height: 'clamp(60px, 8vw, 100px)' }}
                    />
                </Link>

                {/* Desktop Menu */}
                <ul className="navbar-menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className="navbar-item">
                            {item.href ? (
                                <Link href={item.href}>{item.label}</Link>
                            ) : (
                                <>
                                    <span className="navbar-link">
                                        {item.label}
                                        {item.submenu && <FaChevronDown className="dropdown-arrow" />}
                                    </span>
                                    {item.submenu && (
                                        <ul className="dropdown">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <li key={subIndex} className="dropdown-item">
                                                    {subItem.href ? (
                                                        <Link href={subItem.href}>{subItem.label}</Link>
                                                    ) : (
                                                        <>
                                                            <span className="dropdown-link">
                                                                {subItem.label}
                                                                {subItem.submenu && <FaChevronDown className="nested-dropdown-arrow" />}
                                                            </span>
                                                            {subItem.submenu && (
                                                                <ul className="dropdown-nested">
                                                                    {subItem.submenu.map((nestedItem, nestedIndex) => (
                                                                        <li key={nestedIndex} className="dropdown-item">
                                                                            {nestedItem.href ? (
                                                                                <Link href={nestedItem.href}>{nestedItem.label}</Link>
                                                                            ) : (
                                                                                <>
                                                                                    <span className="dropdown-link">
                                                                                        {nestedItem.label}
                                                                                        {nestedItem.submenu && <FaChevronDown className="nested-dropdown-arrow" />}
                                                                                    </span>
                                                                                    {nestedItem.submenu && (
                                                                                        <ul className="dropdown-nested-deep">
                                                                                            {nestedItem.submenu.map((deepItem, deepIndex) => (
                                                                                                <li key={deepIndex} className="dropdown-item">
                                                                                                    <Link href={deepItem.href || '#'}>{deepItem.label}</Link>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Right Side Icons */}
                <div className="navbar-icons">
                    <a href="https://instagram.com/maduraunited.fc" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaInstagram />
                    </a>
                    <a href="https://facebook.com/maduraunited.fc" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com/maduraunited_fc" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaTwitter />
                    </a>
                    <a href="https://youtube.com/@maduraunitedfc" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaYoutube />
                    </a>
                    <button onClick={toggleLanguage} className="language-switcher">
                        <Image
                            src={language === 'id' ? 'https://flagcdn.com/w40/id.png' : 'https://flagcdn.com/w40/gb.png'}
                            alt={language === 'id' ? 'Indonesia' : 'English'}
                            width={20}
                            height={15}
                            className="flag-icon"
                        />
                        {language.toUpperCase()}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    {menuItems.map((item, index) => (
                        <div key={index} className="mobile-menu-item">
                            {item.href ? (
                                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    {item.label}
                                </Link>
                            ) : (
                                <details>
                                    <summary>{item.label}</summary>
                                    {item.submenu && (
                                        <div className="mobile-submenu">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <div key={subIndex}>
                                                    {subItem.href ? (
                                                        <Link href={subItem.href} onClick={() => setIsMobileMenuOpen(false)}>
                                                            {subItem.label}
                                                        </Link>
                                                    ) : (
                                                        <details>
                                                            <summary>{subItem.label}</summary>
                                                            {subItem.submenu && (
                                                                <div className="mobile-submenu-nested">
                                                                    {subItem.submenu.map((nestedItem, nestedIndex) => (
                                                                        <div key={nestedIndex}>
                                                                            {nestedItem.href ? (
                                                                                <Link href={nestedItem.href} onClick={() => setIsMobileMenuOpen(false)}>
                                                                                    {nestedItem.label}
                                                                                </Link>
                                                                            ) : (
                                                                                <details>
                                                                                    <summary>{nestedItem.label}</summary>
                                                                                    {nestedItem.submenu && (
                                                                                        <div className="mobile-submenu-deep">
                                                                                            {nestedItem.submenu.map((deepItem, deepIndex) => (
                                                                                                <Link key={deepIndex} href={deepItem.href || '#'} onClick={() => setIsMobileMenuOpen(false)}>
                                                                                                    {deepItem.label}
                                                                                                </Link>
                                                                                            ))}
                                                                                        </div>
                                                                                    )}
                                                                                </details>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </details>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </details>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
}
