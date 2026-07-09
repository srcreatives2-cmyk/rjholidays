/* =============================================================
   RJ HOLIDAYS – BLOG JAVASCRIPT
   Powers: blog.html (listing, search, filters, load more)
           blog-post.html (TOC, progress bar, share, FAQ, lightbox)
   ============================================================= */
'use strict';

/* =============================================================
   POST DATABASE
   Add a new post by adding one object here — every future article
   should follow this same shape so blog.html auto-lists it.
   category values must match the filter chips in blog.html.
   ============================================================= */
const RJ_BLOG_POSTS = [
  {
    id: 'kashmir-winter-guide',
    slug: 'blog-post.html',
    title: 'Kashmir in Winter: The Complete Srinagar & Gulmarg Travel Guide',
    excerpt: 'Snowfall in Gulmarg, shikara rides on a frozen Dal Lake, and cosy houseboats — here is everything you need to plan a magical winter trip to Kashmir.',
    category: 'Destination Guides',
    tags: ['Kashmir', 'Srinagar', 'Gulmarg', 'Winter Destinations'],
    image: 'images/dest-kashmir.jpg',
    author: 'Rajesh Jamwal',
    authorImg: 'images/about.jpg',
    date: '2026-06-28',
    dateLabel: 'June 28, 2026',
    readTime: 9,
    featured: true,
    trending: true,
    popular: true,
    newest: true
  },
  {
    id: 'triund-trek-guide',
    slug: '#',
    title: 'Triund Trek Guide: Best Season, Route Map & Packing Tips',
    excerpt: 'Everything first-time trekkers need to know about the Triund Trek near McLeod Ganj — difficulty level, best months, and where to camp overnight.',
    category: 'Trekking',
    tags: ['Dharamshala', 'McLeod Ganj', 'Triund', 'Trekking'],
    image: 'images/dest-dharamshala.jpg',
    author: 'Rajesh Jamwal',
    authorImg: 'images/about.jpg',
    date: '2026-06-20',
    dateLabel: 'June 20, 2026',
    readTime: 7,
    featured: false,
    trending: true,
    popular: true,
    newest: true
  },
  {
    id: 'spiti-valley-road-trip',
    slug: '#',
    title: 'Spiti Valley Road Trip: The Ultimate 8-Day Itinerary',
    excerpt: 'From Kaza to Chandratal, a full breakdown of the Spiti Valley circuit — road conditions, altitude sickness tips, and where to stay each night.',
    category: 'Road Trips',
    tags: ['Spiti Valley', 'Himachal Pradesh', 'Road Trips', 'Adventure Tours'],
    image: 'images/dest-himachal.jpg',
    author: 'Neha Thakur',
    authorImg: 'images/about.jpg',
    date: '2026-06-14',
    dateLabel: 'June 14, 2026',
    readTime: 11,
    featured: false,
    trending: true,
    popular: false,
    newest: true
  },
  {
    id: 'leh-ladakh-bike-trip',
    slug: '#',
    title: 'Leh-Ladakh Bike Trip: Season, Route & Budget Breakdown',
    excerpt: 'Planning a Royal Enfield ride to Khardung La and Pangong Lake? Here is a realistic budget, the safest route, and acclimatisation advice.',
    category: 'Adventure Tours',
    tags: ['Ladakh', 'Leh', 'Pangong Lake', 'Khardung La', 'Adventure Tours'],
    image: 'images/dest-ladakh.jpg',
    author: 'Rajesh Jamwal',
    authorImg: 'images/about.jpg',
    date: '2026-06-05',
    dateLabel: 'June 5, 2026',
    readTime: 10,
    featured: false,
    trending: false,
    popular: true,
    newest: false
  },
  {
    id: 'best-time-manali',
    slug: '#',
    title: 'Best Time to Visit Manali: A Season-by-Season Guide',
    excerpt: 'Snow in Solang Valley, apple blossoms in spring, or monsoon greens — find out which season of Manali matches the trip you want.',
    category: 'Travel Tips',
    tags: ['Manali', 'Solang Valley', 'Himachal Pradesh', 'Travel Tips'],
    image: 'images/dest-manali.jpg',
    author: 'Neha Thakur',
    authorImg: 'images/about.jpg',
    date: '2026-05-27',
    dateLabel: 'May 27, 2026',
    readTime: 6,
    featured: false,
    trending: false,
    popular: true,
    newest: false
  },
  {
    id: 'sikkim-itinerary',
    slug: '#',
    title: 'Gangtok & Pelling: A Perfect 6-Day Sikkim Itinerary',
    excerpt: 'Tsomgo Lake, Nathula Pass, and the Kanchenjunga views from Pelling — a day-by-day plan for first-time visitors to Sikkim.',
    category: 'Itineraries',
    tags: ['Sikkim', 'Gangtok', 'Pelling', 'Itineraries'],
    image: 'images/dest-sikkim.jpg',
    author: 'Rajesh Jamwal',
    authorImg: 'images/about.jpg',
    date: '2026-05-18',
    dateLabel: 'May 18, 2026',
    readTime: 8,
    featured: false,
    trending: false,
    popular: false,
    newest: false
  },
  {
    id: 'nepal-family-tour',
    slug: '#',
    title: 'Kathmandu to Pokhara: A Family-Friendly Nepal Tour Guide',
    excerpt: 'Temples, lakeside walks, and gentle adventure for travellers with kids or grandparents — our tested Nepal itinerary for families.',
    category: 'Family Tours',
    tags: ['Nepal', 'Kathmandu', 'Pokhara', 'Family Tours'],
    image: 'images/dest-nepal.jpg',
    author: 'Neha Thakur',
    authorImg: 'images/about.jpg',
    date: '2026-05-09',
    dateLabel: 'May 9, 2026',
    readTime: 7,
    featured: false,
    trending: false,
    popular: false,
    newest: false
  },
  {
    id: 'darjeeling-weekend',
    slug: '#',
    title: 'Darjeeling Weekend Getaway: A 2-Day Plan from Siliguri',
    excerpt: 'Tiger Hill sunrise, the toy train, and tea garden walks — an efficient 2-day Darjeeling itinerary for a short weekend escape.',
    category: 'Weekend Getaways',
    tags: ['Darjeeling', 'Weekend Getaways'],
    image: 'images/dest-darjeeling.jpg',
    author: 'Rajesh Jamwal',
    authorImg: 'images/about.jpg',
    date: '2026-04-30',
    dateLabel: 'April 30, 2026',
    readTime: 5,
    featured: false,
    trending: false,
    popular: false,
    newest: false
  },
  {
    id: 'kashmir-honeymoon',
    slug: '#',
    title: 'Honeymoon in Kashmir: A Romantic 6-Day Itinerary for Couples',
    excerpt: 'Houseboat stays, private shikara rides, and Gulmarg gondola sunsets — a Kashmir honeymoon plan built for couples.',
    category: 'Honeymoon Packages',
    tags: ['Kashmir', 'Honeymoon Packages', 'Srinagar', 'Gulmarg'],
    image: 'images/dest-kashmir.jpg',
    author: 'Neha Thakur',
    authorImg: 'images/about.jpg',
    date: '2026-04-21',
    dateLabel: 'April 21, 2026',
    readTime: 8,
    featured: false,
    trending: false,
    popular: true,
    newest: false
  },
  {
    id: 'himalayan-packing-guide',
    slug: '#',
    title: 'The Complete Packing Guide for a Himalayan Trip',
    excerpt: 'What to actually pack for Kashmir, Himachal, Ladakh or Sikkim — layering tips, medicine kit, and the gear locals swear by.',
    category: 'Packing Guides',
    tags: ['Packing Guides', 'Travel Tips'],
    image: 'images/about.jpg',
    author: 'Rajesh Jamwal',
    authorImg: 'images/about.jpg',
    date: '2026-04-10',
    dateLabel: 'April 10, 2026',
    readTime: 6,
    featured: false,
    trending: false,
    popular: false,
    newest: false
  }
];

/* =============================================================
   BLOG LISTING PAGE LOGIC
   ============================================================= */
(function initBlogListing() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return; // not on blog.html

  const searchInputs = document.querySelectorAll('.js-blog-search');
  const filterChips = document.querySelectorAll('.filter-chip');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const noResults = document.getElementById('noResults');
  const sidebarRecent = document.getElementById('sidebarRecent');
  const sidebarPopular = document.getElementById('sidebarPopular');

  // Exclude the featured post from the main grid (shown separately)
  const gridPosts = RJ_BLOG_POSTS.filter(p => !p.featured);

  let activeCategory = 'All';
  let activeQuery = '';
  const PAGE_SIZE = 6;
  let visibleCount = PAGE_SIZE;

  function cardTemplate(post) {
    return `
      <article class="blog-card">
        <div class="blog-card-img">
          <a href="${post.slug}" aria-label="Read ${post.title}">
            <img src="${post.image}" alt="${post.title}" loading="lazy" width="400" height="250" />
          </a>
          <span class="blog-card-cat">${post.category}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span><i class="fa-regular fa-clock"></i> ${post.readTime} min read</span>
            <span><i class="fa-regular fa-calendar"></i> ${post.dateLabel}</span>
          </div>
          <h3><a href="${post.slug}">${post.title}</a></h3>
          <p>${post.excerpt}</p>
          <div class="blog-card-footer">
            <span class="blog-author-mini"><img src="${post.authorImg}" alt="${post.author}" loading="lazy" /> ${post.author}</span>
            <a href="${post.slug}" class="read-more-link">Read More <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </article>`;
  }

  function getFiltered() {
    return gridPosts.filter(p => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const q = activeQuery.trim().toLowerCase();
      const matchesQuery = !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }

  function render() {
    const filtered = getFiltered();
    const slice = filtered.slice(0, visibleCount);
    grid.innerHTML = slice.map(cardTemplate).join('');
    noResults.classList.toggle('show', filtered.length === 0);
    loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-flex';
    revealNewCards();
  }

  function revealNewCards() {
    const cards = grid.querySelectorAll('.blog-card');
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(20px)';
      c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      obs.observe(c);
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.category;
      visibleCount = PAGE_SIZE;
      render();
    });
  });

  searchInputs.forEach(input => {
    input.addEventListener('input', () => {
      activeQuery = input.value;
      // keep both search boxes (hero + sidebar) in sync
      searchInputs.forEach(other => { if (other !== input) other.value = input.value; });
      visibleCount = PAGE_SIZE;
      render();
    });
  });

  document.querySelectorAll('.js-search-form').forEach(form => {
    form.addEventListener('submit', e => e.preventDefault());
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      render();
    });
  }

  // Sidebar: recent posts (newest first, top 4)
  if (sidebarRecent) {
    const recent = [...RJ_BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    sidebarRecent.innerHTML = recent.map(p => `
      <div class="widget-post">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="widget-post-body">
          <h4><a href="${p.slug}">${p.title}</a></h4>
          <span>${p.dateLabel}</span>
        </div>
      </div>`).join('');
  }

  // Sidebar: popular posts
  if (sidebarPopular) {
    const popular = RJ_BLOG_POSTS.filter(p => p.popular).slice(0, 4);
    sidebarPopular.innerHTML = popular.map(p => `
      <div class="widget-post">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="widget-post-body">
          <h4><a href="${p.slug}">${p.title}</a></h4>
          <span>${p.readTime} min read</span>
        </div>
      </div>`).join('');
  }

  render();
})();

/* =============================================================
   ARTICLE PAGE LOGIC (blog-post.html)
   ============================================================= */
(function initArticlePage() {
  const article = document.querySelector('.article-prose');
  if (!article) return; // not on an article page

  /* ---- Reading progress bar ---- */
  const progressBar = document.getElementById('readingProgress');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---- Auto-generate Table of Contents from H2/H3 ---- */
  const tocList = document.getElementById('tocList');
  if (tocList) {
    const headings = article.querySelectorAll('h2, h3');
    let html = '';
    headings.forEach((h, i) => {
      if (!h.id) h.id = 'section-' + i + '-' + h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const cls = h.tagName === 'H3' ? 'toc-sub' : '';
      html += `<a href="#${h.id}" class="${cls}">${h.textContent}</a>`;
    });
    tocList.innerHTML = html;

    // Highlight active TOC link on scroll
    const tocLinks = tocList.querySelectorAll('a');
    if ('IntersectionObserver' in window) {
      const tocObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const link = tocList.querySelector(`a[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-100px 0px -70% 0px' });
      headings.forEach(h => tocObserver.observe(h));
    }
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      ans.classList.toggle('open', !isOpen);
    });
  });

  /* ---- Share buttons ---- */
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);
  document.querySelectorAll('.share-fb').forEach(a => a.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
  document.querySelectorAll('.share-tw').forEach(a => a.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`);
  document.querySelectorAll('.share-wa').forEach(a => a.href = `https://wa.me/?text=${pageTitle}%20${pageUrl}`);
  document.querySelectorAll('.share-li').forEach(a => a.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`);

  document.querySelectorAll('.share-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => { btn.innerHTML = original; }, 1800);
      });
    });
  });

  /* ---- Image lightbox for in-article images ---- */
  const lightbox = document.getElementById('imgLightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  document.querySelectorAll('.article-img-wrap img, .article-gallery img').forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.closest('.img-lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* ---- Sticky "Book This Tour" bar ---- */
  const bookBar = document.getElementById('bookTourBar');
  if (bookBar) {
    window.addEventListener('scroll', () => {
      bookBar.classList.toggle('visible', window.scrollY > 700);
    }, { passive: true });
  }

  /* ---- Comment form (demo only — no backend) ---- */
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = commentForm.querySelector('[name="cname"]');
      const msgInput = commentForm.querySelector('[name="cmessage"]');
      if (!nameInput.value.trim() || !msgInput.value.trim()) return;
      const list = document.getElementById('commentList');
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <img src="images/about.jpg" alt="${nameInput.value.trim()}" loading="lazy" />
        <div class="comment-body">
          <div class="comment-head"><strong>${nameInput.value.trim()}</strong><span>Just now</span></div>
          <p>${msgInput.value.trim()}</p>
        </div>`;
      list.prepend(item);
      commentForm.reset();
    });
  }

  /* ---- Newsletter form (demo only) ---- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (input && input.value.trim()) {
        btn.textContent = 'Subscribed!';
        input.value = '';
        setTimeout(() => { btn.textContent = 'Subscribe'; }, 2500);
      }
    });
  });
})();
