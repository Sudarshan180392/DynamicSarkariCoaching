/**
 * Dynamic Sarkari Coaching - Main Interactive Application
 * Branches: Ludhiana | Jalandhar | Jagraon
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initHeroLeadForm();
  initDailyQuiz();
  initCurrentAffairsTabs();
  initYouTubePlayer();
  initCoursesFilter();
  initFaqAccordion();
  initModals();
  initToolkitDownload();
});

/* -------------------------------------------------------------------------
   1. STICKY HEADER & SCROLL EFFECTS
-------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* -------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
-------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.btn-mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const navLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* -------------------------------------------------------------------------
   3. DAILY SARKARI QUIZ ENGINE (Interactive & Addictive for Aspirants)
-------------------------------------------------------------------------- */
const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Punjab General Knowledge (PPSC / Patwari)",
    question: "Which of the following treaties led to the annexation of Punjab into the British Empire in 1849?",
    options: [
      "Treaty of Lahore (1846)",
      "Treaty of Amritsar (1809)",
      "Treaty of Bhyrowal (1846)",
      "Annexation Proclamation of Lord Dalhousie (1849)"
    ],
    correct: 3,
    explanation: "Following the Second Anglo-Sikh War (1848–49) and the Battle of Gujrat, Lord Dalhousie proclaimed the annexation of Punjab into the British East India Company on 29 March 1849."
  },
  {
    id: 2,
    category: "Indian Polity & Constitution (UPSC / State PCS)",
    question: "Under which Article of the Indian Constitution does the President consult the Supreme Court on questions of law or fact of public importance?",
    options: [
      "Article 129",
      "Article 143",
      "Article 131",
      "Article 136"
    ],
    correct: 1,
    explanation: "Article 143 of the Constitution confers Advisory Jurisdiction upon the Supreme Court, allowing the President to refer any question of law or fact to it for opinion."
  },
  {
    id: 3,
    category: "Quantitative Aptitude & Reasoning (SSC CGL / Banking)",
    question: "A train running at 72 km/h crosses a pole in 9 seconds. What is the length of the train?",
    options: [
      "160 meters",
      "180 meters",
      "200 meters",
      "220 meters"
    ],
    correct: 1,
    explanation: "Speed in m/s = 72 × (5/18) = 20 m/s. Length of train = Speed × Time = 20 m/s × 9 s = 180 meters."
  },
  {
    id: 4,
    category: "Indian Economy & Current Affairs",
    question: "Which institutional mechanism determines the Policy Repo Rate under the Reserve Bank of India Act, 1934?",
    options: [
      "Board for Financial Supervision",
      "Monetary Policy Committee (MPC)",
      "Financial Stability and Development Council",
      "Economic Advisory Council to the PM"
    ],
    correct: 1,
    explanation: "The 6-member Monetary Policy Committee (MPC), headed by the RBI Governor, decides the benchmark interest rates to meet the inflation target of 4% (+/- 2%)."
  },
  {
    id: 5,
    category: "Punjab Geography & Environment",
    question: "The confluence of the Beas and Sutlej rivers takes place at which Ramsar wetland site in Punjab?",
    options: [
      "Kanjli Wetland",
      "Ropar Wetland",
      "Harike Pattan Wetland",
      "Keshopur-Miani Community Reserve"
    ],
    correct: 2,
    explanation: "Harike Pattan, located on the border of Tarn Taran and Ferozepur districts, is Punjab's largest freshwater wetland formed at the confluence of the Beas and Sutlej rivers."
  }
];

function initDailyQuiz() {
  const quizBox = document.getElementById('dailyQuizWidget');
  if (!quizBox) return;

  let currentIdx = 0;
  let score = 0;
  let hasAnswered = false;

  const renderQuestion = () => {
    const q = QUIZ_QUESTIONS[currentIdx];
    hasAnswered = false;

    quizBox.innerHTML = `
      <div class="quiz-header">
        <div>
          <span class="quiz-badge">Daily Sarkari Challenge</span>
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">
            ${q.category}
          </div>
        </div>
        <div class="quiz-counter">Question ${currentIdx + 1} of ${QUIZ_QUESTIONS.length}</div>
      </div>

      <div class="quiz-question-box">
        <h4 class="quiz-question-text">${q.question}</h4>
        <div class="quiz-options-list">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}">
              <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="quiz-explanation-box" id="quizExplanation">
        <div class="quiz-explanation-title">Verified Solution & Key Concept:</div>
        <p class="quiz-explanation-text">${q.explanation}</p>
      </div>

      <div class="quiz-nav-actions">
        <div class="quiz-score-badge">Your Score: ${score} / ${QUIZ_QUESTIONS.length}</div>
        <button class="btn btn-navy btn-sm" id="btnNextQuestion" style="display: none;">
          ${currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : 'Complete Quiz 🎉'}
        </button>
      </div>
    `;

    const optionBtns = quizBox.querySelectorAll('.quiz-option-btn');
    const explBox = quizBox.querySelector('#quizExplanation');
    const nextBtn = quizBox.querySelector('#btnNextQuestion');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (hasAnswered) return;
        hasAnswered = true;

        const selectedIndex = parseInt(btn.getAttribute('data-index'), 10);
        if (selectedIndex === q.correct) {
          btn.classList.add('correct');
          score++;
          const scoreBadge = quizBox.querySelector('.quiz-score-badge');
          if (scoreBadge) scoreBadge.innerText = `Your Score: ${score} / ${QUIZ_QUESTIONS.length}`;
        } else {
          btn.classList.add('wrong');
          // Highlight correct one
          optionBtns[q.correct].classList.add('correct');
        }

        // Disable all options
        optionBtns.forEach(b => b.disabled = true);

        // Show explanation and next button
        explBox.classList.add('visible');
        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      if (currentIdx < QUIZ_QUESTIONS.length - 1) {
        currentIdx++;
        renderQuestion();
      } else {
        renderQuizCompletion();
      }
    });
  };

  const renderQuizCompletion = () => {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    let message = "Excellent work! You have strong grasp over the fundamentals.";
    if (percentage < 60) {
      message = "Good attempt! Regular practice at Dynamic Sarkari Coaching can boost your accuracy.";
    }

    quizBox.innerHTML = `
      <div style="text-align: center; padding: 25px 15px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🏆</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--color-primary); margin-bottom: 8px;">
          Quiz Completed!
        </h3>
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--color-accent); margin-bottom: 8px;">
          You scored ${score} out of ${QUIZ_QUESTIONS.length} (${percentage}%)
        </p>
        <p style="font-size: 0.9375rem; color: var(--color-text-secondary); max-width: 420px; margin: 0 auto 24px auto;">
          ${message}
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" id="btnRestartQuiz">Retake Quiz</button>
          <a href="#heroForm" class="btn btn-navy btn-sm">Join Offline Batch in Ludhiana / Jalandhar / Jagraon</a>
        </div>
      </div>
    `;

    const restartBtn = quizBox.querySelector('#btnRestartQuiz');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        currentIdx = 0;
        score = 0;
        renderQuestion();
      });
    }
  };

  renderQuestion();
}

/* -------------------------------------------------------------------------
   4. CURRENT AFFAIRS TABS (Daily Student Hook)
-------------------------------------------------------------------------- */
const CURRENT_AFFAIRS_DATA = {
  punjab: [
    {
      tag: "Punjab Governance",
      title: "Punjab Cabinet Approves Overhaul of PSSSB & PPSC Recruitment Procedures",
      desc: "Fast-track calendar announced for 12,000+ upcoming state government posts including Patwari, Excise Inspector & Sub-Inspectors."
    },
    {
      tag: "Punjab Agriculture & Economy",
      title: "Crop Diversification Incentive Expanded Across Malwa & Doaba Regions",
      desc: "Special direct benefit transfer incentive introduced for paddy alternative crops with designated MSP guarantees."
    },
    {
      tag: "Heritage & Culture",
      title: "Historical Circuit Connectivity Upgraded Across Amritsar, Anandpur Sahib & Bathinda",
      desc: "New tourism and preservation roadmap released under Punjab Heritage and Tourism Development Board."
    }
  ],
  national: [
    {
      tag: "National Polity",
      title: "Supreme Court Delivers Key Ruling on Centre-State Relations and Federal Grants",
      desc: "Five-judge Constitution Bench clarifies scope of discretionary grants under Article 282 of the Indian Constitution."
    },
    {
      tag: "Science & Tech",
      title: "ISRO Successfully Completes Crucial Vacuum Engine Test for Gaganyaan Crew Module",
      desc: "The milestone test ensures thermal and propulsion safety standards for India's upcoming human spaceflight mission."
    },
    {
      tag: "Environment",
      title: "India Adds 3 New Wetlands to Ramsar List, Total Crosses 85",
      desc: "High biodiversity bird sanctuaries in North & South India recognized under the Ramsar Convention on Wetlands."
    }
  ],
  economy: [
    {
      tag: "Banking & Finance",
      title: "RBI Releases Updated Guidelines on Digital Lending and Cyber Fraud Prevention",
      desc: "Commercial scheduled banks mandated to integrate real-time biometric and two-factor authentication safeguards."
    },
    {
      tag: "Economic Survey",
      title: "India's Tax-to-GDP Ratio Touches 11.7%, Driven by Record Direct Tax Filings",
      desc: "Ministry of Finance data highlights widening tax base and robust compliance across corporate and individual tiers."
    },
    {
      tag: "Trade & Commerce",
      title: "India Signs Landmark Comprehensive Economic Partnership Agreement with Nordic Nations",
      desc: "Zero-tariff access granted for high-tech manufactured goods and pharmaceutical exports."
    }
  ]
};

function initCurrentAffairsTabs() {
  const tabsContainer = document.getElementById('caTabsContainer');
  const itemsContainer = document.getElementById('caItemsList');
  if (!tabsContainer || !itemsContainer) return;

  const renderItems = (category) => {
    const items = CURRENT_AFFAIRS_DATA[category] || CURRENT_AFFAIRS_DATA.punjab;
    itemsContainer.innerHTML = items.map(item => `
      <div class="ca-item">
        <div class="ca-item-tag">${item.tag}</div>
        <h5 class="ca-item-title">${item.title}</h5>
        <p class="ca-item-desc">${item.desc}</p>
      </div>
    `).join('');
  };

  const tabBtns = tabsContainer.querySelectorAll('.ca-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      renderItems(cat);
    });
  });

  // Default render
  renderItems('punjab');
}

/* -------------------------------------------------------------------------
   5. YOUTUBE HUB & VIDEO PLAYLIST INTERACTION
-------------------------------------------------------------------------- */
const YOUTUBE_PLAYLIST = [
  {
    id: "punjab-gk-1",
    title: "Complete Punjab GK 1-Shot Revision for PPSC & Punjab Police SI (High Yield)",
    tag: "Punjab GK Special",
    duration: "20:53",
    videoId: "aS-0UTBWrDw", // Educational YouTube Video embed
    thumb: "assets/images/hero-coaching.jpg"
  },
  {
    id: "upsc-strategy",
    title: "How to Crack Civil Services from Punjab: 1-Year Roadmap by Toppers",
    tag: "Exam Strategy",
    duration: "7:02",
    videoId: "MvvS8HIxapU",
    thumb: "assets/images/faculty-mentor.jpg"
  },
  {
    id: "ssc-math-speed",
    title: "SSC CGL Quantitative Aptitude: Top 25 Vedic Math & Speed Calculation Tricks",
    tag: "SSC & Banking",
    duration: "25:42",
    videoId: "WSArAlaHMKA",
    thumb: "assets/images/library-study.jpg"
  },
  {
    id: "current-affairs-monthly",
    title: "Punjab Economic Survey & Budget 2024-25 Analysis for Naib Tehsildar & Patwari",
    tag: "Current Affairs",
    duration: "23:49",
    videoId: "WZomBd5L3ts",
    thumb: "assets/images/campus-reception.jpg"
  }
];

function initYouTubePlayer() {
  const mainIframe = document.getElementById('mainYtIframe');
  const playlistContainer = document.getElementById('ytPlaylistItems');
  if (!mainIframe || !playlistContainer) return;

  playlistContainer.innerHTML = YOUTUBE_PLAYLIST.map((v, i) => `
    <div class="playlist-video-item ${i === 0 ? 'active' : ''}" data-video-id="${v.videoId}">
      <div class="playlist-thumb">
        <img src="${v.thumb}" alt="${v.title}">
        <span class="playlist-thumb-duration">${v.duration}</span>
      </div>
      <div class="playlist-info">
        <span class="playlist-info-tag">${v.tag}</span>
        <h6 class="playlist-info-title">${v.title}</h6>
      </div>
    </div>
  `).join('');

  const items = playlistContainer.querySelectorAll('.playlist-video-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(it => it.classList.remove('active'));
      item.classList.add('active');
      const vidId = item.getAttribute('data-video-id');
      mainIframe.src = `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1&rel=0`;
    });
  });
}

/* -------------------------------------------------------------------------
   6. COURSES CATALOG FILTER
-------------------------------------------------------------------------- */
function initCoursesFilter() {
  const filterBtns = document.querySelectorAll('.courses-filter-bar .filter-btn');
  const courseCards = document.querySelectorAll('.courses-grid .course-card');

  if (!filterBtns.length || !courseCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   7. FAQ ACCORDION
-------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPanel = item.querySelector('.faq-answer-panel');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const panel = other.querySelector('.faq-answer-panel');
          if (panel) panel.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        answerPanel.style.maxHeight = answerPanel.scrollHeight + 30 + 'px';
      } else {
        item.classList.remove('active');
        answerPanel.style.maxHeight = null;
      }
    });
  });
}

/* -------------------------------------------------------------------------
   8. LEAD FORMS & MODAL FEEDBACK
-------------------------------------------------------------------------- */
function initHeroLeadForm() {
  const form = document.getElementById('heroLeadForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="student_name"]')?.value.trim();
    const phone = form.querySelector('[name="student_phone"]')?.value.trim();
    const exam = form.querySelector('[name="target_exam"]')?.value;
    const branch = form.querySelector('[name="preferred_branch"]')?.value;

    if (!name || !phone || !exam || !branch) {
      alert("Please fill in all details to reserve your free seat.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    // Save lead to localStorage
    const leadData = {
      name,
      phone,
      exam,
      branch,
      timestamp: new Date().toISOString()
    };
    saveLead(leadData);

    // Open Success Modal
    openBookingModal(leadData);
    form.reset();
  });
}

function initToolkitDownload() {
  const toolkitForm = document.getElementById('toolkitDownloadForm');
  if (!toolkitForm) return;

  toolkitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = toolkitForm.querySelector('[name="toolkit_phone"]')?.value.trim();
    const exam = toolkitForm.querySelector('[name="toolkit_exam"]')?.value;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number to receive your PDF link.");
      return;
    }

    saveLead({
      type: "Toolkit Download",
      phone,
      exam,
      timestamp: new Date().toISOString()
    });

    alert(`🎉 Success! Your Free Preparation Toolkit PDF download link has been sent to WhatsApp number: +91 ${phone}`);
    toolkitForm.reset();
  });
}

function saveLead(lead) {
  try {
    const existing = JSON.parse(localStorage.getItem('dynamic_sarkari_leads') || '[]');
    existing.push(lead);
    localStorage.setItem('dynamic_sarkari_leads', JSON.stringify(existing));
    console.log("New Lead Saved:", lead);
  } catch (err) {
    console.error("Storage error:", err);
  }
}

function openBookingModal(lead) {
  const modal = document.getElementById('bookingSuccessModal');
  if (!modal) return;

  const branchAddressMap = {
    ludhiana: "Old Passport Office, Ludhiana, Punjab",
    jalandhar: "Near Bus Stand Jalandhar, Punjab",
    jagraon: "Above Canadian Pizza Jagraon, Punjab",
    online: "Live Online Dynamic Learning Portal"
  };

  const address = branchAddressMap[lead.branch] || "Your Selected Campus";

  document.getElementById('modalStudentName').textContent = lead.name;
  document.getElementById('modalStudentPhone').textContent = `+91 ${lead.phone}`;
  document.getElementById('modalTargetExam').textContent = lead.exam.toUpperCase();
  document.getElementById('modalBranchAddress').textContent = address;
  document.getElementById('modalRefCode').textContent = `DSC-${Math.floor(100000 + Math.random() * 900000)}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* -------------------------------------------------------------------------
   9. GENERAL MODALS DISMISSAL
-------------------------------------------------------------------------- */
function initModals() {
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(modal => {
    const closeBtns = modal.querySelectorAll('.modal-close-btn, .btn-modal-close');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Demo class button trigger across the page
  const demoTriggers = document.querySelectorAll('[data-trigger-demo]');
  demoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const heroForm = document.getElementById('heroLeadForm');
      if (heroForm) {
        heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nameInput = heroForm.querySelector('[name="student_name"]');
        if (nameInput) nameInput.focus();
      }
    });
  });
}
