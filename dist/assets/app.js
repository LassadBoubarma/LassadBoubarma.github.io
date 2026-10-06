(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const progress = document.createElement('div');
  progress.className = 'route-progress';
  document.body.append(progress);
  let observer;
  let navigating = false;

  function setup() {
    const button = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#primary-navigation');

    button?.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      nav?.classList.toggle('is-open', open);
    });

    document.querySelectorAll('.copy-email').forEach(copyButton => copyButton.addEventListener('click', async () => {
      const status = copyButton.parentElement.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText(copyButton.dataset.email);
        if (status) status.textContent = 'Email address copied';
      } catch {
        if (status) status.textContent = copyButton.dataset.email;
      }
    }));

    observer?.disconnect();
    if (!reduced.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }), { threshold: .08 });

      document.querySelectorAll('.project-card,.command-row,.category-row,.feature-grid article,.experience-row,.skill-grid>div').forEach(element => {
        if (element.getBoundingClientRect().top > innerHeight * .88) {
          element.classList.add('reveal-ready');
          observer.observe(element);
        }
      });
    }
  }

  async function navigate(url, pop = false) {
    if (navigating) return;
    navigating = true;
    progress.classList.add('loading');
    try {
      const response = await fetch(url.href);
      if (!response.ok) throw Error('Navigation failed');
      const next = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (!next.querySelector('main')) throw Error('Missing page');
      const update = () => {
        ['.site-header', 'main', '.site-footer'].forEach(selector => {
          const current = document.querySelector(selector);
          const replacement = next.querySelector(selector);
          if (current && replacement) current.replaceWith(replacement);
        });
        document.title = next.title;
        const currentDescription = document.querySelector('meta[name="description"]');
        const nextDescription = next.querySelector('meta[name="description"]');
        if (currentDescription && nextDescription) currentDescription.content = nextDescription.content;
        if (!pop) history.pushState({}, '', url);
        const main = document.querySelector('main');
        main?.setAttribute('tabindex', '-1');
        main?.focus({ preventScroll: true });
        scrollTo({ top: 0, behavior: 'auto' });
        if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ behavior: 'auto' });
        setup();
      };
      if (document.startViewTransition && !reduced.matches) await document.startViewTransition(update).finished;
      else update();
    } catch {
      location.assign(url.href);
    } finally {
      navigating = false;
      progress.classList.remove('loading');
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol) || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    if (url.pathname === location.pathname) {
      if (!url.hash) {
        event.preventDefault();
        scrollTo({ top: 0, behavior: reduced.matches ? 'instant' : 'smooth' });
      }
      return;
    }
    event.preventDefault();
    navigate(url);
  });

  addEventListener('popstate', () => navigate(new URL(location.href), true));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const button = document.querySelector('.menu-toggle');
    if (button?.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
      document.querySelector('#primary-navigation')?.classList.remove('is-open');
      button.focus();
    }
  });

  setup();
})();
