import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#" className="brand" aria-label="Delinte home">
          <span className="brand__mark" aria-hidden="true">D</span>
          <span>Delinte</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#overview" aria-current="page">Overview</a>
          <a href="#performance">Performance</a>
          <a href="#tech">Engineering</a>
          <a href="#sizes">Sizes</a>
          <a href="#dealer">Find a dealer</a>
        </nav>

        <div className="site-header__actions">
          <button className="theme-toggle" type="button" aria-label="Toggle color theme" data-theme-toggle="">
            <svg data-icon="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path></svg>
            <svg data-icon="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>
          </button>
          <a className="btn btn--primary" href="#dealer">
            Buy now
            <svg className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>
          </a>
        </div>
      </div>
    </header>
  );
}