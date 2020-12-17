import Link from 'next/link';

const SiteNavbar = ({currentUser}) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && {label: 'Sell Products', href: '/products/new'},
    currentUser && {label: 'My Orders', href: '/orders'},
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ].filter(
    linkConfig => linkConfig
  ).map(
    (linkConfig) => {
      const {label, href} = linkConfig;
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      ); 
    }
  );
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link href="/"><a className="navbar-brand">merch store</a></Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;