'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="nav-bar w-nav">
      <div>
        <nav role="navigation" className="nav-menu-2 w-nav-menu">
          <Link href="/" className="nav-link w-nav-link">HOME</Link>
          <Link href="/worship-spiritual-life" className="nav-link w-nav-link">WORSHIP &amp; SPIRITUAL LIFE</Link>
          <Link href="/community-outreach" className="nav-link w-nav-link">OUTREACH</Link>
          <a href="https://www.eventbrite.com/o/st-paul-ucc-pekin-20138483458" target="_blank" rel="noopener noreferrer" className="nav-link w-nav-link">EVENTS</a>
          <Link href="/special-music" className="nav-link w-nav-link">SPECIAL MUSIC</Link>
          <a href="https://tithe.ly/give?c=2192819" target="_blank" rel="noopener noreferrer" className="nav-link w-nav-link">ONLINE GIVING</a>
          <Link href="/leadership" className="nav-link w-nav-link">LEADERSHIP</Link>
          <Link href="/calendar" className="nav-link w-nav-link">CALENDAR</Link>
          <Link href="/contact-us" className="nav-link w-nav-link">CONTACT US</Link>
          <a href="https://www.youtube.com/channel/UC0wyuGM_zn0D_IfoWYOKa1A" target="_blank" rel="noopener noreferrer" className="nav-link w-nav-link">YOUTUBE</a>
          <a href="https://www.facebook.com/stpauluccpekin" target="_blank" rel="noopener noreferrer" className="nav-link w-nav-link">FACEBOOK</a>
        </nav>
        <div className="menu-button w-nav-button">
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
}

