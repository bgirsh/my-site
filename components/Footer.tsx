export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span className="brand">
          <span className="brand__mark" aria-hidden="true">D</span>
          <span>Delinte</span>
        </span>
        <p className="legal">&copy; {new Date().getFullYear()} Delinte Tires · Centurion X/T · Concept marketing page</p>
      </div>
    </footer>
  );
}