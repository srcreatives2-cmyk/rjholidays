/* =============================================================
   RJ HOLIDAYS – BLOG JAVASCRIPT
   Powers: blog.html (listing, search, filters, load more)
           blog-post.html (TOC, progress bar, share, FAQ, lightbox)
   ============================================================= */
'use strict';

/* =============================================================
   AUTHOR AVATAR HELPER
   Renders a gold initials badge (matches the hero/author-box style)
   so the author icon always displays, regardless of whether a
   photo file exists.
   ============================================================= */
function rjAuthorInitials(name) {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
function rjAuthorAvatarHTML(name, extraClass) {
  return `<span class="author-avatar${extraClass ? ' ' + extraClass : ''}" aria-hidden="true">${rjAuthorInitials(name)}</span>`;
}

/* =============================================================
   POST DATABASE
   Add a new post by adding one object here — every future article
   should follow this same shape so blog.html auto-lists it.
   category values must match the filter chips in blog.html.
   ============================================================= */
const RJ_BLOG_POSTS = [
  {
    id: 'kashmir-winter-guide',
    slug: 'blog-post.html?post=kashmir-winter-guide',
    title: 'Kashmir in Winter: The Complete Srinagar & Gulmarg Travel Guide',
    excerpt: 'Snowfall in Gulmarg, shikara rides on a frozen Dal Lake, and cosy houseboats — here is everything you need to plan a magical winter trip to Kashmir.',
    category: 'Destination Guides',
    tags: ['Kashmir', 'Srinagar', 'Gulmarg', 'Winter Destinations'],
    image: 'images/blog/kashmir-in-winter.webp',
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
    slug: 'blog-post.html?post=triund-trek-guide',
    title: 'Triund Trek Guide: Best Season, Route Map & Packing Tips',
    excerpt: 'Everything first-time trekkers need to know about the Triund Trek near McLeod Ganj — difficulty level, best months, and where to camp overnight.',
    category: 'Trekking',
    tags: ['Dharamshala', 'McLeod Ganj', 'Triund', 'Trekking'],
    image: 'images/blog/triund-trek-guide.webp',
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
    slug: 'blog-post.html?post=spiti-valley-road-trip',
    title: 'Spiti Valley Road Trip: The Ultimate 8-Day Itinerary',
    excerpt: 'From Kaza to Chandratal, a full breakdown of the Spiti Valley circuit — road conditions, altitude sickness tips, and where to stay each night.',
    category: 'Road Trips',
    tags: ['Spiti Valley', 'Himachal Pradesh', 'Road Trips', 'Adventure Tours'],
    image: 'images/blog/spiti-valley-road-trip.webp',
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
    slug: 'blog-post.html?post=leh-ladakh-bike-trip',
    title: 'Leh-Ladakh Bike Trip: Season, Route & Budget Breakdown',
    excerpt: 'Planning a Royal Enfield ride to Khardung La and Pangong Lake? Here is a realistic budget, the safest route, and acclimatisation advice.',
    category: 'Adventure Tours',
    tags: ['Ladakh', 'Leh', 'Pangong Lake', 'Khardung La', 'Adventure Tours'],
    image: 'images/blog/leh-ladakh-bike-trip.webp',
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
    slug: 'blog-post.html?post=best-time-manali',
    title: 'Best Time to Visit Manali: A Season-by-Season Guide',
    excerpt: 'Snow in Solang Valley, apple blossoms in spring, or monsoon greens — find out which season of Manali matches the trip you want.',
    category: 'Travel Tips',
    tags: ['Manali', 'Solang Valley', 'Himachal Pradesh', 'Travel Tips'],
    image: 'images/blog/best-time-manali.webp',
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
    slug: 'blog-post.html?post=sikkim-itinerary',
    title: 'Gangtok & Pelling: A Perfect 6-Day Sikkim Itinerary',
    excerpt: 'Tsomgo Lake, Nathula Pass, and the Kanchenjunga views from Pelling — a day-by-day plan for first-time visitors to Sikkim.',
    category: 'Itineraries',
    tags: ['Sikkim', 'Gangtok', 'Pelling', 'Itineraries'],
    image: 'images/blog/gangtok-pelling.webp',
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
    slug: 'blog-post.html?post=nepal-family-tour',
    title: 'Kathmandu to Pokhara: A Family-Friendly Nepal Tour Guide',
    excerpt: 'Temples, lakeside walks, and gentle adventure for travellers with kids or grandparents — our tested Nepal itinerary for families.',
    category: 'Family Tours',
    tags: ['Nepal', 'Kathmandu', 'Pokhara', 'Family Tours'],
    image: 'images/blog/kathmandu-pokhara.webp',
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
    slug: 'blog-post.html?post=darjeeling-weekend',
    title: 'Darjeeling Weekend Getaway: A 2-Day Plan from Siliguri',
    excerpt: 'Tiger Hill sunrise, the toy train, and tea garden walks — an efficient 2-day Darjeeling itinerary for a short weekend escape.',
    category: 'Weekend Getaways',
    tags: ['Darjeeling', 'Weekend Getaways'],
    image: 'images/blog/darjeeling-weekend-getaway.webp',
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
    slug: 'blog-post.html?post=kashmir-honeymoon',
    title: 'Honeymoon in Kashmir: A Romantic 6-Day Itinerary for Couples',
    excerpt: 'Houseboat stays, private shikara rides, and Gulmarg gondola sunsets — a Kashmir honeymoon plan built for couples.',
    category: 'Honeymoon Packages',
    tags: ['Kashmir', 'Honeymoon Packages', 'Srinagar', 'Gulmarg'],
    image: 'images/blog/honeymoon-in-kashmir.webp',
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
    slug: 'blog-post.html?post=himalayan-packing-guide',
    title: 'The Complete Packing Guide for a Himalayan Trip',
    excerpt: 'What to actually pack for Kashmir, Himachal, Ladakh or Sikkim — layering tips, medicine kit, and the gear locals swear by.',
    category: 'Packing Guides',
    tags: ['Packing Guides', 'Travel Tips'],
    image: 'images/blog/himalayan-packing-guide.webp',
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
   PER-POST ARTICLE CONTENT DATABASE (used by blog-post.html)
   Keyed by post id — must match an id in RJ_BLOG_POSTS above.
   ============================================================= */
const RJ_ARTICLE_CONTENT = {
  "kashmir-winter-guide": {
    "heroImg": "images/blog/kashmir-in-winter.webp",
    "heroImgAlt": "Frozen Dal Lake with snow-covered houseboats in Srinagar, Kashmir during winter",
    "subtitle": "Snowfall in Gulmarg, shikara rides on a frozen Dal Lake, and cosy houseboats — here is everything you need to plan a magical winter trip to Kashmir, from Srinagar to Gulmarg's ski slopes.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Late Dec – Feb"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "5–7 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹18,500 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Srinagar (SXR)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Couples, Families, Snow Lovers"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "-8°C to 8°C"
      }
    ],
    "proseHTML": "          <p>Kashmir transforms completely once winter sets in. The houseboats on Dal Lake sit against a hush of falling snow, the poplar-lined roads of Srinagar go quiet, and Gulmarg's meadows turn into one of Asia's most scenic ski slopes. If you've only seen Kashmir in photos of spring tulips, the winter version is a different — and for many travellers, more memorable — trip altogether.</p>\n\n          <p>This guide covers everything our travel desk gets asked before a winter Kashmir booking: when to go, where to stay, what a realistic itinerary looks like, and how much to budget. It's built from the trips we've actually run for RJ Holidays travellers, not just a checklist pulled off the internet.</p>\n\n          <h2 id=\"why-winter\">Why Visit Kashmir in Winter</h2>\n          <p>Summer Kashmir is beautiful, but winter is when the valley earns its nickname, \"Paradise on Earth.\" Snow blankets the Mughal Gardens, Dal Lake sometimes partially freezes, and Gulmarg gets enough snowfall to rank among the best ski destinations in South Asia. Hotel and houseboat rates also drop compared to peak summer, and popular spots like Pahalgam feel far less crowded.</p>\n          <ul>\n            <li>Genuine snowfall in Gulmarg from late December through February</li>\n            <li>Skiing, snowboarding and gondola rides on Asia's second-highest cable car</li>\n            <li>Warm, heated houseboats on a quieter, more atmospheric Dal Lake</li>\n            <li>Lower hotel rates than the April–June peak season</li>\n            <li>Fewer crowds at Mughal Gardens, Pahalgam and Sonamarg</li>\n          </ul>\n\n          <h2 id=\"best-time\">Best Time to Visit Kashmir in Winter</h2>\n          <p>\"Winter\" in Kashmir roughly spans December through February, with each month offering a slightly different experience.</p>\n          <table>\n            <thead><tr><th>Month</th><th>Weather</th><th>Highlight</th></tr></thead>\n            <tbody>\n              <tr><td>December</td><td>Cold, first snowfall usually mid-to-late month</td><td>Christmas &amp; New Year snow, festive Srinagar</td></tr>\n              <tr><td>January</td><td>Coldest month, heaviest and most reliable snow</td><td>Best skiing conditions in Gulmarg</td></tr>\n              <tr><td>February</td><td>Still cold, snow begins to soften by month-end</td><td>Fewer tourists, better hotel rates</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout tip\">\n            <i class=\"fa-solid fa-lightbulb\"></i>\n            <div>\n              <span class=\"callout-title\">Booking Tip</span>\n              <p>The last week of December and the Republic Day long weekend (26 January) are the busiest — houseboats and Gulmarg hotels can book out 3–4 weeks in advance. If your dates fall in this window, confirm your package with RJ Holidays as early as possible.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there\">Getting There — Nearest Airport &amp; How We Get You In</h2>\n          <p>Srinagar International Airport (SXR) is the gateway to the valley, with direct flights from Delhi, Mumbai, Bengaluru, and several other major Indian cities. Winter fog can occasionally delay morning flights, so RJ Holidays recommends booking afternoon arrivals where possible and keeping a one-day buffer if you're connecting from a smaller city.</p>\n          <p>Once you land, our local team handles airport pickup and the roughly 15-minute transfer into Srinagar. If your package includes Dharamshala or Himachal add-ons, we can also help coordinate a combined itinerary — <a href=\"himachal-tour-package.html\">see our Himachal Pradesh packages</a> for options.</p>\n\n          <h2 id=\"srinagar\">Srinagar in Winter — Dal Lake, Houseboats &amp; Shikara Rides</h2>\n          <p>Srinagar is where most winter itineraries begin and end, and it's worth spending at least two nights here. A stay on a heated houseboat on Dal Lake is the single most requested experience among our winter travellers — waking up to mist over the water, with a hot cup of Kashmiri kahwa, is hard to beat.</p>\n\n          <figure class=\"article-img-wrap\">\n            <img src=\"https://i.ibb.co/CKGfnR2G/IMG-Dal-lake.jpg\" alt=\"Shikara boat gliding across Dal Lake in Srinagar with snow-dusted mountains in the background\" loading=\"lazy\" width=\"900\" height=\"560\" />\n            <figcaption>Dal Lake, Srinagar — a shikara ride at sunrise is the classic Kashmir winter photo.</figcaption>\n          </figure>\n\n          <h3 id=\"srinagar-stay\">Where to Stay in Srinagar</h3>\n          <ul>\n            <li><strong>Houseboats on Dal Lake</strong> — the signature Kashmir experience; RJ Holidays only books boats with functioning central heating for winter dates.</li>\n            <li><strong>Boulevard Road hotels</strong> — walking distance to the lake, good for families who prefer a standard hotel room over a boat.</li>\n            <li><strong>Old City heritage stays</strong> — for travellers who want to be closer to Jama Masjid and the spice markets.</li>\n          </ul>\n          <p>Don't miss a slow shikara ride past the floating vegetable market at dawn, a walk through the Mughal Gardens (Nishat and Shalimar keep their structure even under snow), and an evening at Lal Chowk for shawls, saffron and dry fruit shopping.</p>\n\n          <h2 id=\"gulmarg\">Gulmarg — Skiing, Gondola &amp; Snow Adventures</h2>\n          <p>Roughly a 90-minute drive from Srinagar, Gulmarg is the reason most people plan a winter Kashmir trip in the first place. At over 2,650 metres, it holds reliable snow cover through the season and hosts the Gulmarg Gondola — the second-highest cable car in the world.</p>\n\n          <h3 id=\"gondola\">Gulmarg Gondola Phases &amp; Ticket Tips</h3>\n          <p>The gondola runs in two phases: Phase 1 takes you up to Kongdoori (around 3,000m), and Phase 2 continues to Apharwat Peak (around 3,950m), where the snow is deepest and views stretch toward Nanga Parbat on clear days.</p>\n          <ol>\n            <li>Book Phase 1 and Phase 2 tickets together where possible — Phase 2 frequently sells out separately during peak weeks.</li>\n            <li>Dress in proper thermal layers; temperatures at Apharwat Peak can be well below freezing even at midday.</li>\n            <li>Arrive at the ticket counter by 8:30 AM in peak season to beat the queues.</li>\n            <li>Skiing and snowboarding gear (including instructor-led lessons) can be rented at the base for first-timers.</li>\n          </ol>\n\n          <div class=\"callout warning\">\n            <i class=\"fa-solid fa-triangle-exclamation\"></i>\n            <div>\n              <span class=\"callout-title\">Altitude &amp; Cold Advisory</span>\n              <p>Gulmarg's elevation can cause mild altitude discomfort for some travellers, especially children and older adults. Stay hydrated, avoid overexertion on your first day, and carry basic cold-weather medication. RJ Holidays' local guides carry a first-aid kit on every Gulmarg day trip.</p>\n            </div>\n          </div>\n\n          <div class=\"article-gallery\" aria-label=\"Gulmarg and Pahalgam winter photo gallery\">\n            <img src=\"https://i.ibb.co/fYJQmRk4/IMG-Gulmarg.jpg\" alt=\"Snow-covered slopes and pine trees in Gulmarg, Kashmir\" loading=\"lazy\" width=\"400\" height=\"300\" />\n            <img src=\"https://i.ibb.co/Qy0HsGq/IMG-pahalgam.jpg\" alt=\"Snow-dusted pine forest along the Lidder River in Pahalgam\" loading=\"lazy\" width=\"400\" height=\"300\" />\n            <img src=\"https://i.ibb.co/h1m3sQ0d/Kashmir-Sightseeing-IMGCentury.jpg\" alt=\"Snow-covered valley sightseeing point in Kashmir during winter\" loading=\"lazy\" width=\"400\" height=\"300\" />\n          </div>\n\n          <!-- Mid-article conversion CTA -->\n          <div class=\"article-cta\">\n            <h3>Ready to See Kashmir Under Snow?</h3>\n            <p>RJ Holidays builds custom winter Kashmir itineraries with heated houseboats, gondola tickets and a local guide included — no scrambling to book things separately.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20a%20winter%20Kashmir%20trip!\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"kashmir-tour-package.html\" class=\"cta-btn ghost\">View Kashmir Package</a>\n            </div>\n          </div>\n\n          <h2 id=\"pahalgam-sonamarg\">Pahalgam &amp; Sonamarg Day Trips</h2>\n          <p>If your itinerary allows a sixth or seventh day, both Pahalgam and Sonamarg make excellent add-ons. Pahalgam's pine forests along the Lidder River look completely different dusted in snow, while Sonamarg (the \"Meadow of Gold\") often has the most dramatic glacier views of the trip. Roads to Sonamarg can close briefly after heavy snowfall, so we always check conditions the morning of and offer Pahalgam as a reliable alternative.</p>\n\n          <h2 id=\"itinerary\">Sample 6-Day Winter Kashmir Itinerary</h2>\n          <table>\n            <thead><tr><th>Day</th><th>Plan</th></tr></thead>\n            <tbody>\n              <tr><td>Day 1</td><td>Arrive Srinagar, transfer to houseboat, evening shikara ride on Dal Lake</td></tr>\n              <tr><td>Day 2</td><td>Srinagar sightseeing — Mughal Gardens, Shankaracharya Temple, Old City &amp; Lal Chowk</td></tr>\n              <tr><td>Day 3</td><td>Drive to Gulmarg, Phase 1 &amp; 2 gondola ride, optional skiing lesson</td></tr>\n              <tr><td>Day 4</td><td>Full day in Gulmarg — snow activities, sledging, photography</td></tr>\n              <tr><td>Day 5</td><td>Day trip to Pahalgam, return to Srinagar in the evening</td></tr>\n              <tr><td>Day 6</td><td>Leisure morning, souvenir shopping, transfer to Srinagar Airport</td></tr>\n            </tbody>\n          </table>\n          <p>Want this adapted around your travel dates? <a href=\"index.html#contact\">Contact RJ Holidays</a> and we'll customise it with your preferred hotel category and budget.</p>\n\n          <h2 id=\"packing\">What to Pack for Kashmir in Winter</h2>\n          <ul>\n            <li>Thermal base layers (top and bottom) — at least two sets</li>\n            <li>A heavy insulated jacket rated for sub-zero temperatures</li>\n            <li>Waterproof, insulated snow boots with good grip</li>\n            <li>Woollen socks, gloves, a beanie and a scarf or neck gaiter</li>\n            <li>Sunglasses or snow goggles — glare off fresh snow is intense</li>\n            <li>Moisturiser and lip balm for the dry mountain air</li>\n            <li>A small first-aid kit with basic cold and altitude medication</li>\n          </ul>\n          <div class=\"callout info\">\n            <i class=\"fa-solid fa-circle-info\"></i>\n            <div>\n              <span class=\"callout-title\">Don't Own Winter Gear?</span>\n              <p>Heavy jackets, snow boots and gloves are all available on rent in Srinagar and Gulmarg for a fraction of retail price — you don't need to buy specialised gear for a one-off trip.</p>\n            </div>\n          </div>\n\n          <h2 id=\"budget\">Budget Breakdown for a Winter Kashmir Trip</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person, 6D/5N)</th></tr></thead>\n            <tbody>\n              <tr><td>Accommodation (houseboat + hotel)</td><td>₹7,500 – ₹12,000</td></tr>\n              <tr><td>Local transport &amp; transfers</td><td>₹3,500 – ₹5,000</td></tr>\n              <tr><td>Gulmarg Gondola (Phase 1 + 2)</td><td>₹1,900 – ₹2,200</td></tr>\n              <tr><td>Meals</td><td>₹3,000 – ₹4,500</td></tr>\n              <tr><td>Winter gear rental</td><td>₹800 – ₹1,500</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹18,500</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>Kashmir in winter isn't a \"lesser\" version of the summer trip — for many travellers who come with us, it's the one they remember most vividly.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Srinagar, Gulmarg &amp; Pahalgam</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>\n",
    "faqs": [
      {
        "q": "Is Kashmir safe to visit in winter?",
        "a": "Yes. Srinagar and Gulmarg see heavy tourist traffic all winter and are well set up for visitors, with heated houseboats, hotels with room heaters, and well-maintained roads to the main tourist areas. RJ Holidays only uses vetted drivers experienced with winter mountain roads."
      },
      {
        "q": "What is the best month to see snowfall in Kashmir?",
        "a": "Late December through February gives you the highest chance of fresh snowfall, with Gulmarg usually holding the deepest snow. January is typically the coldest and snowiest month in Srinagar."
      },
      {
        "q": "Do I need to book the Gulmarg Gondola in advance?",
        "a": "Yes, especially during the Christmas–New Year week and the Republic Day long weekend, when Phase 1 and Phase 2 tickets can sell out by mid-morning. RJ Holidays arranges gondola tickets as part of your itinerary."
      },
      {
        "q": "How cold does it get in Srinagar and Gulmarg in winter?",
        "a": "Srinagar typically ranges from -2°C to 8°C in January, while Gulmarg is colder, often dropping below -8°C at night. Daytime sun makes it feel warmer, but proper winter layering is essential."
      },
      {
        "q": "Is a houseboat stay in Srinagar warm enough in winter?",
        "a": "RJ Holidays books winter-ready houseboats with heaters, hot water, and extra bedding, so they stay comfortable even when temperatures drop outside."
      },
      {
        "q": "How many days do I need for a Kashmir winter trip?",
        "a": "5 to 7 days is ideal, giving you time for Srinagar's Dal Lake and old city, a full day of snow activities in Gulmarg, and a day trip to Pahalgam or Sonamarg without rushing."
      }
    ],
    "packagePrimary": {
      "href": "kashmir-tour-package.html",
      "img": "images/dest-kashmir.jpg",
      "name": "Kashmir Paradise",
      "meta": "6N/7D · from ₹18,500"
    },
    "packageSecondary": {
      "href": "himachal-tour-package.html",
      "img": "images/dest-himachal.jpg",
      "name": "Himachal Explorer",
      "meta": "Dharamshala · Manali · Kasol"
    },
    "bookBar": {
      "title": "Kashmir Paradise — 6N/7D",
      "price": "Starting from ₹18,500 per person"
    },
    "finalCta": {
      "title": "Plan Your Winter Kashmir Trip Today",
      "text": "Talk to a local travel expert in Dharamshala and get a custom Kashmir itinerary with houseboats, gondola tickets and transfers — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Kashmir winter quote!"
    }
  },
  "triund-trek-guide": {
    "heroImg": "images/blog/triund-trek-guide.webp",
    "heroImgAlt": "Trekkers walking the ridgeline trail to Triund with the Dhauladhar snow peaks behind McLeod Ganj",
    "subtitle": "A 9km ridge trail above McLeod Ganj with front-row Dhauladhar views and a campsite most first-time trekkers can handle in a day — here's how to plan it right.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Mar–Jun & Sep–Nov"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "1–2 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹1,500 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Kangra (DHM)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "First-Timers, Backpackers"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "5°C to 22°C"
      }
    ],
    "proseHTML": "<p>Triund is the trek most people in Dharamshala get asked about first, and for good reason — it's one of the few Himalayan trails where a first-timer with reasonable fitness can reach a genuine 2,875m ridge, camp under the Dhauladhar range, and be back down within 24–36 hours.</p>\n          <p>This guide covers the route, the best months to go, where to camp, and a realistic packing list, based on the treks RJ Holidays runs out of McLeod Ganj every season.</p>\n\n          <h2 id=\"why-triund\">Why Trek to Triund</h2>\n          <p>Triund sits right at the base of the Dhauladhar range, and the payoff-to-effort ratio is hard to beat — you get snow-line mountain views without needing prior high-altitude trekking experience.</p>\n          <ul>\n            <li>Reachable as a single, long day trek or a relaxed overnight camp</li>\n            <li>Close-up views of the Dhauladhar's Moon Peak and Indrahar Pass</li>\n            <li>Well-marked trail with tea stalls (locally called \"magic huts\") along the way</li>\n            <li>Starts right from McLeod Ganj, no long approach drive needed</li>\n            <li>Genuine campable ridge without a mountaineering permit</li>\n          </ul>\n\n          <h2 id=\"best-time-triund\">Best Time to Trek Triund</h2>\n          <table>\n            <thead><tr><th>Season</th><th>Conditions</th><th>Notes</th></tr></thead>\n            <tbody>\n              <tr><td>March – June</td><td>Clear trails, rhododendrons in bloom, warm days</td><td>Best all-round window for first-timers</td></tr>\n              <tr><td>July – August</td><td>Monsoon, trail can be slippery and leech-prone</td><td>RJ Holidays generally discourages this window</td></tr>\n              <tr><td>September – November</td><td>Clearest mountain views, crisp air, cool nights</td><td>Our most-booked season for photography</td></tr>\n              <tr><td>December – February</td><td>Snow-covered trail above Galu Devi</td><td>Doable, but needs microspikes and a guide</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout tip\">\n            <i class=\"fa-solid fa-lightbulb\"></i>\n            <div>\n              <span class=\"callout-title\">Booking Tip</span>\n              <p>Weekend departures from McLeod Ganj fill up fastest between April and June. If you want a guided overnight slot with tent and sleeping bag included, confirm at least a week ahead in peak season.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-triund\">Getting There — Dharamshala &amp; McLeod Ganj</h2>\n          <p>Kangra Airport (DHM), also called Gaggal Airport, is about 20km from McLeod Ganj and has direct flights from Delhi. The nearest major railhead is Pathankot, roughly a 3.5-hour drive away, and it's also an easy overnight bus or self-drive from Delhi (around 10–11 hours).</p>\n          <p>Our team handles pickup from Kangra Airport or Dharamshala bus stand and gets you to McLeod Ganj, the actual trailhead for Triund — see our <a href=\"himachal-tour-package.html\">Himachal Pradesh packages</a> if you'd like to combine this with Dharamshala or Kasol.</p>\n\n          <h2 id=\"route-difficulty\">Triund Trek Route &amp; Difficulty</h2>\n          <p>The trail is roughly 9km one-way from McLeod Ganj (or 7km if you start from Dharamkot), gaining about 1,000m in elevation. It's rated moderate — steady uphill walking rather than technical climbing, manageable for most fitness levels in 4–6 hours.</p>\n          <h3 id=\"route-stages\">Trail Stages</h3>\n          <ul>\n            <li><strong>McLeod Ganj to Galu Devi Temple</strong> — a gentle warm-up stretch, about 2km on a forest road</li>\n            <li><strong>Galu Devi to Magic View Café</strong> — the steepest section, oak and rhododendron forest cover</li>\n            <li><strong>Magic View to Triund Top</strong> — the trail opens up, with the Dhauladhar wall visible almost the whole way</li>\n          </ul>\n\n          <div class=\"article-cta\">\n            <h3>Plan Your Triund Trek</h3>\n            <p>RJ Holidays arranges guided Triund treks with camping gear, permits and a local guide included — ideal if it's your first Himalayan trek.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20a%20Triund%20trek%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"himachal-tour-package.html\" class=\"cta-btn ghost\">View Himachal Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"camping-triund\">Where to Stay — Camping vs Day Trek</h2>\n          <p>Most travellers camp overnight at Triund, either in a pre-pitched tent (arranged locally or through us) or their own gear. A handful of small dhabas at the top serve basic meals — Maggi noodles and hot chai are the trail staples. Some experienced trekkers push on to Snowline (Ilaqa) for a higher, quieter overnight spot, roughly 2 hours further.</p>\n\n          <h2 id=\"packing-triund\">What to Pack for Triund</h2>\n          <ul>\n            <li>Sturdy trekking shoes with ankle support and good grip</li>\n            <li>A light backpack (25–35L is enough for an overnight)</li>\n            <li>Layered clothing — it's warm walking uphill, cold once the sun sets at camp</li>\n            <li>A headlamp or torch, since there's no lighting on the trail</li>\n            <li>2–3 litres of water; refill points are limited above Galu Devi</li>\n            <li>A power bank — there's no charging point on the ridge</li>\n          </ul>\n\n          <h2 id=\"budget-triund\">Budget Breakdown for Triund Trek</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person)</th></tr></thead>\n            <tbody>\n              <tr><td>Guide &amp; permit</td><td>₹500 – ₹800</td></tr>\n              <tr><td>Tent &amp; sleeping bag rental (overnight)</td><td>₹400 – ₹700</td></tr>\n              <tr><td>Meals on the trail</td><td>₹300 – ₹500</td></tr>\n              <tr><td>McLeod Ganj transfers</td><td>₹300 – ₹600</td></tr>\n              <tr><td><strong>RJ Holidays guided trek (all-inclusive)</strong></td><td><strong>From ₹1,500</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>Triund is proof you don't need a technical expedition to feel like you've really been in the Himalayas — just a good pair of shoes and an early start.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — McLeod Ganj to Triund Trail</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "Is Triund suitable for beginners?",
        "a": "Yes — it's widely considered one of the most beginner-friendly Himalayan treks. Reasonable fitness and comfortable trekking shoes are enough; no prior trekking experience is required."
      },
      {
        "q": "Can Triund be done as a day trip?",
        "a": "Yes, fit trekkers can go up and back down in a single long day (around 8–10 hours total). Most travellers prefer camping overnight to catch the sunrise over the Dhauladhar range."
      },
      {
        "q": "Do I need a permit for the Triund trek?",
        "a": "A small forest entry fee applies, which RJ Holidays includes and handles for you as part of the guided trek."
      },
      {
        "q": "Is it safe to trek Triund in winter?",
        "a": "It's doable from December to February but requires microspikes above the snowline and a guide, since the trail can be icy. We recommend it only for trekkers comfortable with snow conditions."
      },
      {
        "q": "How fit do I need to be for Triund?",
        "a": "Basic fitness — being able to walk briskly for 4–6 hours with breaks — is sufficient. It helps to do a couple of practice hikes beforehand if you're not a regular walker."
      }
    ],
    "packagePrimary": {
      "href": "himachal-tour-package.html",
      "img": "images/dest-dharamshala.jpg",
      "name": "Himachal Explorer",
      "meta": "Dharamshala · Manali · Kasol"
    },
    "packageSecondary": {
      "href": "ladakh-tour-package.html",
      "img": "images/dest-ladakh.jpg",
      "name": "Ladakh Adventure",
      "meta": "Leh · Nubra · Pangong"
    },
    "bookBar": {
      "title": "Himachal Explorer — Triund Add-On",
      "price": "Guided Triund trek from ₹1,500 per person"
    },
    "finalCta": {
      "title": "Ready to Trek Triund?",
      "text": "RJ Holidays arranges guided Triund treks from McLeod Ganj with camping gear and a local guide included — a great first Himalayan trek.",
      "waText": "Hi RJ Holidays, I want to book a guided Triund trek!"
    }
  },
  "spiti-valley-road-trip": {
    "heroImg": "images/blog/spiti-valley-road-trip.webp",
    "heroImgAlt": "A road winding through the barren cold-desert mountains of Spiti Valley, Himachal Pradesh",
    "subtitle": "Monasteries perched on cliffs, the turquoise waters of Chandratal, and some of the most dramatic high-altitude roads in India — here's how to plan a Spiti Valley circuit that doesn't rush it.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Jun – Sep"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "8 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹28,000 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Bhuntar (KUU)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Road Trippers, Photographers"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "5°C to 20°C (day)"
      }
    ],
    "proseHTML": "<p>Spiti Valley is a cold desert wedged between Himachal Pradesh and Tibet, and it looks like nowhere else in India — bare mountains in shades of ochre and grey, whitewashed monasteries clinging to cliff edges, and villages that sit among the highest inhabited places in the world.</p>\n          <p>This guide lays out the full circuit our team runs for Spiti travellers: road conditions, altitude pacing, and where to actually stop for the night.</p>\n\n          <h2 id=\"why-spiti\">Why Visit Spiti Valley</h2>\n          <ul>\n            <li>Some of the most dramatic high-altitude landscapes accessible by road in India</li>\n            <li>Centuries-old monasteries at Key, Dhankar and Tabo</li>\n            <li>Chandratal Lake — a glacial lake often called the \"Moon Lake\"</li>\n            <li>Villages like Langza, Komic and Kibber among the highest motorable settlements anywhere</li>\n            <li>A genuine road-trip experience with far fewer tourists than Manali or Shimla</li>\n          </ul>\n\n          <h2 id=\"best-time-spiti\">Best Time for the Spiti Circuit</h2>\n          <table>\n            <thead><tr><th>Window</th><th>Road Status</th><th>Notes</th></tr></thead>\n            <tbody>\n              <tr><td>June – mid July</td><td>Manali–Kaza road freshly open, Kunzum Pass clear</td><td>Green valleys, our most recommended window</td></tr>\n              <tr><td>Mid July – August</td><td>Monsoon; Manali side prone to landslides</td><td>We often route via Shimla–Kinnaur instead</td></tr>\n              <tr><td>September – early October</td><td>Clear skies, both routes open</td><td>Best visibility, cooler nights</td></tr>\n              <tr><td>November – May</td><td>Kunzum &amp; Rohtang closed by snow</td><td>Spiti effectively cut off from Manali side</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout warning\">\n            <i class=\"fa-solid fa-triangle-exclamation\"></i>\n            <div>\n              <span class=\"callout-title\">Altitude Advisory</span>\n              <p>Spiti's villages sit between 3,000m and 4,500m. Build in an acclimatisation day at Kaza before pushing on to Komic or Chandratal, and drink more water than feels necessary — altitude sickness is the most common reason trips get cut short.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-spiti\">Getting There — Manali vs Shimla Route</h2>\n          <p>There are two ways in: the shorter Manali–Kaza road over Kunzum Pass (open roughly June–October), or the longer but more scenic Shimla–Kinnaur–Kaza route via Reckong Peo, which stays open a little later into the season. Bhuntar Airport near Kullu-Manali is the nearest airport if you're starting from the Manali side.</p>\n          <p>RJ Holidays typically runs the circuit as a loop — in via one route, out via the other — so you don't retrace the same road twice. See our <a href=\"himachal-tour-package.html\">Himachal Pradesh packages</a> for combined Manali–Spiti options.</p>\n\n          <h2 id=\"spiti-stops\">Spiti Circuit — Key Stops</h2>\n          <h3 id=\"spiti-monasteries\">Kaza, Key Monastery &amp; Dhankar</h3>\n          <p>Kaza is the natural base for the valley, with the largest choice of hotels and homestays. Key Monastery, Spiti's largest, sits on a hilltop about 40 minutes away, and Dhankar's cliffside monastery and nearby lake make for one of the trip's most photographed stops.</p>\n          <h3 id=\"chandratal\">Chandratal Lake</h3>\n          <p>Chandratal (\"Moon Lake\") is a high-altitude glacial lake at around 4,300m, reachable by a short trek from the road. Camping near the lake is only permitted at designated sites a short distance away, and nights get well below freezing even in July.</p>\n          <ul>\n            <li><strong>Langza, Komic &amp; Hikkim</strong> — among the highest motorable villages in the world, with Hikkim home to the world's highest post office</li>\n            <li><strong>Kibber</strong> — a wildlife sanctuary village known for snow leopard sightings in winter (outside our standard road-trip season)</li>\n            <li><strong>Tabo Monastery</strong> — over 1,000 years old, sometimes called the \"Ajanta of the Himalayas\" for its wall paintings</li>\n          </ul>\n\n          <div class=\"article-cta\">\n            <h3>Ready to Drive the Spiti Circuit?</h3>\n            <p>RJ Holidays plans a full Spiti loop with acclimatisation built in, vetted drivers experienced on high-altitude roads, and monastery and Chandratal stops included.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20a%20Spiti%20Valley%20road%20trip%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"himachal-tour-package.html\" class=\"cta-btn ghost\">View Himachal Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"itinerary-spiti\">Sample 8-Day Spiti Itinerary</h2>\n          <table>\n            <thead><tr><th>Day</th><th>Plan</th></tr></thead>\n            <tbody>\n              <tr><td>Day 1–2</td><td>Manali to Kaza via Kunzum Pass, overnight stop en route</td></tr>\n              <tr><td>Day 3</td><td>Acclimatisation day in Kaza, local sightseeing</td></tr>\n              <tr><td>Day 4</td><td>Key Monastery, Kibber &amp; Chicham bridge</td></tr>\n              <tr><td>Day 5</td><td>Langza, Komic &amp; Hikkim high-altitude villages</td></tr>\n              <tr><td>Day 6</td><td>Dhankar Monastery &amp; Tabo</td></tr>\n              <tr><td>Day 7</td><td>Chandratal Lake camping</td></tr>\n              <tr><td>Day 8</td><td>Return to Manali via Kunzum Pass</td></tr>\n            </tbody>\n          </table>\n\n          <h2 id=\"budget-spiti\">Budget Breakdown for Spiti Valley</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person, 8D/7N)</th></tr></thead>\n            <tbody>\n              <tr><td>Accommodation (homestays + camps)</td><td>₹9,000 – ₹14,000</td></tr>\n              <tr><td>Vehicle &amp; driver</td><td>₹8,000 – ₹12,000</td></tr>\n              <tr><td>Meals</td><td>₹4,000 – ₹6,000</td></tr>\n              <tr><td>Permits &amp; monastery entries</td><td>₹500 – ₹1,000</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹28,000</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>Spiti rewards travellers who slow down — the villages you rush past are usually the ones you end up talking about most.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Manali to Kaza via Kunzum Pass</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "Is Spiti Valley open in winter?",
        "a": "The Manali–Kaza road closes with snow from around November to May. Some tour operators run winter snow-leopard trips into Kaza via Shimla, but this is a specialised trip, different from the standard June–September road-trip circuit."
      },
      {
        "q": "Do I need a permit to visit Spiti?",
        "a": "Indian nationals don't need a special permit for most of the valley, though areas near the Line of Actual Control may require one. RJ Holidays handles any required paperwork as part of the package."
      },
      {
        "q": "Is altitude sickness a concern in Spiti?",
        "a": "Yes — several villages sit above 4,000m. We build in an acclimatisation day at Kaza and recommend a gradual ascent rather than rushing straight to Chandratal or Komic."
      },
      {
        "q": "Can I do Spiti in fewer than 8 days?",
        "a": "It's possible in 5–6 days if you skip some of the outlying villages, but 8 days lets you acclimatise properly and see Chandratal without rushing."
      },
      {
        "q": "Which route is better — Manali or Shimla side?",
        "a": "Manali is shorter and more commonly used June–September. The Shimla–Kinnaur route is longer but has fewer high passes and stays open slightly later into the season."
      }
    ],
    "packagePrimary": {
      "href": "himachal-tour-package.html",
      "img": "images/dest-himachal.jpg",
      "name": "Himachal Explorer",
      "meta": "Manali · Spiti · Kasol"
    },
    "packageSecondary": {
      "href": "ladakh-tour-package.html",
      "img": "images/dest-ladakh.jpg",
      "name": "Ladakh Adventure",
      "meta": "Leh · Nubra · Pangong"
    },
    "bookBar": {
      "title": "Spiti Valley Road Trip — 8D/7N",
      "price": "Starting from ₹28,000 per person"
    },
    "finalCta": {
      "title": "Ready to Drive the Spiti Circuit?",
      "text": "Get a custom Spiti Valley road trip itinerary with acclimatisation built in and an experienced high-altitude driver — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Spiti Valley road trip quote!"
    }
  },
  "leh-ladakh-bike-trip": {
    "heroImg": "images/blog/leh-ladakh-bike-trip.webp",
    "heroImgAlt": "A motorcycle parked on a winding mountain road near Khardung La pass in Ladakh",
    "subtitle": "Khardung La, Nubra Valley's sand dunes, and Pangong Lake's changing blues — here's a realistic budget, route, and acclimatisation plan for a Leh-Ladakh bike trip.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Jun – Sep"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "9–10 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹35,000 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Leh (IXL)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Bikers, Adventure Seekers"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "0°C to 20°C"
      }
    ],
    "proseHTML": "<p>A Leh-Ladakh bike trip sits near the top of most Indian riders' bucket lists, and it's easy to see why — high-altitude passes, stark moonscape valleys, and roads that genuinely test both rider and machine. It's also a trip where planning the acclimatisation and route properly matters more than almost anywhere else in India.</p>\n          <p>This guide covers the season, the safest route options, and a realistic budget based on the rides RJ Holidays has organised out of Leh.</p>\n\n          <h2 id=\"why-ladakh-bike\">Why Ride to Ladakh</h2>\n          <ul>\n            <li>Some of the highest motorable passes in the world, including Khardung La</li>\n            <li>Nubra Valley's sand dunes and double-humped Bactrian camels</li>\n            <li>Pangong Lake's colour-shifting waters stretching into Tibet</li>\n            <li>Monasteries at Thiksey, Hemis and Diskit along the way</li>\n            <li>A genuine test of riding skill on well-known Himalayan roads</li>\n          </ul>\n\n          <h2 id=\"best-time-ladakh-bike\">Best Time for the Ladakh Bike Trip</h2>\n          <table>\n            <thead><tr><th>Window</th><th>Conditions</th><th>Notes</th></tr></thead>\n            <tbody>\n              <tr><td>June</td><td>Roads freshly open, Zoji La and Rohtang recently cleared</td><td>Cooler, greener, fewer riders</td></tr>\n              <tr><td>July – August</td><td>Warmest, most stable weather</td><td>Peak season — book bikes and stays early</td></tr>\n              <tr><td>September</td><td>Clear skies, roads start emptying out</td><td>Our preferred window for photography</td></tr>\n              <tr><td>October onward</td><td>Passes begin closing with early snow</td><td>Not recommended for a full circuit ride</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout warning\">\n            <i class=\"fa-solid fa-triangle-exclamation\"></i>\n            <div>\n              <span class=\"callout-title\">Acclimatisation Is Non-Negotiable</span>\n              <p>Leh sits at 3,500m. RJ Holidays builds in a mandatory two-day rest in Leh before any pass is attempted — riders who skip this are the most common cause of altitude-related trip cancellations.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-ladakh-bike\">Getting There — Fly-In vs Overland Routes</h2>\n          <p>Most riders fly into Leh (IXL) and either rent a bike locally or have one shipped ahead, which avoids the two-day ride in from Manali or Srinagar before you've acclimatised. Riders who want the full overland experience can take the Manali–Leh Highway (via Rohtang and Baralacha La) or the Srinagar–Leh Highway (via Zoji La), each roughly a two-day ride one way.</p>\n\n          <h2 id=\"route-highlights-ladakh\">Route Highlights</h2>\n          <h3 id=\"khardung-la\">Khardung La</h3>\n          <p>At around 5,359m, Khardung La is one of the highest motorable passes in the world and the natural first ride out of Leh once acclimatised. It's also the gateway to Nubra Valley.</p>\n          <h3 id=\"nubra-pangong\">Nubra Valley &amp; Pangong Lake</h3>\n          <ul>\n            <li><strong>Nubra Valley</strong> — sand dunes at Hunder, Diskit Monastery, and a genuinely different desert-meets-mountain landscape</li>\n            <li><strong>Pangong Lake</strong> — best reached via the Shyok route or Chang La pass; an overnight stay lets you see the lake at both sunset and sunrise</li>\n            <li><strong>Tso Moriri</strong> (optional add-on) — quieter and less visited than Pangong, for riders with extra days</li>\n          </ul>\n\n          <div class=\"article-cta\">\n            <h3>Ready to Ride to Ladakh?</h3>\n            <p>RJ Holidays arranges bike rentals, permits, acclimatisation-paced routing and backup vehicle support for Leh-Ladakh rides.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20a%20Leh-Ladakh%20bike%20trip%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"ladakh-tour-package.html\" class=\"cta-btn ghost\">View Ladakh Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"budget-ladakh-bike\">Budget Breakdown for a Ladakh Bike Trip</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person, 9D/8N)</th></tr></thead>\n            <tbody>\n              <tr><td>Bike rental (Royal Enfield, self-ride)</td><td>₹9,000 – ₹14,000</td></tr>\n              <tr><td>Fuel</td><td>₹3,500 – ₹5,000</td></tr>\n              <tr><td>Accommodation</td><td>₹8,000 – ₹12,000</td></tr>\n              <tr><td>Permits (Nubra, Pangong, Tso Moriri)</td><td>₹500 – ₹800</td></tr>\n              <tr><td>Meals</td><td>₹3,500 – ₹5,000</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹35,000</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>Ladakh doesn't reward riders who rush the passes — it rewards the ones who respect the altitude and let the roads set the pace.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Leh, Khardung La, Nubra &amp; Pangong</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "Do I need prior riding experience for Ladakh?",
        "a": "Comfort riding on hilly terrain is important, but you don't need mountain-specific experience — RJ Holidays' routes are paced conservatively and backup vehicle support is included."
      },
      {
        "q": "How many rest days should I plan for acclimatisation?",
        "a": "At least two full days in Leh before attempting Khardung La or any pass above 4,500m. Skipping this is the leading cause of altitude sickness on this route."
      },
      {
        "q": "Do I need permits for Nubra Valley and Pangong Lake?",
        "a": "Yes, Inner Line Permits are required for Nubra, Pangong and Tso Moriri. RJ Holidays arranges these as part of the package."
      },
      {
        "q": "Is it better to fly in or ride the full highway from Manali?",
        "a": "Flying into Leh and starting the circuit from there is faster and reduces early-trip fatigue. Riding the full Manali–Leh or Srinagar–Leh highway adds 2 extra days each way but is a bucket-list ride in itself."
      },
      {
        "q": "What's the best month for the Ladakh bike trip?",
        "a": "July and August offer the most stable weather, though June and September have fewer riders on the road and equally good conditions."
      }
    ],
    "packagePrimary": {
      "href": "ladakh-tour-package.html",
      "img": "images/dest-ladakh.jpg",
      "name": "Ladakh Adventure",
      "meta": "Leh · Nubra · Pangong"
    },
    "packageSecondary": {
      "href": "himachal-tour-package.html",
      "img": "images/dest-himachal.jpg",
      "name": "Himachal Explorer",
      "meta": "Manali · Spiti · Kasol"
    },
    "bookBar": {
      "title": "Ladakh Bike Trip — 9D/8N",
      "price": "Starting from ₹35,000 per person"
    },
    "finalCta": {
      "title": "Ready to Ride to Ladakh?",
      "text": "Get a custom Leh-Ladakh bike trip itinerary with bike rental, permits and acclimatisation-paced routing — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Leh-Ladakh bike trip quote!"
    }
  },
  "best-time-manali": {
    "heroImg": "images/blog/best-time-manali.webp",
    "heroImgAlt": "Snow-capped peaks above Solang Valley near Manali, Himachal Pradesh",
    "subtitle": "Snow in Solang Valley, apple blossoms in spring, or monsoon greens — Manali changes character completely by season. Here's which one matches the trip you actually want.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Season-dependent"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "3–5 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹9,000 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Bhuntar (KUU)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Couples, Families, Snow Seekers"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "-2°C to 25°C"
      }
    ],
    "proseHTML": "<p>Manali is one of the few Himalayan hill stations that genuinely works year-round, but the trip you get depends entirely on when you go — snow-play in winter, apple blossoms in spring, waterfalls in monsoon, or golden light in autumn.</p>\n          <p>This guide breaks down each season so you can match your dates to the trip you actually want, based on the itineraries our team runs out of Manali all year.</p>\n\n          <h2 id=\"why-manali-seasons\">Why Manali Changes So Much by Season</h2>\n          <p>Manali's location — at the base of the Pir Panjal range, with Solang Valley and Rohtang Pass close by — means altitude-driven weather shifts fast. A trip in January looks nothing like one in May, even though it's the same town.</p>\n\n          <h2 id=\"season-by-season-manali\">Manali Season-by-Season</h2>\n          <table>\n            <thead><tr><th>Season</th><th>Weather</th><th>Highlight</th></tr></thead>\n            <tbody>\n              <tr><td>Spring (Mar – May)</td><td>Mild days, cool nights, orchards in bloom</td><td>Best balance of pleasant weather and open roads</td></tr>\n              <tr><td>Summer (Jun – early Jul)</td><td>Warm days, cool evenings</td><td>Peak season for Solang Valley activities</td></tr>\n              <tr><td>Monsoon (Jul – Aug)</td><td>Frequent rain, occasional landslides on approach roads</td><td>Lush green valleys, fewer tourists, lower rates</td></tr>\n              <tr><td>Autumn (Sep – Nov)</td><td>Clear skies, crisp air, golden light</td><td>Best visibility for mountain photography</td></tr>\n              <tr><td>Winter (Dec – Feb)</td><td>Snowfall in Manali town and Solang Valley</td><td>Snow activities, cosiest season for couples</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout tip\">\n            <i class=\"fa-solid fa-lightbulb\"></i>\n            <div>\n              <span class=\"callout-title\">Snowfall Isn't Guaranteed on Every Winter Date</span>\n              <p>Manali town itself gets snow in most years but not every week — for a near-certain snow experience, plan for Solang Valley or Rohtang, which sit higher and hold snow more reliably through January and February.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-manali\">Getting There</h2>\n          <p>Bhuntar Airport (KUU), about 50km from Manali, has flights from Delhi (weather-dependent in winter). The nearest major railhead is Chandigarh or Ambala, roughly 8–9 hours away by road, and Manali is also a common overnight bus route from Delhi.</p>\n\n          <h2 id=\"what-to-do-season\">What to Do Each Season</h2>\n          <h3 id=\"winter-manali\">Winter — Snow Activities</h3>\n          <ul>\n            <li>Skiing and snowboarding lessons at Solang Valley</li>\n            <li>Snow scooter and tube rides for families</li>\n            <li>Cable car rides over snow-covered slopes</li>\n          </ul>\n          <h3 id=\"summer-manali\">Spring &amp; Summer — Adventure &amp; Sightseeing</h3>\n          <ul>\n            <li>Paragliding and zorbing at Solang Valley</li>\n            <li>Rohtang Pass day trips (permit required, seasonal)</li>\n            <li>Old Manali cafés, Hadimba Temple, and riverside walks</li>\n          </ul>\n\n          <div class=\"article-cta\">\n            <h3>Not Sure Which Season Fits Your Trip?</h3>\n            <p>Tell us your travel dates and what kind of trip you want — snow, adventure or a quiet getaway — and RJ Holidays will build a Manali itinerary around it.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20Manali%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"himachal-tour-package.html\" class=\"cta-btn ghost\">View Himachal Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"budget-manali\">Budget Breakdown for a Manali Trip</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person, 4D/3N)</th></tr></thead>\n            <tbody>\n              <tr><td>Accommodation</td><td>₹4,000 – ₹7,000</td></tr>\n              <tr><td>Local transport &amp; transfers</td><td>₹1,500 – ₹2,500</td></tr>\n              <tr><td>Solang Valley activities</td><td>₹800 – ₹1,800</td></tr>\n              <tr><td>Meals</td><td>₹1,800 – ₹2,800</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹9,000</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>There's no single \"best\" season for Manali — there's a best season for the specific trip you're trying to have.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Manali &amp; Solang Valley</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "What is the best month to see snow in Manali?",
        "a": "January is the most reliable month for snow in Manali town itself. Solang Valley and Rohtang Pass hold snow from December through March."
      },
      {
        "q": "Is Manali crowded in summer?",
        "a": "Yes, May and June (peak summer) are the busiest months, coinciding with school holidays. Spring (March–April) offers similarly pleasant weather with fewer crowds."
      },
      {
        "q": "Is monsoon a bad time to visit Manali?",
        "a": "Not necessarily — the valley turns lush green and hotel rates drop, though occasional landslides can affect the approach road. It suits travellers who don't mind rain and want a quieter trip."
      },
      {
        "q": "Is Rohtang Pass open year-round?",
        "a": "No, it's typically open from around May to November depending on snow clearance, and requires a permit. It's closed for most of winter."
      },
      {
        "q": "How many days are enough for Manali?",
        "a": "3 to 5 days covers Manali town, Solang Valley and a day trip comfortably. Add extra days if you want to combine it with Kasol or Spiti Valley."
      }
    ],
    "packagePrimary": {
      "href": "himachal-tour-package.html",
      "img": "images/dest-manali.jpg",
      "name": "Himachal Explorer",
      "meta": "Manali · Kasol · Solang Valley"
    },
    "packageSecondary": {
      "href": "kashmir-tour-package.html",
      "img": "images/dest-kashmir.jpg",
      "name": "Kashmir Paradise",
      "meta": "6N/7D · from ₹18,500"
    },
    "bookBar": {
      "title": "Himachal Explorer — Manali",
      "price": "Starting from ₹9,000 per person"
    },
    "finalCta": {
      "title": "Plan Your Manali Trip",
      "text": "Tell us your travel dates and RJ Holidays will build a Manali itinerary matched to the season you're travelling in — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Manali trip quote!"
    }
  },
  "sikkim-itinerary": {
    "heroImg": "images/blog/gangtok-pelling.webp",
    "heroImgAlt": "Prayer flags with a view of Kanchenjunga peak from Pelling, Sikkim",
    "subtitle": "Tsomgo Lake, Nathula Pass, and Kanchenjunga views from Pelling — a day-by-day plan for first-time visitors to Sikkim, one of the Himalayas' most underrated states.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Mar–Jun & Oct–Dec"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "6 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹22,000 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Bagdogra (IXB)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Nature Lovers, Families, Couples"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "5°C to 20°C"
      }
    ],
    "proseHTML": "<p>Sikkim is smaller and quieter than most Himalayan tourist circuits, but it packs in high-altitude lakes, one of the world's highest motorable passes, and views of Kanchenjunga — the world's third-highest peak — often without the crowds you'd find elsewhere.</p>\n          <p>This guide lays out a tested 6-day Gangtok-and-Pelling circuit, the permits you'll need, and when to go.</p>\n\n          <h2 id=\"why-sikkim\">Why Visit Sikkim</h2>\n          <ul>\n            <li>Tsomgo (Changu) Lake and Nathula Pass, on the India-China trade route</li>\n            <li>Kanchenjunga views from Pelling, often clearer than from Darjeeling</li>\n            <li>Clean, well-organised towns — Gangtok is one of India's tidiest hill capitals</li>\n            <li>A genuinely different Himalayan culture, shaped by Buddhist monasteries and Nepali, Lepcha and Bhutia communities</li>\n            <li>Fewer crowds than Himachal or Uttarakhand hill stations</li>\n          </ul>\n\n          <h2 id=\"best-time-sikkim\">Best Time to Visit Sikkim</h2>\n          <table>\n            <thead><tr><th>Season</th><th>Weather</th><th>Notes</th></tr></thead>\n            <tbody>\n              <tr><td>March – June</td><td>Mild, rhododendrons blooming</td><td>Best window for Kanchenjunga visibility</td></tr>\n              <tr><td>July – September</td><td>Monsoon, frequent landslides</td><td>Not recommended — Nathula often closes</td></tr>\n              <tr><td>October – December</td><td>Clear skies, cold nights</td><td>Sharpest mountain views of the year</td></tr>\n              <tr><td>January – February</td><td>Cold, occasional snow in Gangtok</td><td>Quiet season, some passes may close</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout info\">\n            <i class=\"fa-solid fa-circle-info\"></i>\n            <div>\n              <span class=\"callout-title\">Permits Required</span>\n              <p>Indian nationals need an Inner Line Permit to visit Tsomgo Lake and Nathula Pass, arranged through a registered travel agent. RJ Holidays handles this as part of the itinerary — carry two passport photos and a photo ID.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-sikkim\">Getting There</h2>\n          <p>Bagdogra Airport (IXB) near Siliguri is the main gateway, about a 4-hour drive to Gangtok. Sikkim's own Pakyong Airport (PYG) also operates limited flights from Kolkata and Guwahati when weather permits, cutting the road transfer significantly.</p>\n\n          <h2 id=\"sikkim-itinerary-days\">Sample 6-Day Sikkim Itinerary</h2>\n          <table>\n            <thead><tr><th>Day</th><th>Plan</th></tr></thead>\n            <tbody>\n              <tr><td>Day 1</td><td>Arrive Bagdogra, transfer to Gangtok</td></tr>\n              <tr><td>Day 2</td><td>Tsomgo Lake &amp; Nathula Pass day trip (permit required)</td></tr>\n              <tr><td>Day 3</td><td>Gangtok local sightseeing — MG Marg, Rumtek Monastery, Ganesh Tok</td></tr>\n              <tr><td>Day 4</td><td>Transfer to Pelling, en route waterfalls</td></tr>\n              <tr><td>Day 5</td><td>Pelling sightseeing — Kanchenjunga viewpoint, Pemayangtse Monastery, Skywalk</td></tr>\n              <tr><td>Day 6</td><td>Transfer back to Bagdogra for departure</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"article-cta\">\n            <h3>Plan Your Sikkim Trip</h3>\n            <p>RJ Holidays arranges Sikkim permits, a Gangtok-Pelling itinerary and local transfers — a stress-free way to see one of the Himalayas' quietest corners.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20Sikkim%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"sikkim-tour-package.html\" class=\"cta-btn ghost\">View Sikkim Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"budget-sikkim\">Budget Breakdown for a Sikkim Trip</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person, 6D/5N)</th></tr></thead>\n            <tbody>\n              <tr><td>Accommodation</td><td>₹8,000 – ₹12,000</td></tr>\n              <tr><td>Local transport &amp; transfers</td><td>₹4,000 – ₹6,000</td></tr>\n              <tr><td>Permits (Tsomgo &amp; Nathula)</td><td>₹600 – ₹1,000</td></tr>\n              <tr><td>Meals</td><td>₹3,500 – ₹5,000</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹22,000</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>Sikkim is what a lot of travellers expect the Himalayas to feel like before the crowds arrive — Gangtok and Pelling still deliver that.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Gangtok, Tsomgo Lake &amp; Pelling</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "Do I need a permit to visit Sikkim?",
        "a": "Sikkim itself doesn't require a permit for Indian nationals, but restricted areas like Tsomgo Lake and Nathula Pass need an Inner Line Permit, which RJ Holidays arranges."
      },
      {
        "q": "Is Nathula Pass open every day?",
        "a": "It's typically closed on Mondays and Tuesdays, and can close without notice due to weather or border conditions. We always confirm the day before your visit."
      },
      {
        "q": "What is the best time to see Kanchenjunga from Pelling?",
        "a": "October to December offers the clearest skies. Early morning is best, before clouds build up later in the day."
      },
      {
        "q": "Is Sikkim safe for solo and family travellers?",
        "a": "Yes, Sikkim is considered one of India's safest and cleanest states to travel in, with well-organised infrastructure for tourists."
      },
      {
        "q": "How many days do I need for Sikkim?",
        "a": "6 days covers Gangtok and Pelling comfortably. Add 2–3 more days if you want to include North Sikkim (Lachung and Yumthang Valley)."
      }
    ],
    "packagePrimary": {
      "href": "sikkim-tour-package.html",
      "img": "images/dest-sikkim.jpg",
      "name": "Sikkim Explorer",
      "meta": "Gangtok · Tsomgo · Pelling"
    },
    "packageSecondary": {
      "href": "nepal-tour-package.html",
      "img": "images/dest-nepal.jpg",
      "name": "Nepal Family Tour",
      "meta": "Kathmandu · Pokhara"
    },
    "bookBar": {
      "title": "Sikkim Explorer — 6D/5N",
      "price": "Starting from ₹22,000 per person"
    },
    "finalCta": {
      "title": "Plan Your Sikkim Trip",
      "text": "Get a custom Gangtok-Pelling itinerary with Tsomgo and Nathula permits handled for you — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Sikkim trip quote!"
    }
  },
  "nepal-family-tour": {
    "heroImg": "images/blog/kathmandu-pokhara.webp",
    "heroImgAlt": "Boats on Phewa Lake in Pokhara with the Annapurna range in the background, Nepal",
    "subtitle": "Temples, lakeside walks and gentle adventure — a tested Kathmandu-to-Pokhara itinerary built for travellers with kids or grandparents along.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Oct–Dec & Mar–Apr"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "7 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹32,000 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Kathmandu (KTM)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Families, Multi-Gen Groups"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "10°C to 25°C"
      }
    ],
    "proseHTML": "<p>Nepal is one of the easiest international Himalayan trips for families — short flight time from most Indian cities, visa-on-arrival for Indian nationals, and a mix of temple visits, lakeside towns and gentle adventure that works for both kids and grandparents.</p>\n          <p>This guide covers our tested Kathmandu-to-Pokhara route, paced deliberately for family groups rather than backpackers.</p>\n\n          <h2 id=\"why-nepal-family\">Why Nepal Works Well for Family Trips</h2>\n          <ul>\n            <li>No visa required in advance for Indian nationals — just a photo ID at the border or airport</li>\n            <li>Short flight from Delhi, Kolkata or Varanasi (around 1.5–2 hours)</li>\n            <li>A gentle mix of culture (Kathmandu) and relaxation (Pokhara), rather than only strenuous trekking</li>\n            <li>Good hospital and medical infrastructure in both cities, useful peace of mind with older travellers or kids</li>\n            <li>Hindi is widely understood, which makes communication easy</li>\n          </ul>\n\n          <h2 id=\"best-time-nepal\">Best Time to Visit Nepal</h2>\n          <table>\n            <thead><tr><th>Season</th><th>Weather</th><th>Notes</th></tr></thead>\n            <tbody>\n              <tr><td>October – December</td><td>Clear skies, mild days, cool nights</td><td>Best mountain visibility of the year</td></tr>\n              <tr><td>January – February</td><td>Cold, occasional fog in Kathmandu mornings</td><td>Quieter, good hotel rates</td></tr>\n              <tr><td>March – April</td><td>Warm days, rhododendrons in bloom</td><td>Second-best visibility window</td></tr>\n              <tr><td>June – September</td><td>Monsoon, humid and rainy</td><td>Not recommended for a family trip</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout info\">\n            <i class=\"fa-solid fa-circle-info\"></i>\n            <div>\n              <span class=\"callout-title\">Entry Requirements for Indian Nationals</span>\n              <p>Indian citizens don't need a visa to enter Nepal — a valid photo ID (passport, voter ID or Aadhaar with a photo ID) is sufficient at the airport or land border. Children should carry a birth certificate or school ID.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-nepal\">Getting There</h2>\n          <p>Tribhuvan International Airport (KTM) in Kathmandu has direct flights from Delhi, Mumbai, Bengaluru, Kolkata and Varanasi. Overland travel from Bihar or UP border towns is also possible but takes considerably longer and isn't ideal with young children or older travellers.</p>\n\n          <h2 id=\"kathmandu-highlights\">Kathmandu Highlights for Families</h2>\n          <ul>\n            <li><strong>Kathmandu Durbar Square</strong> — a UNESCO-listed royal square, easy half-day walk</li>\n            <li><strong>Pashupatinath Temple</strong> — one of the holiest Hindu temples outside India</li>\n            <li><strong>Boudhanath Stupa</strong> — one of the largest Buddhist stupas in the world, a calm, flat walking loop</li>\n            <li><strong>Swayambhunath (Monkey Temple)</strong> — panoramic city views, though involves some stairs</li>\n          </ul>\n\n          <h2 id=\"pokhara-highlights\">Pokhara Highlights for Families</h2>\n          <ul>\n            <li><strong>Phewa Lake</strong> — a relaxed boat ride with Annapurna views on a clear day</li>\n            <li><strong>Davis Falls &amp; Gupteshwor Cave</strong> — an easy, short stop suitable for all ages</li>\n            <li><strong>Sarangkot sunrise viewpoint</strong> — a short drive up for mountain views, optional for early risers</li>\n          </ul>\n\n          <div class=\"article-cta\">\n            <h3>Plan Your Family Trip to Nepal</h3>\n            <p>RJ Holidays paces the Nepal itinerary specifically for families and multi-generation groups, with comfortable transfers and no rushed sightseeing days.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20a%20Nepal%20family%20tour%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"nepal-tour-package.html\" class=\"cta-btn ghost\">View Nepal Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"itinerary-nepal\">Sample 7-Day Nepal Family Itinerary</h2>\n          <table>\n            <thead><tr><th>Day</th><th>Plan</th></tr></thead>\n            <tbody>\n              <tr><td>Day 1</td><td>Arrive Kathmandu, leisure evening</td></tr>\n              <tr><td>Day 2</td><td>Kathmandu Durbar Square, Pashupatinath &amp; Boudhanath</td></tr>\n              <tr><td>Day 3</td><td>Drive to Pokhara (or short domestic flight)</td></tr>\n              <tr><td>Day 4</td><td>Phewa Lake boating, Davis Falls, Gupteshwor Cave</td></tr>\n              <tr><td>Day 5</td><td>Sarangkot sunrise (optional), leisure lakeside day</td></tr>\n              <tr><td>Day 6</td><td>Return to Kathmandu, souvenir shopping at Thamel</td></tr>\n              <tr><td>Day 7</td><td>Departure</td></tr>\n            </tbody>\n          </table>\n\n          <h2 id=\"budget-nepal\">Budget Breakdown for a Nepal Family Trip</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person, 7D/6N)</th></tr></thead>\n            <tbody>\n              <tr><td>Accommodation</td><td>₹12,000 – ₹18,000</td></tr>\n              <tr><td>Domestic transfers (Kathmandu–Pokhara)</td><td>₹4,000 – ₹6,000</td></tr>\n              <tr><td>Sightseeing &amp; entry fees</td><td>₹2,000 – ₹3,000</td></tr>\n              <tr><td>Meals</td><td>₹5,000 – ₹7,000</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹32,000</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>Nepal is proof that an international Himalayan trip doesn't have to be complicated — for families, it's often simpler than a domestic hill-station trip.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Kathmandu &amp; Pokhara</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "Do Indian nationals need a visa for Nepal?",
        "a": "No — Indian citizens can enter Nepal with a valid photo ID such as a passport, voter ID, or Aadhaar with photo, no advance visa required."
      },
      {
        "q": "Is Nepal a good destination with young kids or elderly travellers?",
        "a": "Yes, especially the Kathmandu-Pokhara circuit, which avoids strenuous trekking and has good medical infrastructure in both cities."
      },
      {
        "q": "Is Kathmandu-Pokhara connected by flight?",
        "a": "Yes, there are short domestic flights (around 25 minutes) as well as a scenic 6–7 hour road option. RJ Holidays can arrange either depending on your group's preference."
      },
      {
        "q": "What currency should I carry in Nepal?",
        "a": "The Nepalese Rupee is the local currency, though Indian Rupees (notes of ₹100 and below) are widely accepted in tourist areas."
      },
      {
        "q": "Is the water safe to drink in Kathmandu and Pokhara?",
        "a": "We recommend bottled or filtered water throughout the trip, which is standard practice for most international travellers to Nepal."
      }
    ],
    "packagePrimary": {
      "href": "nepal-tour-package.html",
      "img": "images/dest-nepal.jpg",
      "name": "Nepal Family Tour",
      "meta": "Kathmandu · Pokhara"
    },
    "packageSecondary": {
      "href": "sikkim-tour-package.html",
      "img": "images/dest-sikkim.jpg",
      "name": "Sikkim Explorer",
      "meta": "Gangtok · Tsomgo · Pelling"
    },
    "bookBar": {
      "title": "Nepal Family Tour — 7D/6N",
      "price": "Starting from ₹32,000 per person"
    },
    "finalCta": {
      "title": "Plan Your Family Trip to Nepal",
      "text": "Get a custom Kathmandu-Pokhara itinerary paced for families and multi-generation groups — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Nepal family tour quote!"
    }
  },
  "darjeeling-weekend": {
    "heroImg": "images/blog/darjeeling-weekend-getaway.webp",
    "heroImgAlt": "The Darjeeling Himalayan Railway toy train passing through tea gardens with mountains behind",
    "subtitle": "Tiger Hill sunrise, the toy train, and tea garden walks — an efficient 2-day Darjeeling itinerary built for a short weekend escape from Siliguri.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Mar–May & Oct–Dec"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "2 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹6,500 onward"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Bagdogra (IXB)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Weekend Travellers"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "5°C to 20°C"
      }
    ],
    "proseHTML": "<p>Darjeeling is close enough to Siliguri and Bagdogra to make a genuinely satisfying weekend trip — you can realistically fit in a Tiger Hill sunrise, the toy train, and tea garden walks in two focused days without feeling rushed.</p>\n          <p>This guide lays out the tightest efficient plan for a short Darjeeling weekend, based on the getaways we run from Siliguri.</p>\n\n          <h2 id=\"why-darjeeling-weekend\">Why Darjeeling Works as a Weekend Trip</h2>\n          <ul>\n            <li>Only around 3 hours from Bagdogra Airport or Siliguri railway station</li>\n            <li>The UNESCO-listed Darjeeling Himalayan Railway (\"toy train\") runs short joyrides, not just the full route</li>\n            <li>Tiger Hill offers sunrise views of Kanchenjunga (and Everest on exceptionally clear days)</li>\n            <li>Walkable town centre — Mall Road, Chowrasta and nearby tea estates are close together</li>\n          </ul>\n\n          <h2 id=\"best-time-darjeeling\">Best Time for a Darjeeling Weekend</h2>\n          <table>\n            <thead><tr><th>Season</th><th>Weather</th><th>Notes</th></tr></thead>\n            <tbody>\n              <tr><td>March – May</td><td>Mild, tea gardens flushing new leaves</td><td>Good mountain visibility</td></tr>\n              <tr><td>June – September</td><td>Monsoon, frequent fog and rain</td><td>Sunrise views at Tiger Hill unlikely</td></tr>\n              <tr><td>October – December</td><td>Crisp, clear skies</td><td>Best window for Kanchenjunga sunrise views</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout tip\">\n            <i class=\"fa-solid fa-lightbulb\"></i>\n            <div>\n              <span class=\"callout-title\">Tiger Hill Means an Early Start</span>\n              <p>Departure for Tiger Hill is typically around 4:00–4:30 AM to reach before sunrise. Carry warm layers — it's noticeably colder at the viewpoint than in Darjeeling town.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-darjeeling\">Getting There from Siliguri</h2>\n          <p>Bagdogra Airport (IXB) is the nearest airport, about a 3-hour scenic drive up to Darjeeling. New Jalpaiguri (NJP) is the nearest major railway station, roughly the same distance. Shared and private taxis run regularly from both.</p>\n\n          <div class=\"article-cta\">\n            <h3>Plan Your Darjeeling Weekend</h3>\n            <p>RJ Holidays runs efficient 2-day Darjeeling weekend trips from Siliguri with Tiger Hill, the toy train and tea garden visits included.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20a%20Darjeeling%20weekend%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"sikkim-tour-package.html\" class=\"cta-btn ghost\">View Sikkim & Darjeeling Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"itinerary-darjeeling\">Sample 2-Day Darjeeling Plan</h2>\n          <table>\n            <thead><tr><th>Day</th><th>Plan</th></tr></thead>\n            <tbody>\n              <tr><td>Day 1</td><td>Arrive from Bagdogra/NJP, toy train joyride, Mall Road &amp; Chowrasta evening walk</td></tr>\n              <tr><td>Day 2</td><td>Early Tiger Hill sunrise, Batasia Loop, tea garden visit, return transfer</td></tr>\n            </tbody>\n          </table>\n\n          <h2 id=\"budget-darjeeling\">Budget Breakdown for a Darjeeling Weekend</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per person, 2D/1N)</th></tr></thead>\n            <tbody>\n              <tr><td>Accommodation</td><td>₹2,000 – ₹3,500</td></tr>\n              <tr><td>Local transport &amp; transfers</td><td>₹1,500 – ₹2,500</td></tr>\n              <tr><td>Toy train joyride &amp; entries</td><td>₹500 – ₹900</td></tr>\n              <tr><td>Meals</td><td>₹1,200 – ₹1,800</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹6,500</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>A Darjeeling weekend is proof that you don't need a week off to get a proper Himalayan reset — two well-planned days is enough.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Siliguri to Darjeeling</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "Is 2 days enough for Darjeeling?",
        "a": "Yes, 2 focused days cover the toy train, Tiger Hill sunrise, Mall Road and a tea garden visit comfortably. A 3rd day allows a more relaxed pace or a side trip to Mirik."
      },
      {
        "q": "Is the Tiger Hill sunrise guaranteed to be clear?",
        "a": "No — visibility depends on weather and is most reliable October to December. Monsoon months (June–September) often have fog obscuring the view."
      },
      {
        "q": "How do I get from Bagdogra to Darjeeling?",
        "a": "It's roughly a 3-hour drive by shared or private taxi. RJ Holidays arranges this transfer as part of the weekend package."
      },
      {
        "q": "Can I ride the full-length toy train?",
        "a": "The full Darjeeling-to-Siliguri route takes most of a day; most weekend travellers instead take the shorter joyride loop within Darjeeling town, which we include in the 2-day plan."
      },
      {
        "q": "Is Darjeeling cold in winter?",
        "a": "Yes, December to February can drop close to freezing at night, especially at Tiger Hill. Warm layers are essential year-round for the early sunrise trip."
      }
    ],
    "packagePrimary": {
      "href": "sikkim-tour-package.html",
      "img": "images/dest-darjeeling.jpg",
      "name": "Sikkim & Darjeeling Getaway",
      "meta": "Gangtok · Darjeeling"
    },
    "packageSecondary": {
      "href": "nepal-tour-package.html",
      "img": "images/dest-nepal.jpg",
      "name": "Nepal Family Tour",
      "meta": "Kathmandu · Pokhara"
    },
    "bookBar": {
      "title": "Darjeeling Weekend Getaway — 2D/1N",
      "price": "Starting from ₹6,500 per person"
    },
    "finalCta": {
      "title": "Plan Your Darjeeling Weekend",
      "text": "Get a custom 2-day Darjeeling itinerary from Siliguri with Tiger Hill sunrise and the toy train included — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Darjeeling weekend quote!"
    }
  },
  "kashmir-honeymoon": {
    "heroImg": "images/blog/honeymoon-in-kashmir.webp",
    "heroImgAlt": "A private shikara boat at sunset on Dal Lake, Srinagar, set up for a couple",
    "subtitle": "Houseboat stays, private shikara rides, and Gulmarg gondola sunsets — a Kashmir honeymoon plan built specifically for couples, not a general sightseeing tour.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Apr–Jun & Sep–Oct"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "6 Days"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹24,000 per couple"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Srinagar (SXR)"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "Couples, Honeymooners"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "12°C to 28°C"
      }
    ],
    "proseHTML": "<p>Kashmir is one of India's most requested honeymoon destinations, and for good reason — a private houseboat on Dal Lake, gondola rides over snow or meadows depending on season, and gardens built centuries ago specifically for romance.</p>\n          <p>This guide is built specifically around couples' itineraries, not a general Kashmir sightseeing tour — pacing, privacy and a few signature romantic experiences are the focus.</p>\n\n          <h2 id=\"why-kashmir-honeymoon\">Why Kashmir Works for a Honeymoon</h2>\n          <ul>\n            <li>Private houseboat stays with dedicated staff, unlike a typical hotel room</li>\n            <li>The Mughal Gardens (Nishat, Shalimar) were literally designed as royal romantic retreats</li>\n            <li>A genuine range of settings — lake, meadows and mountains — within a short drive of each other</li>\n            <li>Flexible pacing; couples' itineraries don't need to rush through every sightseeing stop</li>\n          </ul>\n\n          <h2 id=\"best-time-kashmir-honeymoon\">Best Time for a Kashmir Honeymoon</h2>\n          <table>\n            <thead><tr><th>Season</th><th>Weather</th><th>Highlight</th></tr></thead>\n            <tbody>\n              <tr><td>April – June</td><td>Mild, gardens in full bloom</td><td>Classic \"Paradise on Earth\" spring scenery</td></tr>\n              <tr><td>July – August</td><td>Warm, occasional rain</td><td>Fewer crowds, good hotel rates</td></tr>\n              <tr><td>September – October</td><td>Crisp, clear autumn light</td><td>Chinar trees turning golden-red</td></tr>\n              <tr><td>December – February</td><td>Snowfall in Gulmarg</td><td>A separate, equally popular winter honeymoon option</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout tip\">\n            <i class=\"fa-solid fa-lightbulb\"></i>\n            <div>\n              <span class=\"callout-title\">Book the Houseboat Category Early</span>\n              <p>Premium and deluxe houseboats with private decks are limited in number and the first to book out in peak wedding season (October–December). RJ Holidays recommends confirming dates at least 3–4 weeks ahead.</p>\n            </div>\n          </div>\n\n          <h2 id=\"getting-there-honeymoon\">Getting There</h2>\n          <p>Srinagar International Airport (SXR) has direct flights from most major Indian cities. RJ Holidays arranges private airport pickup and a direct transfer to your houseboat, so there's no scramble for shared transport on arrival.</p>\n\n          <h2 id=\"romantic-experiences\">Signature Romantic Experiences</h2>\n          <ul>\n            <li><strong>Private sunset shikara ride</strong> — a quieter alternative to the busy daytime lake traffic</li>\n            <li><strong>Candlelight dinner on the houseboat deck</strong> — arranged with your boat's staff in advance</li>\n            <li><strong>Gulmarg gondola ride</strong> — dramatic views whether under snow or green meadows, depending on season</li>\n            <li><strong>A quiet walk through Nishat Bagh</strong> at golden hour, away from the main tour groups</li>\n          </ul>\n\n          <div class=\"article-cta\">\n            <h3>Plan Your Kashmir Honeymoon</h3>\n            <p>RJ Holidays builds Kashmir honeymoon itineraries around private experiences and comfortable pacing — not a rushed group sightseeing schedule.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20free%20itinerary%20for%20a%20Kashmir%20honeymoon%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"kashmir-tour-package.html\" class=\"cta-btn ghost\">View Kashmir Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"itinerary-honeymoon\">Sample 6-Day Kashmir Honeymoon Itinerary</h2>\n          <table>\n            <thead><tr><th>Day</th><th>Plan</th></tr></thead>\n            <tbody>\n              <tr><td>Day 1</td><td>Arrive Srinagar, private houseboat check-in, sunset shikara ride</td></tr>\n              <tr><td>Day 2</td><td>Mughal Gardens (Nishat &amp; Shalimar), Old City walk</td></tr>\n              <tr><td>Day 3</td><td>Drive to Gulmarg, gondola ride, overnight in Gulmarg</td></tr>\n              <tr><td>Day 4</td><td>Return to Srinagar, leisure afternoon, candlelight houseboat dinner</td></tr>\n              <tr><td>Day 5</td><td>Day trip to Pahalgam, riverside picnic</td></tr>\n              <tr><td>Day 6</td><td>Leisure morning, souvenir shopping, departure transfer</td></tr>\n            </tbody>\n          </table>\n\n          <h2 id=\"budget-honeymoon\">Budget Breakdown for a Kashmir Honeymoon</h2>\n          <table>\n            <thead><tr><th>Category</th><th>Approx. Cost (per couple, 6D/5N)</th></tr></thead>\n            <tbody>\n              <tr><td>Houseboat &amp; hotel stays</td><td>₹14,000 – ₹22,000</td></tr>\n              <tr><td>Private transfers</td><td>₹6,000 – ₹9,000</td></tr>\n              <tr><td>Gulmarg Gondola &amp; activities</td><td>₹3,000 – ₹4,500</td></tr>\n              <tr><td>Meals &amp; candlelight dinner</td><td>₹5,000 – ₹7,000</td></tr>\n              <tr><td><strong>RJ Holidays Package (all-inclusive)</strong></td><td><strong>From ₹24,000 per couple</strong></td></tr>\n            </tbody>\n          </table>\n\n          <blockquote>The best Kashmir honeymoons aren't the ones that see the most places — they're the ones with enough unhurried time on that houseboat deck.</blockquote>\n\n          <div class=\"map-placeholder\">\n            <i class=\"fa-solid fa-map-location-dot\"></i>\n            <strong>Interactive Map — Srinagar, Gulmarg &amp; Pahalgam</strong>\n            <span>Map embed placeholder. Replace with a Google Maps iframe pointing to your preferred locations before publishing.</span>\n          </div>",
    "faqs": [
      {
        "q": "Is Kashmir safe for a honeymoon trip?",
        "a": "Yes, Srinagar, Gulmarg and Pahalgam are well set up for tourists year-round, and RJ Holidays only uses vetted drivers and pre-verified houseboat and hotel partners."
      },
      {
        "q": "What's the best season for a Kashmir honeymoon — spring or winter?",
        "a": "Both work well and offer very different experiences: spring (April–June) for garden blooms and mild weather, winter (December–February) for snowfall and a cosier, indoor-focused trip."
      },
      {
        "q": "Can we get a private houseboat, not a shared one?",
        "a": "Yes — RJ Holidays books private houseboats exclusively for couples, not shared with other travellers, as standard for honeymoon packages."
      },
      {
        "q": "How far in advance should we book?",
        "a": "3–4 weeks ahead is recommended, especially for premium houseboat categories during peak wedding season (October–December)."
      },
      {
        "q": "Can the itinerary be customised for our exact dates?",
        "a": "Yes, this sample plan is fully adjustable — contact RJ Holidays with your travel dates and preferred houseboat category for a tailored quote."
      }
    ],
    "packagePrimary": {
      "href": "kashmir-tour-package.html",
      "img": "images/dest-kashmir.jpg",
      "name": "Kashmir Paradise",
      "meta": "6N/7D · from ₹18,500"
    },
    "packageSecondary": {
      "href": "himachal-tour-package.html",
      "img": "images/dest-himachal.jpg",
      "name": "Himachal Explorer",
      "meta": "Dharamshala · Manali · Kasol"
    },
    "bookBar": {
      "title": "Kashmir Honeymoon — 6D/5N",
      "price": "Starting from ₹24,000 per couple"
    },
    "finalCta": {
      "title": "Plan Your Kashmir Honeymoon",
      "text": "Get a custom Kashmir honeymoon itinerary with a private houseboat, gondola tickets and romantic experiences included — free of charge.",
      "waText": "Hi RJ Holidays, I want a custom Kashmir honeymoon quote!"
    }
  },
  "himalayan-packing-guide": {
    "heroImg": "images/blog/himalayan-packing-guide.webp",
    "heroImgAlt": "Winter trekking and travel gear laid out for a Himalayan trip — jackets, boots and a backpack",
    "subtitle": "What to actually pack for Kashmir, Himachal, Ladakh or Sikkim — layering logic, a medicine kit, and the gear our local guides swear by, without over-packing.",
    "snapshot": [
      {
        "icon": "fa-regular fa-calendar",
        "label": "Best Time",
        "value": "Pack per season"
      },
      {
        "icon": "fa-regular fa-clock",
        "label": "Ideal Duration",
        "value": "Any trip length"
      },
      {
        "icon": "fa-solid fa-indian-rupee-sign",
        "label": "Budget (per person)",
        "value": "₹3,000–6,000 (rental)"
      },
      {
        "icon": "fa-solid fa-plane-arrival",
        "label": "Nearest Airport",
        "value": "Applies to all destinations"
      },
      {
        "icon": "fa-solid fa-users",
        "label": "Ideal For",
        "value": "First-Time Himalaya Travellers"
      },
      {
        "icon": "fa-solid fa-temperature-low",
        "label": "Weather",
        "value": "-10°C to 25°C"
      }
    ],
    "proseHTML": "<p>Every season we get the same question before a trip: \"What do I actually need to pack?\" The honest answer changes depending on the destination and month, but the underlying logic — how to layer, what's worth renting versus buying, and what belongs in a basic medical kit — stays the same.</p>\n          <p>This guide is built from what our guides actually recommend before Kashmir, Himachal, Ladakh and Sikkim trips, not a generic packing checklist.</p>\n\n          <h2 id=\"why-packing-matters\">Why Getting This Right Matters</h2>\n          <p>Over-packing heavy winter gear for a Manali trip in June is as much of a mistake as under-packing for a January Gulmarg trip. Getting the layering system right means you're comfortable without hauling a 20kg bag through airport transfers.</p>\n\n          <h2 id=\"layering-system\">The Layering System, Explained</h2>\n          <table>\n            <thead><tr><th>Layer</th><th>Purpose</th><th>Examples</th></tr></thead>\n            <tbody>\n              <tr><td>Base layer</td><td>Wicks sweat away from skin</td><td>Thermal top &amp; bottom, moisture-wicking t-shirt</td></tr>\n              <tr><td>Mid layer</td><td>Traps body heat</td><td>Fleece jacket, wool sweater</td></tr>\n              <tr><td>Outer layer</td><td>Blocks wind, rain and snow</td><td>Insulated jacket, windproof shell</td></tr>\n              <tr><td>Extremities</td><td>Prevents heat loss where it happens fastest</td><td>Woollen socks, gloves, beanie</td></tr>\n            </tbody>\n          </table>\n\n          <div class=\"callout info\">\n            <i class=\"fa-solid fa-circle-info\"></i>\n            <div>\n              <span class=\"callout-title\">Rent, Don't Buy, for a One-Off Trip</span>\n              <p>Heavy jackets, snow boots and gloves are available on rent in Srinagar, Gulmarg, Manali and Leh for a fraction of retail price. Unless you'll use it again elsewhere, renting is usually the smarter option.</p>\n            </div>\n          </div>\n\n          <h2 id=\"region-differences\">Region-by-Region Packing Differences</h2>\n          <ul>\n            <li><strong>Kashmir in winter</strong> — sub-zero nights; needs a heavy insulated jacket, snow boots and snow goggles for glare</li>\n            <li><strong>Ladakh in summer</strong> — cold nights despite warm days; layering matters more than heavy jackets, plus strong sun protection</li>\n            <li><strong>Sikkim in monsoon</strong> (generally avoided) — a light rain shell and quick-dry clothing if you do travel then</li>\n            <li><strong>Himachal in shoulder season</strong> (March–April, Oct–Nov) — a mid layer and windproof jacket cover most days</li>\n          </ul>\n\n          <div class=\"article-cta\">\n            <h3>Not Sure What to Pack for Your Trip?</h3>\n            <p>Tell us your destination and travel dates, and RJ Holidays will send a packing list tailored to your specific itinerary.</p>\n            <div class=\"article-cta-actions\">\n              <a href=\"https://wa.me/919317618833?text=Hi%20RJ%20Holidays%2C%20I%27d%20like%20a%20packing%20checklist%20for%20my%20Himalayan%20trip%21\" class=\"cta-btn gold\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-brands fa-whatsapp\"></i> Get Free Itinerary</a>\n              <a href=\"index.html#packages\" class=\"cta-btn ghost\">Explore All Packages</a>\n            </div>\n          </div>\n\n          <h2 id=\"medical-kit\">Medical &amp; Altitude Kit</h2>\n          <ul>\n            <li>Basic pain relief and fever medication</li>\n            <li>Rehydration salts (ORS) for altitude-related dehydration</li>\n            <li>Any personal prescription medication, carried in original packaging</li>\n            <li>Lip balm and moisturiser — mountain air is far drier than most travellers expect</li>\n            <li>A basic altitude sickness medication if travelling above 3,000m, after consulting a doctor</li>\n          </ul>\n\n          <h2 id=\"locals-swear-by\">What Locals Swear By</h2>\n          <ul>\n            <li>A good power bank — charging points are limited on trek routes and remote stretches</li>\n            <li>A reusable water bottle rather than relying on bottled water at every stop</li>\n            <li>Sunglasses rated for snow glare, not just regular sunglasses, above the snowline</li>\n            <li>A small daypack separate from your main luggage for day trips</li>\n          </ul>\n\n          <blockquote>The best-packed travellers we see aren't the ones who bring the most gear — they're the ones who packed for the actual season and altitude, not just \"the mountains.\"</blockquote>",
    "faqs": [
      {
        "q": "Do I need to buy specialised winter gear before my trip?",
        "a": "Usually not for a one-off trip — heavy jackets, snow boots and gloves are widely available on rent in Srinagar, Gulmarg, Manali and Leh."
      },
      {
        "q": "What should I pack differently for Ladakh versus Kashmir?",
        "a": "Ladakh needs stronger sun protection and layering for cold nights despite warm days; Kashmir winter needs heavier insulated outerwear for consistently sub-zero conditions."
      },
      {
        "q": "Is altitude sickness medication necessary?",
        "a": "For destinations above 3,000m like Ladakh or parts of Spiti and Sikkim, it's worth carrying after consulting a doctor. It's not typically needed for Manali, Srinagar or Gangtok town."
      },
      {
        "q": "How many layers should I actually pack?",
        "a": "Two to three of each layer type (base, mid, outer) is usually enough — the layering system, not sheer quantity, is what keeps you warm."
      },
      {
        "q": "What's the most commonly forgotten item?",
        "a": "Sunglasses or snow goggles rated for glare — regular sunglasses aren't enough once you're on snow above treeline."
      }
    ],
    "packagePrimary": {
      "href": "index.html#packages",
      "img": "images/about.jpg",
      "name": "Explore All Packages",
      "meta": "Kashmir · Himachal · Ladakh · Sikkim · Nepal"
    },
    "packageSecondary": {
      "href": "himachal-tour-package.html",
      "img": "images/dest-himachal.jpg",
      "name": "Himachal Explorer",
      "meta": "Dharamshala · Manali · Kasol"
    },
    "bookBar": {
      "title": "Need a Packing List for Your Trip?",
      "price": "Free with every RJ Holidays booking"
    },
    "finalCta": {
      "title": "Get a Trip-Specific Packing List",
      "text": "Tell us your destination and travel dates, and RJ Holidays will send a packing checklist tailored to your itinerary — free of charge.",
      "waText": "Hi RJ Holidays, I want a packing checklist for my Himalayan trip!"
    }
  }
};

/* =============================================================
   SHARED BLOG CARD TEMPLATE
   Used by the listing grid (blog.html), the sidebar widgets, and
   the "Related Articles" section on blog-post.html — a single
   source of truth for how a post card links to its own slug.
   ============================================================= */
function rjBlogCardTemplate(post) {
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
            <span class="blog-author-mini">${rjAuthorAvatarHTML(post.author, 'author-avatar-sm')} ${post.author}</span>
            <a href="${post.slug}" class="read-more-link">Read More <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </article>`;
}

function rjWidgetPostTemplate(post, metaText) {
  return `
      <div class="widget-post">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
        <div class="widget-post-body">
          <h4><a href="${post.slug}">${post.title}</a></h4>
          <span>${metaText}</span>
        </div>
      </div>`;
}

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
    return rjBlogCardTemplate(post);
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

  /* ---- Resolve which post this page should show, from ?post=<id> ---- */
  const AUTHOR_BIOS = {
    'Rajesh Jamwal': {
      img: 'images/about.jpg',
      role: 'Founder, RJ Holidays',
      bio: "Rajesh has been designing Himalayan itineraries out of Dharamshala since 2013, with dozens of personally-scouted trips across Kashmir, Himachal and Ladakh. He writes RJ Holidays' destination guides based on trips his own team has run.",
      reviewer: 'Neha Thakur, Senior Travel Consultant'
    },
    'Neha Thakur': {
      img: 'images/about.jpg',
      role: 'Senior Travel Consultant, RJ Holidays',
      bio: "Neha specialises in road-trip and family itineraries across the Himalayas, and has personally led trips through Himachal, Nepal and Kashmir. She reviews and co-writes RJ Holidays' destination guides.",
      reviewer: 'Rajesh Jamwal, Founder'
    }
  };

  function faqListHTML(faqs) {
    return faqs.map(f => `
            <div class="faq-item">
              <button class="faq-q">${f.q} <i class="fa-solid fa-chevron-down"></i></button>
              <div class="faq-a"><p>${f.a}</p></div>
            </div>`).join('');
  }

  function tagsHTML(tags) {
    return tags.map(t => `<a href="blog.html">${t}</a>`).join('\n            ');
  }

  function buildArticleBodyHTML(post, content, prevPost, nextPost) {
    const author = AUTHOR_BIOS[post.author] || AUTHOR_BIOS['Rajesh Jamwal'];
    const snapshotHTML = content.snapshot.map(s => `
              <div class="snapshot-item"><i class="${s.icon}"></i><div><strong>${s.label}</strong><span>${s.value}</span></div></div>`).join('');

    return `
          <!-- Trip Snapshot -->
          <div class="snapshot-box">
            <h2>Trip Snapshot</h2>
            <div class="snapshot-grid">${snapshotHTML}
            </div>
          </div>

          <!-- On-page credibility strip -->
          <div class="eeat-strip">
            <span><i class="fa-solid fa-pen-nib"></i> Written by <strong>${post.author}</strong></span>
            <span><i class="fa-solid fa-circle-check"></i> Reviewed by <strong>${author.reviewer.split(',')[0]}</strong>, ${author.reviewer.split(',')[1] ? author.reviewer.split(',')[1].trim() : 'Senior Travel Consultant'}</span>
            <span><i class="fa-solid fa-mountain"></i> <strong>12+ years</strong> planning Himalayan tours</span>
          </div>

          ${content.proseHTML}

          <h2 id="faqs">Frequently Asked Questions</h2>
          <div class="faq-list">${faqListHTML(content.faqs)}
          </div>

          <p style="margin-top:32px;">For more Himalayan guides, see our <a href="${content.packagePrimary.href}">${content.packagePrimary.name} package</a> or check current weather trends via the <a href="https://mausam.imd.gov.in/" target="_blank" rel="noopener noreferrer nofollow">India Meteorological Department</a> before you travel.</p>

          <!-- Tags -->
          <div class="article-tags" aria-label="Article tags">
            ${tagsHTML([...post.tags, post.category])}
          </div>

          <!-- Bottom share row (mobile-visible duplicate of rail) -->
          <div class="share-row-bottom">
            <span>Share this guide:</span>
            <a href="#" class="share-btn fb" aria-label="Share on Facebook" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="share-btn tw" aria-label="Share on X" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" class="share-btn wa" aria-label="Share on WhatsApp" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="#" class="share-btn li" aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin-in"></i></a>
            <button class="share-btn copy" aria-label="Copy link"><i class="fa-solid fa-link"></i></button>
          </div>

          <!-- Author Box -->
          <div class="author-box" id="author-box">
            ${rjAuthorAvatarHTML(post.author, 'author-avatar-lg')}
            <div>
              <h4>${post.author}</h4>
              <span class="author-role">${author.role}</span>
              <p>${author.bio}</p>
              <div class="author-box-meta">
                <span><strong>Reviewed by:</strong> ${author.reviewer}</span>
                <span><strong>Last updated:</strong> ${post.dateLabel}</span>
              </div>
              <div class="author-socials">
                <a href="https://www.instagram.com/rjholidays9" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/rjholidays" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="https://wa.me/919317618833" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
              </div>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="newsletter-block">
            <i class="fa-solid fa-envelope-open-text"></i>
            <h3>Get Himalayan Travel Guides in Your Inbox</h3>
            <p>New destination guides, seasonal tips and package offers from RJ Holidays — no spam, unsubscribe anytime.</p>
            <form class="newsletter-form">
              <input type="email" placeholder="Your email address" required aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
            <p class="newsletter-note">By subscribing you agree to our <a href="privacy-policy.html" style="color:rgba(255,255,255,0.6);text-decoration:underline;">Privacy Policy</a>.</p>
          </div>

          <!-- Prev / Next -->
          <div class="prev-next-nav">
            <a href="${prevPost ? prevPost.slug : 'blog.html'}" class="pn-card">
              <span class="pn-label"><i class="fa-solid fa-arrow-left"></i> ${prevPost ? 'Previous Article' : 'More Guides'}</span>
              <span class="pn-title">${prevPost ? prevPost.title : 'Back to All Blog Articles'}</span>
            </a>
            <a href="${nextPost ? nextPost.slug : 'blog.html'}" class="pn-card next">
              <span class="pn-label">Next Article <i class="fa-solid fa-arrow-right"></i></span>
              <span class="pn-title">${nextPost ? nextPost.title : 'Back to All Blog Articles'}</span>
            </a>
          </div>

          <!-- Comments (UI only, demo powered by blog.js) -->
          <div class="comments-section">
            <h2 style="font-family:var(--font-display);font-size:1.4rem;color:var(--navy);margin-bottom:20px;">Comments</h2>
            <form class="comment-form" id="commentForm">
              <div class="comment-form-row">
                <input type="text" name="cname" placeholder="Your name" required aria-label="Your name" />
                <input type="email" name="cemail" placeholder="Your email (won't be published)" aria-label="Your email" />
              </div>
              <textarea name="cmessage" placeholder="Share your thoughts or questions about ${post.title}…" required aria-label="Your comment"></textarea>
              <button type="submit">Post Comment</button>
            </form>
            <div class="comment-list" id="commentList"></div>
          </div>`;
  }

  function renderArticle() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('post');
    let post = RJ_BLOG_POSTS.find(p => p.id === requestedId);
    if (!post) post = RJ_BLOG_POSTS[0]; // sensible default (Kashmir winter guide)
    const content = RJ_ARTICLE_CONTENT[post.id];
    if (!content) return; // no content mapped — leave static HTML fallback in place

    const idx = RJ_BLOG_POSTS.findIndex(p => p.id === post.id);
    const prevPost = idx > 0 ? RJ_BLOG_POSTS[idx - 1] : null;
    const nextPost = idx < RJ_BLOG_POSTS.length - 1 ? RJ_BLOG_POSTS[idx + 1] : RJ_BLOG_POSTS[0];

    /* -- SEO meta (title, description, canonical, OG, Twitter, JSON-LD) -- */
    const canonicalUrl = `https://rjholidays.online/${post.slug}`;
    document.title = `${post.title} (2026) | RJ Holidays`;
    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', post.excerpt);
    setMeta('meta[name="keywords"]', 'content', [...post.tags, post.category, 'RJ Holidays'].join(', '));
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    setMeta('meta[property="og:title"]', 'content', post.title);
    setMeta('meta[property="og:description"]', 'content', post.excerpt);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', content.heroImg);
    setMeta('meta[property="article:published_time"]', 'content', post.date);
    setMeta('meta[property="article:author"]', 'content', post.author);
    setMeta('meta[property="article:section"]', 'content', post.category);
    setMeta('meta[property="article:tag"]', 'content', post.tags.join(', '));
    setMeta('meta[name="twitter:title"]', 'content', post.title);
    setMeta('meta[name="twitter:description"]', 'content', post.excerpt);
    setMeta('meta[name="twitter:image"]', 'content', content.heroImg);
    setMeta('meta[name="author"]', 'content', `${post.author}, RJ Holidays`);

    const ldScript = document.querySelector('script[type="application/ld+json"]');
    if (ldScript) {
      const ld = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "@id": `${canonicalUrl}#article`,
            "headline": post.title,
            "description": post.excerpt,
            "image": content.heroImg,
            "author": { "@type": "Person", "name": post.author, "url": `${canonicalUrl}#author` },
            "publisher": { "@id": "https://rjholidays.online/#organization" },
            "datePublished": post.date,
            "dateModified": post.date,
            "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
            "articleSection": post.category,
            "keywords": post.tags.join(', '),
            "inLanguage": "en-IN"
          },
          {
            "@type": "TravelAgency",
            "@id": "https://rjholidays.online/#organization",
            "name": "RJ Holidays",
            "url": "https://rjholidays.online",
            "logo": { "@type": "ImageObject", "url": "https://rjholidays.online/images/logo.png", "width": 200, "height": 60 },
            "telephone": "+91-9317618833",
            "email": "rjholidays9@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dharamshala Road",
              "addressLocality": "Dharamshala",
              "addressRegion": "Himachal Pradesh",
              "postalCode": "176215",
              "addressCountry": "IN"
            }
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rjholidays.online/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rjholidays.online/blog.html" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": content.faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          }
        ]
      };
      ldScript.textContent = JSON.stringify(ld, null, 2);
    }

    /* -- Breadcrumb, hero, meta row -- */
    const shortTitle = post.title.split(':')[0];
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    setText('breadcrumbCurrent', shortTitle);
    const heroImg = document.getElementById('articleHeroImg');
    if (heroImg) { heroImg.src = content.heroImg; heroImg.alt = content.heroImgAlt; }
    setText('articleCatBadge', post.category);
    setText('articleTitleH1', post.title);
    setText('articleSubtitleP', content.subtitle);
    const authorImg = document.getElementById('articleAuthorImg');
    if (authorImg) { authorImg.src = post.authorImg; authorImg.alt = post.author; }
    setText('articleAuthorLink', post.author);
    setText('articlePublished', '');
    const publishedEl = document.getElementById('articlePublished');
    if (publishedEl) publishedEl.innerHTML = `<i class="fa-regular fa-calendar"></i> Published ${post.dateLabel}`;
    const updatedEl = document.getElementById('articleUpdated');
    if (updatedEl) updatedEl.innerHTML = `<i class="fa-solid fa-rotate"></i> Updated ${post.dateLabel}`;
    const readTimeEl = document.getElementById('articleReadTime');
    if (readTimeEl) readTimeEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${post.readTime} min read`;

    /* -- Main body content -- */
    const bodyEl = document.getElementById('articleBody');
    if (bodyEl) bodyEl.innerHTML = buildArticleBodyHTML(post, content, prevPost, nextPost);

    /* -- Sidebar: Recent Posts (excludes current post) -- */
    const sidebarRecentEl = document.getElementById('sidebarRecentPosts');
    if (sidebarRecentEl) {
      const recent = RJ_BLOG_POSTS.filter(p => p.id !== post.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
      sidebarRecentEl.innerHTML = recent.map(p => rjWidgetPostTemplate(p, p.dateLabel)).join('');
    }

    /* -- Sidebar: Related Tour Package -- */
    const setPkg = (id, pkg) => {
      const el = document.getElementById(id);
      if (!el || !pkg) return;
      el.href = pkg.href;
      const img = el.querySelector('img');
      const nameEl = el.querySelector('span');
      const metaEl = el.querySelector('small');
      if (img) { img.src = pkg.img; img.alt = pkg.name; }
      if (nameEl) nameEl.textContent = pkg.name;
      if (metaEl) metaEl.textContent = pkg.meta;
    };
    setPkg('sidebarPkgPrimary', content.packagePrimary);
    setPkg('sidebarPkgSecondary', content.packageSecondary);
    const bookBtn = document.getElementById('sidebarPkgBookBtn');
    if (bookBtn) bookBtn.href = content.packagePrimary.href;

    /* -- Related Articles (same category first, then fill from rest) -- */
    const relatedGrid = document.getElementById('relatedArticlesGrid');
    if (relatedGrid) {
      const sameCategory = RJ_BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category);
      const others = RJ_BLOG_POSTS.filter(p => p.id !== post.id && p.category !== post.category);
      const related = [...sameCategory, ...others].slice(0, 3);
      relatedGrid.innerHTML = related.map(p => rjBlogCardTemplate(p)).join('');
    }

    /* -- Sticky book bar & final CTA -- */
    setText('bookBarTitleText', content.bookBar.title);
    setText('bookBarPriceText', content.bookBar.price);
    const bookBarWa = document.getElementById('bookBarWaLink');
    if (bookBarWa) bookBarWa.href = `https://wa.me/919317618833?text=${encodeURIComponent('Hi RJ Holidays, I want to book: ' + post.title)}`;
    setText('finalCtaTitle', content.finalCta.title);
    setText('finalCtaText', content.finalCta.text);
    const finalCtaWa = document.getElementById('finalCtaWaLink');
    if (finalCtaWa) finalCtaWa.href = `https://wa.me/919317618833?text=${encodeURIComponent(content.finalCta.waText)}`;
  }

  renderArticle();

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
        ${rjAuthorAvatarHTML(nameInput.value.trim(), 'author-avatar-md')}
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
