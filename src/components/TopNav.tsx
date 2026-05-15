import { Link } from "react-router-dom";
import { siteConfig } from "../config";

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function TopNav() {
  const brandAria =
    siteConfig.navBrand?.trim() || siteConfig.name.split(" ")[0] || siteConfig.name;
  const blogHref = siteConfig.blogUrl?.trim();
  const thirdIsBlog = Boolean(blogHref);
  const thirdLabel = thirdIsBlog ? "Blogs" : "Contact";
  const xHref = siteConfig.xUrl?.trim();
  const cvHref = siteConfig.cvUrl.trim();
  const cvIsFile =
    cvHref.endsWith(".pdf") || cvHref.includes("/cv") || cvHref.includes("drive.google");

  return (
    <header className="topnav" role="banner">
      <div className="topnav__wrap">
        <div className="topnav__bar">
          <Link className="topnav__brand" to="/" aria-label={`${brandAria}, back to top`}>
            <span className="topnav__brand-inner">
              <span className="topnav__brand-letter" aria-hidden="true">
                G
              </span>
            </span>
          </Link>

          <nav className="topnav__nav" aria-label="Primary">
            <Link className="topnav__link" to="/#projects">
              Works
            </Link>
            <Link className="topnav__link" to="/about">
              About
            </Link>
            {thirdIsBlog ? (
              <a className="topnav__link" href={blogHref}>
                {thirdLabel}
              </a>
            ) : (
              <Link className="topnav__link" to="/#contact">
                {thirdLabel}
              </Link>
            )}
          </nav>

          <div className="topnav__tools">
            <a
              className="topnav__icon"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${siteConfig.name} on LinkedIn`}
            >
              <LinkedInIcon />
            </a>
            {xHref ? (
              <a
                className="topnav__icon"
                href={xHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`${siteConfig.name} on X`}
              >
                <XIcon />
              </a>
            ) : null}
            {cvHref ? (
              <a
                className="topnav__resume"
                href={cvHref}
                {...(cvIsFile ? { download: true } : { target: "_blank", rel: "noreferrer" })}
              >
                Resume
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
