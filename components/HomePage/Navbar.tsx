'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { lang, t, switchLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleLanguage = () => {
        switchLanguage(lang === 'id' ? 'en' : 'id');
    };

    type MenuItem = {
        label: string;
        href?: string;
        submenu?: MenuItem[];
    };

    const menuItems: MenuItem[] = [
        { label: t('nav.home'), href: `/${lang}` },
        {
            label: t('nav.team'),
            submenu: [
                {
                    label: t('nav.main_team'),
                    submenu: [
                        { label: t('nav.players'), href: `/${lang}/tim/utama/pemain` },
                        { label: t('nav.officials'), href: `/${lang}/tim/utama/officials` }
                    ]
                },
                {
                    label: t('nav.academy'),
                    submenu: [
                        {
                            label: t('nav.u20'),
                            submenu: [
                                { label: t('nav.players'), href: `/${lang}/tim/utama/pemain?tab=akademi` }
                            ]
                        },
                        { label: t('nav.officials'), href: `/${lang}/tim/utama/officials?tab=akademi` }
                    ]
                }
            ]
        },
        {
            label: t('nav.matches'),
            submenu: [
                { label: t('nav.schedule'), href: `/${lang}/pertandingan/jadwal` },
                { label: t('nav.standings'), href: `/${lang}/pertandingan/klasemen` }
            ]
        },
        {
            label: t('nav.media'),
            submenu: [
                { label: t('nav.news'), href: `/${lang}/media/berita` },
                { label: t('nav.gallery'), href: `/${lang}/media/gallery` },
                { label: t('nav.video'), href: `/${lang}/media/video` }
            ]
        },
        {
            label: t('nav.club'),
            submenu: [
                { label: t('nav.about'), href: `/${lang}/klub/tentang` }
            ]
        },
        { label: t('nav.mufa'), href: `/${lang}/mufa` }
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link href={`/${lang}`} className="navbar-logo">
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
                    <a href="https://www.instagram.com/maduraunited.fc?igsh=bmYxY201MWx6Yjkz" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaInstagram />
                    </a>
                    <a href="https://www.facebook.com/Maduraunitedfc.official/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaFacebookF />
                    </a>
                    <a href="https://x.com/MaduraUnitedFC" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaTwitter />
                    </a>
                    <a href="https://youtube.com/@maduraunitedfc?si=nVakpGhvYmyS3HBb" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaYoutube />
                    </a>
                    <button onClick={handleToggleLanguage} className="language-switcher">
                        <Image
                            src={lang === 'id' ? 'https://flagcdn.com/w40/id.png' : 'https://flagcdn.com/w40/gb.png'}
                            alt={lang === 'id' ? 'Indonesia' : 'English'}
                            width={20}
                            height={15}
                            className="flag-icon"
                        />
                        {lang.toUpperCase()}
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
                                    <summary>
                                        {item.label}
                                        <FaChevronDown className="mobile-dropdown-arrow" />
                                    </summary>
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
                                                            <summary>
                                                                {subItem.label}
                                                                <FaChevronDown className="mobile-dropdown-arrow" />
                                                            </summary>
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
                                                                                    <summary>
                                                                                        {nestedItem.label}
                                                                                        <FaChevronDown className="mobile-dropdown-arrow" />
                                                                                    </summary>
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

                    {/* Mobile Footer: Social Media & Language Switcher */}
                    <div className="mobile-menu-footer" style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Social Media Icons */}
                        <div className="flex justify-center gap-6">
                            <a href="https://www.instagram.com/maduraunited.fc?igsh=bmYxY201MWx6Yjkz" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#DC2626] transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.facebook.com/Maduraunitedfc.official/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#DC2626] transition-colors">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="https://x.com/MaduraUnitedFC" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#DC2626] transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://youtube.com/@maduraunitedfc?si=nVakpGhvYmyS3HBb" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#DC2626] transition-colors">
                                <FaYoutube size={24} />
                            </a>
                        </div>

                        {/* Language Switcher */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleToggleLanguage}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-bold text-sm tracking-wider"
                            >
                                <Image
                                    src={lang === 'id' ? 'https://flagcdn.com/w40/id.png' : 'https://flagcdn.com/w40/gb.png'}
                                    alt={lang === 'id' ? 'Indonesia' : 'English'}
                                    width={24}
                                    height={18}
                                    className="rounded-sm object-cover"
                                />
                                {lang === 'id' ? 'INDONESIA' : 'ENGLISH'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
