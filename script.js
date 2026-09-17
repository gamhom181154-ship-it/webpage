(() => {

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const body = document.body;
  const root = document.documentElement;

  const loader = $('.loader');
  const pct = $('#loadPct');
  const loadDepth = $('#loadDepth');
  const status = $('#loadStatus');

  const statuses = [
    'CALIBRATING SONAR...',
    'MAPPING WATER COLUMN...',
    'DETECTING BIOLOGICAL SIGNAL...',
    'CHECKING PRESSURE SENSOR...',
    'ESTABLISHING DEEP-SEA LINK...',
    'SYSTEM ONLINE'
  ];

  let progress = 0;

  const reduced =
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     LOADING SCREEN
  ========================= */

  if (loader) {

    const timer = setInterval(() => {

      progress = Math.min(
        100,
        progress + (Math.random() * 11 + 5)
      );

      if (pct) {
        pct.textContent =
          String(Math.floor(progress)).padStart(3, '0') + '%';
      }

      if (loadDepth) {
        loadDepth.textContent =
          'DEPTH ' +
          String(Math.floor(progress * 45))
            .padStart(4, '0') +
          'M';
      }

      if (status) {

        status.textContent =
          statuses[
            Math.min(
              statuses.length - 1,
              Math.floor(progress / 18)
            )
          ];

      }

      if (progress >= 100) {

        clearInterval(timer);

        setTimeout(() => {
          loader.classList.add('done');
        }, reduced ? 50 : 500);

      }

    }, reduced ? 20 : 90);

  }

  /* =========================
     THEME
  ========================= */

  const saved =
    localStorage.getItem('myOceanTheme');

  if (saved === 'tech') {
    body.classList.add('surface-mode');
  }

  const theme = $('#themeButton');

  theme?.addEventListener('click', () => {

    body.classList.toggle('surface-mode');

    localStorage.setItem(
      'myOceanTheme',
      body.classList.contains('surface-mode')
        ? 'tech'
        : 'ocean'
    );

  });

  /* =========================
     MOUSE
  ========================= */

  const cursor = $('.cursor');

  let mx = innerWidth / 2;
  let my = innerHeight / 2;

  let cx = mx;
  let cy = my;

  addEventListener('pointermove', event => {

    mx = event.clientX;
    my = event.clientY;

    root.style.setProperty(
      '--mx',
      mx + 'px'
    );

    root.style.setProperty(
      '--my',
      my + 'px'
    );

  });

  if (cursor && !reduced) {

    (function cursorLoop() {

      cx += (mx - cx) * .16;
      cy += (my - cy) * .16;

      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';

      requestAnimationFrame(cursorLoop);

    })();

  }
  else if (cursor) {

    cursor.style.display = 'none';

  }

  /* =========================
     CURSOR HOVER
  ========================= */

  $$(
    'a,button,.ocean-card,.hobby,.contact-card,.photo-card'
  ).forEach(element => {

    element.addEventListener(
      'pointerenter',
      () => cursor?.classList.add('hover')
    );

    element.addEventListener(
      'pointerleave',
      () => cursor?.classList.remove('hover')
    );

  });

  /* =========================
     CLICK / WATER PRESSURE
  ========================= */

  addEventListener('click', event => {

    if (reduced) return;

    const wave =
      document.createElement('div');

    wave.className = 'click-wave';

    wave.style.left =
      event.clientX + 'px';

    wave.style.top =
      event.clientY + 'px';

    document.body.appendChild(wave);

    setTimeout(() => {
      wave.remove();
    }, 900);

  });

  /* =========================
     DEPTH TELEMETRY
  ========================= */

  const depth = $('#depthValue');
  const pressure = $('#pressure');
  const temp = $('#temp');
  const track = $('.depth-track i');

  function telemetry() {

    const max = Math.max(
      1,
      document.documentElement.scrollHeight -
      innerHeight
    );

    const p = Math.min(
      1,
      scrollY / max
    );

    const meters =
      Math.round(p * 4500);

    if (depth) {

      depth.textContent =
        String(meters).padStart(4, '0') +
        'M';

    }

    if (track) {

      track.style.width =
        (p * 100) + '%';

    }

    if (pressure) {

      pressure.textContent =
        (1 + meters / 10).toFixed(1);

    }

    if (temp) {

      temp.textContent =
        Math.max(
          -1,
          24 - meters * .005
        ).toFixed(1);

    }

    body.style.setProperty(
      '--depth',
      meters
    );

  }

  addEventListener(
    'scroll',
    telemetry,
    { passive:true }
  );

  telemetry();

  /* =========================
     REVEAL
  ========================= */

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }

        });

      },
      {
        threshold:.12
      }
    );

  $$('.reveal').forEach(element => {
    observer.observe(element);
  });

  /* =========================
     3D TILT
  ========================= */

  $$('.tilt').forEach(card => {

    card.addEventListener(
      'pointermove',
      event => {

        if (reduced) return;

        const rect =
          card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width - .5;

        const y =
          (event.clientY - rect.top) /
          rect.height - .5;

        card.style.transform =
          `perspective(800px)
           rotateX(${-y * 6}deg)
           rotateY(${x * 7}deg)
           translateY(-4px)`;

      }
    );

    card.addEventListener(
      'pointerleave',
      () => {
        card.style.transform = '';
      }
    );

  });

  /* =========================
     PAGE TRANSITION
  ========================= */

  $$('a').forEach(link => {

    const href =
      link.getAttribute('href');

    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      link.target === '_blank'
    ) {
      return;
    }

    link.addEventListener(
      'click',
      event => {

        if (reduced) return;

        event.preventDefault();

        loader?.classList.remove('done');

        setTimeout(() => {
          location.href = href;
        }, 420);

      }
    );

  });

})();
