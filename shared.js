/**
 * 衡律法律事務所 — 共用 Navigation & Footer
 * 所有頁面引入此檔，自動注入 nav / footer，並標記 active 連結。
 */

(function () {
  // Nav：橫式 logo（icon + 文字）去背
  const LOGO_NAV = `<svg viewBox="0 0 36 36" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0"><line x1="18" y1="5" x2="18" y2="29" stroke="#1B2B4B" stroke-width="1.5" stroke-linecap="round"/><line x1="4" y1="11" x2="32" y2="11" stroke="#1B2B4B" stroke-width="2" stroke-linecap="round"/><circle cx="18" cy="11" r="2.5" fill="#8B7355"/><line x1="7" y1="11" x2="7" y2="20" stroke="#1B2B4B" stroke-width="1.2" stroke-linecap="round"/><path d="M3 20 Q7 24 11 20" stroke="#1B2B4B" stroke-width="1.5" fill="none" stroke-linecap="round"/><line x1="29" y1="11" x2="29" y2="20" stroke="#1B2B4B" stroke-width="1.2" stroke-linecap="round"/><path d="M25 20 Q29 24 33 20" stroke="#1B2B4B" stroke-width="1.5" fill="none" stroke-linecap="round"/><polygon points="13,29 23,29 18,22" fill="#1B2B4B"/></svg><span style="display:flex;flex-direction:column;gap:2px"><span style="font-family:'Noto Serif TC',Georgia,serif;font-size:15px;font-weight:600;color:#1B2B4B;letter-spacing:.07em;line-height:1.1">衡律法律事務所</span><span style="font-size:9px;letter-spacing:.2em;color:#8B7355;text-transform:uppercase;font-family:Georgia,serif;line-height:1">Henglü Law Office</span></span>`;
  // Footer：1:1 icon mark 去背（白色版）
  const LOGO_ICON = `<svg viewBox="0 0 36 36" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0"><line x1="18" y1="5" x2="18" y2="29" stroke="rgba(255,255,255,.8)" stroke-width="1.5" stroke-linecap="round"/><line x1="4" y1="11" x2="32" y2="11" stroke="rgba(255,255,255,.8)" stroke-width="2" stroke-linecap="round"/><circle cx="18" cy="11" r="2.5" fill="#B09A78"/><line x1="7" y1="11" x2="7" y2="20" stroke="rgba(255,255,255,.8)" stroke-width="1.2" stroke-linecap="round"/><path d="M3 20 Q7 24 11 20" stroke="rgba(255,255,255,.8)" stroke-width="1.5" fill="none" stroke-linecap="round"/><line x1="29" y1="11" x2="29" y2="20" stroke="rgba(255,255,255,.8)" stroke-width="1.2" stroke-linecap="round"/><path d="M25 20 Q29 24 33 20" stroke="rgba(255,255,255,.8)" stroke-width="1.5" fill="none" stroke-linecap="round"/><polygon points="13,29 23,29 18,22" fill="rgba(255,255,255,.8)"/></svg><span style="display:flex;flex-direction:column;gap:2px"><span style="font-family:'Noto Serif TC',Georgia,serif;font-size:14px;font-weight:600;color:rgba(255,255,255,.85);letter-spacing:.07em;line-height:1.1">衡律法律事務所</span><span style="font-size:9px;letter-spacing:.2em;color:#B09A78;text-transform:uppercase;font-family:Georgia,serif;line-height:1">Henglü Law Office</span></span>`;

  // 本地 file:// 用相對路徑；GitHub Pages 子路徑用 repo prefix
  const ROOT = (() => {
    if (location.protocol === 'file:') return '';
    const p = location.pathname;
    const m = p.match(/^(\/[^/]+\/henglv-law)/);
    if (m) return m[1];
    return '';
  })();

  const href = (path) => {
    // 相對路徑模式（本地 file:// 或根目錄部署）
    if (ROOT === '') return path.replace(/^\//, '');
    return ROOT + path;
  };

  const NAV_LINKS = [
    { path: '/index.html',    label: '首頁',     key: 'index'    },
    { path: '/about.html',    label: '關於衡律',  key: 'about'    },
    { path: '/services.html', label: '服務項目',  key: 'services' },
    { path: '/cases.html',    label: '案例分享',  key: 'cases'    },
    { path: '/faq.html',      label: '常見問題',  key: 'faq'      },
    { path: '/contact.html',  label: '聯絡我們',  key: 'contact'  },
  ];

  function currentKey() {
    const p = location.pathname;
    if (p.endsWith('about.html'))    return 'about';
    if (p.endsWith('services.html')) return 'services';
    if (p.endsWith('cases.html'))    return 'cases';
    if (p.endsWith('faq.html'))      return 'faq';
    if (p.endsWith('contact.html'))  return 'contact';
    return 'index';
  }

  function injectNav() {
    const active = currentKey();
    const linksHtml = NAV_LINKS.map(l => {
      const isActive = l.key === active;
      const isContact = l.key === 'contact';
      if (isContact) {
        return `<li><a href="${href(l.path)}" class="nav-cta">預約諮詢 →</a></li>`;
      }
      return `<li><a href="${href(l.path)}" class="${isActive ? 'nav-active' : ''}" ${isActive ? 'aria-current="page"' : ''}>${l.label}</a></li>`;
    }).join('');

    const nav = document.createElement('nav');
    nav.id = 'site-nav';
    nav.setAttribute('aria-label', '主選單');
    nav.innerHTML = `
      <div class="container nav-inner">
        <a href="${href('/index.html')}" class="nav-logo" aria-label="衡律法律事務所首頁">
          ${LOGO_NAV}
        </a>
        <ul class="nav-links" id="nav-menu" role="list">${linksHtml}</ul>
        <button class="hamburger" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="開啟/關閉選單">
          <span></span><span></span><span></span>
        </button>
      </div>`;
    document.body.prepend(nav);

    // Mobile toggle
    document.getElementById('nav-toggle').addEventListener('click', function () {
      const menu = document.getElementById('nav-menu');
      const open = menu.classList.toggle('nav-open');
      this.setAttribute('aria-expanded', open);
      this.classList.toggle('is-open', open);
    });
  }

  function injectFooter() {
    const active = currentKey();
    const linksHtml = NAV_LINKS.filter(l => l.key !== 'contact').map(l =>
      `<a href="${href(l.path)}" ${l.key === active ? 'aria-current="page"' : ''}>${l.label}</a>`
    ).join('');

    const footer = document.createElement('footer');
    footer.innerHTML = `
      <div class="container footer-inner">
        <div>
          <div class="footer-logo">
            ${LOGO_ICON}
          </div>
          <p class="footer-tagline">台中律師事務所 · 民事 · 刑事 · 商業 · 家事</p>
        </div>
        <nav class="footer-nav" aria-label="頁尾連結">${linksHtml}</nav>
        <div class="footer-right">
          <a href="${href('/contact.html')}" class="footer-cta">預約免費諮詢 →</a>
          <p class="footer-copy">© 2024 衡律法律事務所<br/>ALL RIGHTS RESERVED.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <span>網站設計：橋序創研 BridgeSeqLab</span>
          <span><a href="${href('/faq.html')}">常見問題</a> · <a href="#">隱私政策</a> · <a href="#">免責聲明</a></span>
        </div>
      </div>`;
    document.body.appendChild(footer);
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* ── Shared Nav ── */
      #site-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 200;
        background: rgba(247,245,241,0.96);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid #DDD9D1;
      }
      .nav-inner {
        display: flex; align-items: center; justify-content: space-between;
        height: 68px; max-width: 1180px; margin: 0 auto;
        padding: 0 clamp(1.5rem,5vw,4rem);
      }
      .nav-logo {
        font-size: 1rem; font-weight: 600; letter-spacing: 0.1em;
        color: #1B2B4B; text-decoration: none;
        font-family: Georgia, serif; display: flex; align-items: center; gap: 6px;
      }
      .nav-logo span { color: #8B7355; }
      .nav-links {
        display: flex; gap: 2.2rem; list-style: none;
        align-items: center;
      }
      .nav-links a {
        font-size: 0.82rem; letter-spacing: 0.08em;
        color: #6B6660; text-decoration: none;
        transition: color 0.2s; white-space: nowrap;
      }
      .nav-links a:hover,
      .nav-links a.nav-active { color: #1B2B4B; }
      .nav-links a.nav-active { font-weight: 600; }
      .nav-cta {
        display: inline-flex; align-items: center;
        background: #1B2B4B !important; color: #fff !important;
        padding: 0.5rem 1.3rem; border-radius: 2px;
        font-size: 0.8rem !important; letter-spacing: 0.1em !important;
        transition: background 0.2s !important; font-weight: 500 !important;
      }
      .nav-cta:hover { background: #2A3F6F !important; }
      .hamburger {
        display: none; cursor: pointer;
        flex-direction: column; gap: 5px;
        background: none; border: none; padding: 4px;
      }
      .hamburger span { display: block; width: 22px; height: 1.5px; background: #1B2B4B; transition: all 0.3s; }
      .hamburger.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
      .hamburger.is-open span:nth-child(2) { opacity: 0; }
      .hamburger.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

      /* ── Shared Footer ── */
      footer {
        background: #111927;
        border-top: 1px solid rgba(255,255,255,0.06);
      }
      .footer-inner {
        display: grid; grid-template-columns: 1fr 1fr 1fr;
        gap: 3rem; padding: 4rem clamp(1.5rem,5vw,4rem);
        max-width: 1180px; margin: 0 auto;
      }
      .footer-logo {
        display: flex; align-items: center; gap: 10px;
        margin-bottom: 0.7rem;
      }
      .footer-logo span { color: #8B7355; }
      .footer-tagline { font-size: 0.75rem; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; }
      .footer-nav { display: flex; flex-direction: column; gap: 0.9rem; padding-top: 0.2rem; }
      .footer-nav a {
        font-size: 0.82rem; color: rgba(255,255,255,0.45);
        text-decoration: none; letter-spacing: 0.06em; transition: color 0.2s;
      }
      .footer-nav a:hover, .footer-nav a[aria-current] { color: #B09A78; }
      .footer-right { display: flex; flex-direction: column; gap: 1rem; align-items: flex-end; }
      .footer-cta {
        display: inline-flex; align-items: center;
        background: #8B7355; color: #fff;
        padding: 0.65rem 1.5rem; border-radius: 2px;
        font-size: 0.82rem; letter-spacing: 0.1em;
        text-decoration: none; transition: background 0.2s;
        white-space: nowrap;
      }
      .footer-cta:hover { background: #B09A78; }
      .footer-copy { font-size: 0.72rem; color: rgba(255,255,255,0.3); line-height: 1.8; text-align: right; }
      .footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.06);
        padding: 1.2rem clamp(1.5rem,5vw,4rem);
      }
      .footer-bottom .container {
        display: flex; justify-content: space-between; align-items: center;
        max-width: 1180px; margin: 0 auto;
        font-size: 0.7rem; color: rgba(255,255,255,0.25);
      }
      .footer-bottom a { color: rgba(255,255,255,0.3); text-decoration: none; }
      .footer-bottom a:hover { color: #B09A78; }

      /* Mobile */
      @media (max-width: 900px) {
        .hamburger { display: flex; }
        .nav-links {
          display: none; position: fixed;
          top: 68px; left: 0; right: 0;
          background: rgba(247,245,241,0.98);
          backdrop-filter: blur(16px);
          flex-direction: column; gap: 0;
          border-bottom: 1px solid #DDD9D1;
          padding: 1rem 0;
        }
        .nav-links.nav-open { display: flex; }
        .nav-links li { width: 100%; }
        .nav-links a {
          display: block; padding: 0.9rem 2rem;
          font-size: 0.9rem; border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .nav-cta { margin: 0.8rem 2rem; display: block; text-align: center; }
        .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
        .footer-right { align-items: flex-start; }
        .footer-copy { text-align: left; }
        .footer-bottom .container { flex-direction: column; gap: 0.5rem; text-align: center; }
      }
    `;
    document.head.appendChild(style);
  }

  // 頁面 body 加 padding-top 避免 fixed nav 覆蓋內容
  function fixBodyPadding() {
    document.body.style.paddingTop = '68px';
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    injectNav();
    injectFooter();
    fixBodyPadding();
  });
})();
