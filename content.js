(() => {
  // Remove previous injection so re-clicking re-rolls everything
  if (document.body.classList.contains('geocities-ified')) {
    document.body.classList.remove('geocities-ified');
    document.querySelectorAll(
      '.geocities-banner, .geocities-marquee-bar, .geocities-counter, .geocities-sparkle, .gc-theme-extra'
    ).forEach(el => el.remove());
    document.querySelectorAll('[data-gc-original]').forEach(el => {
      el.textContent = el.getAttribute('data-gc-original');
      el.removeAttribute('data-gc-original');
    });
    document.querySelectorAll('img').forEach(img => {
      img.style.removeProperty('border');
    });
  }

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  // ==========================================================
  //  THEMED PRESETS — each is a complete retro personality
  // ==========================================================
  const themes = [
    // --- GeoCities Classic (x2 variants) ---
    { style: 'geocities',
      font: "'Comic Sans MS', 'Comic Sans', cursive",
      bg: '#000033', text: '#ffff00', heading: '#00ff00', shadow1: '#ff00ff', shadow2: '#00ffff',
      bannerBg: '#ff0000', bannerText: '#ffff00', stripe1: '#ffff00', stripe2: '#000000',
      marqueeBg: '#000080', marqueeText: '#00ff00', linkColor: '#0000ff', visitedColor: '#800080',
      counterNum: '#00ff00', counterLabel: '#ff0000',
      bannerMsg: '\u{1F6A7} UNDER CONSTRUCTION \u{1F6A7} Best viewed in Netscape Navigator 4.0 at 800x600!',
      marquees: ['Welcome to my GeoCities page!', 'Sign my guestbook!', 'Join my WebRing!', 'Made with Notepad', 'Free cursors at CursorMania!', 'Click here for my MIDI collection!'],
    },
    { style: 'geocities',
      font: "'Papyrus', fantasy",
      bg: '#1a0033', text: '#ff99ff', heading: '#ff00ff', shadow1: '#00ffff', shadow2: '#ffff00',
      bannerBg: '#6600cc', bannerText: '#00ff00', stripe1: '#ff00ff', stripe2: '#330066',
      marqueeBg: '#330066', marqueeText: '#ff99ff', linkColor: '#00ccff', visitedColor: '#ff66ff',
      counterNum: '#ff00ff', counterLabel: '#00ffff',
      bannerMsg: '\u{1F6A7} UNDER CONSTRUCTION \u{1F6A7} Member of the CyberSurfing WebRing!',
      marquees: ['Under eternal construction since 1997', 'Powered by Angelfire', 'No right-clicking allowed!!!', 'Sign my guestbook!', 'This site is powered by GeoCities'],
    },
    { style: 'geocities',
      font: "'Impact', sans-serif",
      bg: '#003300', text: '#00ff00', heading: '#ffff00', shadow1: '#ff0000', shadow2: '#00ffff',
      bannerBg: '#008800', bannerText: '#ffff00', stripe1: '#00ff00', stripe2: '#003300',
      marqueeBg: '#004400', marqueeText: '#00ff00', linkColor: '#00ffcc', visitedColor: '#88ff00',
      counterNum: '#00ff00', counterLabel: '#ffff00',
      bannerMsg: '\u{1F6A7} UNDER CONSTRUCTION \u{1F6A7} This site optimized for 56k modems!',
      marquees: ['Welcome to my GeoCities page!', 'Hit counter sponsored by GeoCities!', 'Webmaster: xXcoolkid99Xx@aol.com', 'Best viewed with Netscape Navigator'],
    },

    // --- Windows XP-ish: Luna blue, Tahoma, green start bar, classic window chrome ---
    { style: 'xp',
      font: "'Tahoma', 'Segoe UI', sans-serif",
      bg: '#3a6ea5', text: '#000000', heading: '#003399', shadow1: '#ffffff', shadow2: '#6699cc',
      bannerBg: '#3169c6', bannerText: '#ffffff', stripe1: '#3169c6', stripe2: '#245dbd',
      marqueeBg: '#2f71cd', marqueeText: '#ffffff', linkColor: '#0066cc', visitedColor: '#663399',
      counterNum: '#003399', counterLabel: '#666666',
      bannerMsg: '\u{1F4BB} Welcome! | My Computer | My Documents | Recycle Bin',
      marquees: ['Task complete.', 'Your PC is protected.', 'Windows Update available!', 'Click Start to begin.', 'Searching for wireless networks...', 'MSN Messenger: 3 friends online'],
    },
    { style: 'xp',
      font: "'Tahoma', 'Segoe UI', sans-serif",
      bg: '#5b89c0', text: '#000000', heading: '#003366', shadow1: '#ffffff', shadow2: '#88aacc',
      bannerBg: '#248046', bannerText: '#ffffff', stripe1: '#248046', stripe2: '#1a6b35',
      marqueeBg: '#3c8c2e', marqueeText: '#ffffff', linkColor: '#0055aa', visitedColor: '#553399',
      counterNum: '#248046', counterLabel: '#444444',
      bannerMsg: '\u{1F4BB} Start | Internet Explorer | Outlook Express | Windows Media Player',
      marquees: ['Checking for updates...', 'Pinball score: 48,350', 'You have 1 new email!', 'Defragmenting drive C:', 'Now playing: midi_song.mid'],
    },

    // --- Netscape: Navigator grey, throbber bar, serif fonts ---
    { style: 'netscape',
      font: "'Times New Roman', 'Georgia', serif",
      bg: '#c0c0c0', text: '#000000', heading: '#000080', shadow1: '#808080', shadow2: '#ffffff',
      bannerBg: '#7f7f7f', bannerText: '#ffffff', stripe1: '#999999', stripe2: '#666666',
      marqueeBg: '#333366', marqueeText: '#ccccff', linkColor: '#0000ee', visitedColor: '#551a8b',
      counterNum: '#000080', counterLabel: '#333333',
      bannerMsg: '\u{1F310} Netscape Navigator | Location: http://www.~coolpage~.com/index.htm',
      marquees: ['Netscape Now!', 'Best viewed at 640x480', 'Get Shockwave Flash!', 'This page uses frames', 'JavaScript enabled!', 'Download Netscape Communicator 4.7!'],
    },
    { style: 'netscape',
      font: "'Courier New', monospace",
      bg: '#d4d0c8', text: '#000000', heading: '#003366', shadow1: '#ffffff', shadow2: '#808080',
      bannerBg: '#6666aa', bannerText: '#ffffff', stripe1: '#aaaacc', stripe2: '#666688',
      marqueeBg: '#3b3b6b', marqueeText: '#ffffcc', linkColor: '#0000cc', visitedColor: '#663399',
      counterNum: '#003366', counterLabel: '#666666',
      bannerMsg: '\u{1F310} Netscape | File Edit View Go Bookmarks Options Directory Window Help',
      marquees: ['Enhanced for Netscape', 'Java applet loading...', 'Click to see page source!', 'This page is Bobby Approved', 'W3C HTML 3.2 Validated'],
    },

    // --- MySpace: dark profile page, emo/scene vibes ---
    { style: 'myspace',
      font: "'Verdana', 'Trebuchet MS', sans-serif",
      bg: '#000000', text: '#ffffff', heading: '#ff3399', shadow1: '#ff66cc', shadow2: '#000000',
      bannerBg: '#003366', bannerText: '#ffffff', stripe1: '#003366', stripe2: '#001a33',
      marqueeBg: '#1a1a2e', marqueeText: '#ff3399', linkColor: '#3399ff', visitedColor: '#cc66ff',
      counterNum: '#ff3399', counterLabel: '#999999',
      bannerMsg: '\u{1F3B5} MySpace | Home | Browse | Search | Invite | Film | Mail | Blog',
      marquees: ['Thanks for the add!', 'PC4PC?', 'Check out my band!', 'Top 8 updated!', 'New bulletin posted!', 'Currently listening to: Dashboard Confessional'],
    },
    { style: 'myspace',
      font: "'Georgia', serif",
      bg: '#0d0d0d', text: '#cccccc', heading: '#00ccff', shadow1: '#0099cc', shadow2: '#000000',
      bannerBg: '#1a1a2e', bannerText: '#00ccff', stripe1: '#1a1a2e', stripe2: '#0d0d1a',
      marqueeBg: '#111122', marqueeText: '#00ccff', linkColor: '#ff6600', visitedColor: '#ff3399',
      counterNum: '#00ccff', counterLabel: '#888888',
      bannerMsg: '\u{1F3B5} MySpace | Tom is in your extended network',
      marquees: ['I made this layout myself!', 'Comment my pics!', 'Song auto-playing... sorry not sorry', 'Mood: rawr XD', 'New blog: 100 things about me'],
    },
    { style: 'myspace',
      font: "'Trebuchet MS', 'Verdana', sans-serif",
      bg: '#1a0011', text: '#ff99cc', heading: '#ff0066', shadow1: '#ff33cc', shadow2: '#330022',
      bannerBg: '#330022', bannerText: '#ff66aa', stripe1: '#440033', stripe2: '#1a0011',
      marqueeBg: '#220011', marqueeText: '#ff3399', linkColor: '#ff66cc', visitedColor: '#cc33ff',
      counterNum: '#ff0066', counterLabel: '#cc6699',
      bannerMsg: '\u{1F3B5} xXx_BrOkEn_AnGeL_xXx\'s Profile | Online Now!',
      marquees: ['if u cant handle me at my worst...', 'rawr means i love u in dinosaur', 'Blink-182 is life', 'Leave me a comment <3', 'Glitter graphics by dolliecrave.com'],
    },

    // --- AOL: keyword bar, blue/white, bright and friendly ---
    { style: 'aol',
      font: "'Arial', 'Helvetica', sans-serif",
      bg: '#e8e8e8', text: '#000000', heading: '#003399', shadow1: '#6699cc', shadow2: '#ffffff',
      bannerBg: '#ffcc00', bannerText: '#000000', stripe1: '#ffcc00', stripe2: '#e6b800',
      marqueeBg: '#003399', marqueeText: '#ffffff', linkColor: '#0033cc', visitedColor: '#663399',
      counterNum: '#003399', counterLabel: '#666666',
      bannerMsg: '\u{1F4E7} AOL | You\'ve Got Mail! | People | Channel | Keyword: [__________] Go!',
      marquees: ['Welcome! You\'ve got mail!', 'Keyword: SHOPPING', 'Chat room: Thirty-Something', 'Buddy List: 5 online', 'File\'s Done!', 'Try AOL Instant Messenger!'],
    },
    { style: 'aol',
      font: "'Verdana', 'Arial', sans-serif",
      bg: '#f0f0f0', text: '#333333', heading: '#0055aa', shadow1: '#88bbdd', shadow2: '#ffffff',
      bannerBg: '#2266bb', bannerText: '#ffffff', stripe1: '#2266bb', stripe2: '#1a55aa',
      marqueeBg: '#ffcc00', marqueeText: '#003399', linkColor: '#0044aa', visitedColor: '#553388',
      counterNum: '#0055aa', counterLabel: '#888888',
      bannerMsg: '\u{1F4E7} America Online 5.0 | Mail | My AOL | Favorites | Internet | Channels',
      marquees: ['Goodbye!', 'A/S/L?', 'BRB getting a snack', 'Keyword: MUSIC', 'You have entered the chat room', 'LOL! ROFL!'],
    },

    // --- More GeoCities variants for variety ---
    { style: 'geocities',
      font: "'Arial Black', sans-serif",
      bg: '#330000', text: '#ff6600', heading: '#ff0000', shadow1: '#ffff00', shadow2: '#ff00ff',
      bannerBg: '#cc0000', bannerText: '#ffff00', stripe1: '#ff0000', stripe2: '#330000',
      marqueeBg: '#660000', marqueeText: '#ff6600', linkColor: '#ff9900', visitedColor: '#ff3333',
      counterNum: '#ff0000', counterLabel: '#ff9900',
      bannerMsg: '\u{1F525} HOT SITE ALERT \u{1F525} You found the coolest page on the web!',
      marquees: ['This page is FIRE!', 'Click here for FREE stuff!', 'Vote for me on TopSites!', 'E-mail me at hotmail.com'],
    },
    { style: 'geocities',
      font: "'Lucida Console', monospace",
      bg: '#2d0033', text: '#ff66cc', heading: '#ff3399', shadow1: '#ffff00', shadow2: '#00ff00',
      bannerBg: '#ff0066', bannerText: '#ffffff', stripe1: '#ff66cc', stripe2: '#1a001f',
      marqueeBg: '#440033', marqueeText: '#ff66cc', linkColor: '#ff99cc', visitedColor: '#cc00ff',
      counterNum: '#ff3399', counterLabel: '#ffcc00',
      bannerMsg: '\u{1F6A7} UNDER CONSTRUCTION \u{1F6A7} Come back soon for updates!',
      marquees: ['Cute page by ~*PrInCeSs*~', 'Dollz by dollpalace.com', 'Glitter text generator', 'Sign my guestbook pretty please!'],
    },
  ];

  // === Background pattern generators ===
  const bgGenerators = {
    geocities: [
      // Starfield
      (bg) => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='${encodeURIComponent(bg)}' width='200' height='200'/%3E%3Ccircle cx='10' cy='15' r='1' fill='white'/%3E%3Ccircle cx='45' cy='80' r='1.5' fill='%23ffffcc'/%3E%3Ccircle cx='90' cy='30' r='1' fill='white'/%3E%3Ccircle cx='130' cy='70' r='0.8' fill='%23ccccff'/%3E%3Ccircle cx='170' cy='20' r='1.2' fill='white'/%3E%3Ccircle cx='25' cy='140' r='1' fill='%23ffffcc'/%3E%3Ccircle cx='60' cy='180' r='0.8' fill='white'/%3E%3Ccircle cx='110' cy='120' r='1.5' fill='%23ccccff'/%3E%3Ccircle cx='150' cy='160' r='1' fill='white'/%3E%3Ccircle cx='185' cy='95' r='1.3' fill='%23ffffcc'/%3E%3C/svg%3E")`,
      // Diagonal lines
      (bg) => `repeating-linear-gradient(45deg, ${bg}, ${bg} 8px, ${bg}cc 8px, ${bg}cc 10px)`,
      // Checkerboard
      (bg) => `repeating-conic-gradient(${bg} 0% 25%, ${bg}88 0% 50%) 0 0 / 20px 20px`,
    ],
    xp: [
      // Bliss-inspired gradient (rolling hills + sky)
      (bg) => `linear-gradient(180deg, #1e90ff 0%, #87ceeb 40%, #87ceeb 45%, #4ca64c 45%, #228b22 55%, #32cd32 70%, #228b22 100%)`,
      // Luna blue gradient
      (bg) => `linear-gradient(180deg, #0052cc 0%, #3a8fd9 30%, #7ab8e8 60%, #b8d9f0 100%)`,
      // Subtle clouds
      (bg) => `radial-gradient(ellipse at 20% 50%, #ffffff44 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #ffffff33 0%, transparent 40%), linear-gradient(180deg, #4a86c8, #6ba3d6, #a0c4e8)`,
    ],
    netscape: [
      // Classic grey
      (bg) => `linear-gradient(180deg, #d4d0c8, #c0c0c0)`,
      // Subtle embossed look
      (bg) => `repeating-linear-gradient(0deg, ${bg} 0px, ${bg} 1px, ${bg}dd 1px, ${bg}dd 2px)`,
      // 90s grey with slight blue
      (bg) => `linear-gradient(180deg, #c8c8d0, ${bg}, #b8b8c0)`,
    ],
    myspace: [
      // Dark grunge
      (bg) => `radial-gradient(circle at 50% 50%, ${bg}ee, #000000)`,
      // Emo gradient
      (bg) => `linear-gradient(180deg, #000000, ${bg}, #000000)`,
      // Dark with subtle pattern
      (bg) => `repeating-linear-gradient(90deg, ${bg} 0px, ${bg} 3px, ${bg}cc 3px, ${bg}cc 4px)`,
    ],
    aol: [
      // Bright friendly gradient
      (bg) => `linear-gradient(180deg, #ddeeff, ${bg}, #ffffff)`,
      // AOL light blue wash
      (bg) => `radial-gradient(ellipse at 50% 0%, #cce5ff, ${bg} 70%)`,
      // Clean white-ish
      (bg) => `linear-gradient(135deg, #f8f8ff, ${bg}, #e8e8f0)`,
    ],
  };

  const imgBorders = [
    '3px ridge #c0c0c0', '4px double #ff00ff', '3px groove #00ffff',
    '4px outset #ffff00', '3px solid #00ff00', '5px ridge #ff6600',
  ];

  const imgBordersClean = [
    '2px solid #003399', '2px solid #0066cc', '1px solid #999999',
    '2px solid #336699', '2px groove #aabbcc',
  ];

  // === Roll the dice ===
  const theme = pick(themes);
  const bgPool = bgGenerators[theme.style] || bgGenerators.geocities;
  const bgPattern = pick(bgPool)(theme.bg);

  // Apply CSS custom properties
  const root = document.documentElement;
  root.style.setProperty('--gc-bg', theme.bg);
  root.style.setProperty('--gc-text', theme.text);
  root.style.setProperty('--gc-heading', theme.heading);
  root.style.setProperty('--gc-shadow1', theme.shadow1);
  root.style.setProperty('--gc-shadow2', theme.shadow2);
  root.style.setProperty('--gc-banner-bg', theme.bannerBg);
  root.style.setProperty('--gc-banner-text', theme.bannerText);
  root.style.setProperty('--gc-stripe1', theme.stripe1);
  root.style.setProperty('--gc-stripe2', theme.stripe2);
  root.style.setProperty('--gc-marquee-bg', theme.marqueeBg);
  root.style.setProperty('--gc-marquee-text', theme.marqueeText);
  root.style.setProperty('--gc-link', theme.linkColor);
  root.style.setProperty('--gc-visited', theme.visitedColor);
  root.style.setProperty('--gc-counter-num', theme.counterNum);
  root.style.setProperty('--gc-counter-label', theme.counterLabel);
  root.style.setProperty('--gc-font', theme.font);
  root.style.setProperty('--gc-bg-pattern', bgPattern);

  document.body.classList.add('geocities-ified');

  // === Banner (style-aware) ===
  const banner = document.createElement('div');
  banner.className = 'geocities-banner gc-style-' + theme.style;
  banner.innerHTML = '<span class="geocities-banner-inner">' + theme.bannerMsg + '</span>';
  document.body.prepend(banner);

  // === Style-specific extra flair injected above the banner ===
  if (theme.style === 'xp') {
    // Title bar that looks like a window
    const titlebar = document.createElement('div');
    titlebar.className = 'gc-theme-extra gc-xp-titlebar';
    titlebar.innerHTML =
      '<span class="gc-xp-title">\u{1F4C1} Internet Explorer</span>' +
      '<span class="gc-xp-buttons">' +
        '<span class="gc-xp-btn gc-xp-min">_</span>' +
        '<span class="gc-xp-btn gc-xp-max">\u25A1</span>' +
        '<span class="gc-xp-btn gc-xp-close">\u2715</span>' +
      '</span>';
    document.body.prepend(titlebar);

    // Address bar
    const addrbar = document.createElement('div');
    addrbar.className = 'gc-theme-extra gc-xp-addressbar';
    addrbar.innerHTML = 'Address: <span class="gc-xp-url">' + window.location.href.substring(0, 60) + '</span> \u{1F50D} Go';
    banner.after(addrbar);
  }

  if (theme.style === 'netscape') {
    // Throbber-style toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'gc-theme-extra gc-ns-toolbar';
    toolbar.innerHTML =
      '<span class="gc-ns-btn">Back</span>' +
      '<span class="gc-ns-btn">Forward</span>' +
      '<span class="gc-ns-btn">Reload</span>' +
      '<span class="gc-ns-btn">Home</span>' +
      '<span class="gc-ns-btn">Search</span>' +
      '<span class="gc-ns-btn">Print</span>' +
      '<span class="gc-ns-throbber">N</span>';
    document.body.prepend(toolbar);
  }

  if (theme.style === 'myspace') {
    // Profile-ish box
    const profile = document.createElement('div');
    profile.className = 'gc-theme-extra gc-ms-profile';
    const names = ['xXx_DarkAngel_xXx', '~*StarGazer*~', 'sk8erboi_2005', 'x_BrokenSoul_x', 'GlitterQueen99', 'MCR_4ever'];
    const moods = ['blah', 'ecstatic', 'melancholy', 'bouncy', 'crunk', 'nostalgic', 'emo'];
    profile.innerHTML =
      '<div class="gc-ms-name">' + pick(names) + '</div>' +
      '<div class="gc-ms-detail">"' + pick(['I\'m not like other people', 'Music is my life', 'Live laugh love', 'It\'s not a phase mom', 'Rawr XD']) + '"</div>' +
      '<div class="gc-ms-detail">Mood: ' + pick(moods) + '</div>' +
      '<div class="gc-ms-detail">Online Now! | Send Message | Add to Friends</div>';
    banner.after(profile);
  }

  if (theme.style === 'aol') {
    // Buddy List sidebar
    const buddy = document.createElement('div');
    buddy.className = 'gc-theme-extra gc-aol-buddies';
    const screennames = ['SmarterChild', 'SkaterDude99', 'KewlGurl88', 'SoccerStar04', 'MovieBuff2001'];
    const onlineCount = 2 + Math.floor(Math.random() * 3);
    const online = screennames.slice(0, onlineCount);
    buddy.innerHTML =
      '<div class="gc-aol-header">Buddy List</div>' +
      '<div class="gc-aol-group">Online (' + onlineCount + ')</div>' +
      online.map(n => '<div class="gc-aol-sn">\u{1F7E2} ' + n + '</div>').join('') +
      '<div class="gc-aol-group">Offline (' + (screennames.length - onlineCount) + ')</div>' +
      screennames.slice(onlineCount).map(n => '<div class="gc-aol-sn" style="opacity:0.5">\u26AA ' + n + '</div>').join('');
    document.body.appendChild(buddy);
  }

  // === Marquee Scrolling Text ===
  const allMarquees = [...theme.marquees];
  allMarquees.push('You are visitor #' + (Math.floor(Math.random() * 99000) + 1000) + '!');
  const marqueeStr = allMarquees.map(m => '\u2605 ' + m + ' ').join('');

  const marquee = document.createElement('div');
  marquee.className = 'geocities-marquee-bar';
  marquee.innerHTML = '<span class="geocities-marquee-text">' + marqueeStr + '\u2605</span>';
  document.body.appendChild(marquee);

  // === Visitor Counter Badge ===
  const counter = document.createElement('div');
  counter.className = 'geocities-counter';
  const count = String(Math.floor(Math.random() * 99000) + 1000).padStart(6, '0');
  counter.innerHTML =
    '<div class="geocities-counter-label">You are visitor #</div>' +
    '<div class="geocities-counter-num">' + count + '</div>';
  document.body.appendChild(counter);

  // === Cursor Sparkle Trail ===
  const sparklesByStyle = {
    geocities: ['\u2728', '\u2B50', '\u2734\uFE0F', '\u{1F31F}', '\u{1F525}', '\u{1F4A5}'],
    xp:        ['\u{1F4A0}', '\u2699\uFE0F', '\u{1F5A5}\uFE0F', '\u{1F4C1}', '\u{1F50D}', '\u2B50'],
    netscape:  ['\u{1F310}', '\u2699\uFE0F', '\u{1F4C4}', '\u2B50', '\u26A1', '\u2728'],
    myspace:   ['\u{1F5A4}', '\u{1F494}', '\u2764\uFE0F', '\u{1F3B5}', '\u{1F3B6}', '\u2728', '\u{1F525}'],
    aol:       ['\u{1F4E7}', '\u{1F4AC}', '\u{1F464}', '\u2B50', '\u{1F4E8}', '\u{1F389}'],
  };
  const sparkles = sparklesByStyle[theme.style] || sparklesByStyle.geocities;
  let lastSparkle = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < 60) return;
    lastSparkle = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'geocities-sparkle';
    sparkle.textContent = pick(sparkles);
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  });

  // === Image borders (cleaner for non-geocities styles) ===
  const borders = (theme.style === 'geocities') ? imgBorders : imgBordersClean;
  const borderStyle = pick(borders);
  document.querySelectorAll('img').forEach((img) => {
    img.style.border = borderStyle;
  });

  // === Rainbow headings (only for geocities & myspace) ===
  if (theme.style === 'geocities' || theme.style === 'myspace') {
    const rainbowPalettes = [
      ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff', '#ff00ff'],
      ['#ff00ff', '#ff0088', '#ff0000', '#ff8800', '#ffff00', '#88ff00', '#00ff00'],
      ['#00ffff', '#00ff88', '#00ff00', '#88ff00', '#ffff00', '#ff8800', '#ff0000'],
      [theme.heading, theme.shadow1, theme.text, theme.bannerBg, theme.marqueeText, theme.linkColor, theme.shadow2],
    ];
    const rainbowColors = pick(rainbowPalettes);

    document.querySelectorAll('h1, h2').forEach((el) => {
      el.setAttribute('data-gc-original', el.textContent);
      const text = el.textContent;
      el.innerHTML = '';
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.color = rainbowColors[i % rainbowColors.length];
        el.appendChild(span);
      });
    });
  }
})();
