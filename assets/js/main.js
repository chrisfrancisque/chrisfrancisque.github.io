// ===== Reduced motion preference =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Dark Mode Toggle =====
// Theme is set pre-paint by the inline script in <head>; here we wire the button + persistence.
const themeToggle = document.getElementById('theme-toggle');

function applyThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    // Moon when in light mode (click to go dark), sun when in dark mode (click to go light)
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

applyThemeIcon(document.documentElement.getAttribute('data-theme') || 'light');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        applyThemeIcon(next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) { /* localStorage unavailable */ }
    });
}

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth scroll for anchor links =====
function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScrollTo(this.getAttribute('href'));
    });
});

// ===== Section fade-in =====
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// ===== Scroll reveal for timeline items + project cards (staggered) =====
const revealTargets = document.querySelectorAll('.timeline-item, .project-card');
revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
});

if (prefersReducedMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Interactive Terminal =====
(function initTerminal() {
    const terminal = document.getElementById('terminal');
    const body = document.getElementById('terminal-body');
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    if (!terminal || !output || !input) return;

    const RESUME_PATH = 'assets/files/resume.pdf';

    function el(text, className) {
        const div = document.createElement('div');
        div.className = 'terminal-line' + (className ? ' ' + className : '');
        div.textContent = text;
        return div;
    }

    function print(line) {
        output.appendChild(line);
        body.scrollTop = body.scrollHeight;
    }

    function printText(text, className) {
        print(el(text, className));
    }

    function printLines(lines) {
        lines.forEach(([text, cls]) => printText(text, cls));
    }

    function echoCommand(cmd) {
        const div = document.createElement('div');
        div.className = 'terminal-line';
        const prompt = document.createElement('span');
        prompt.className = 't-prompt';
        prompt.textContent = 'chris@portfolio:~$ ';
        const c = document.createElement('span');
        c.className = 't-cmd';
        c.textContent = cmd;
        div.appendChild(prompt);
        div.appendChild(c);
        print(div);
    }

    const commands = {
        help() {
            printLines([
                ['Available commands:', 't-accent'],
                ['  about       who I am', null],
                ['  experience  where I\'ve worked', null],
                ['  projects    what I\'ve built', null],
                ['  skills      my tech stack', null],
                ['  contact     how to reach me', null],
                ['  resume      open my resume (PDF)', null],
                ['  whoami      quick summary', null],
                ['  clear       clear the screen', null]
            ]);
        },
        about() {
            printText('AI/ML Engineer & PM. CS master\'s @ UPenn. I build grounded AI systems end-to-end.', 't-success');
            printText('Scrolling to About…', 't-muted');
            smoothScrollTo('#about');
        },
        experience() {
            printText('Pegasystems → General Dynamics → Brandeis → Raytheon.', 't-success');
            printText('Scrolling to Experience…', 't-muted');
            smoothScrollTo('#experience');
        },
        projects() {
            printText('Self-Driving Toy Car, PEFT Study, Aircraft 6-DOF Simulation.', 't-success');
            printText('Scrolling to Projects…', 't-muted');
            smoothScrollTo('#projects');
        },
        skills() {
            printText('Python · C++ · PyTorch · Transformers · RAG · GCP · AWS · Docker', 't-success');
            printText('Scrolling to Skills…', 't-muted');
            smoothScrollTo('#skills');
        },
        contact() {
            printLines([
                ['email:    chrisfrancisque1@gmail.com', 't-key'],
                ['upenn:    chrisfra@seas.upenn.edu', 't-key'],
                ['linkedin: /in/christopherfrancisque', 't-key'],
                ['github:   /chrisfrancisque', 't-key']
            ]);
            smoothScrollTo('#contact');
        },
        resume() {
            printText('Opening resume.pdf…', 't-success');
            window.open(RESUME_PATH, '_blank');
        },
        whoami() {
            printText('christopher_francisque: builder of AI systems, U.S. citizen, Active Secret clearance.', 't-accent');
        },
        sudo() {
            printText('Nice try. You already have root here. :)', 't-error');
        },
        clear() {
            output.innerHTML = '';
        }
    };

    function run(raw) {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;
        echoCommand(raw.trim());

        // aliases
        const alias = { exp: 'experience', ls: 'projects', '?': 'help', cls: 'clear', cv: 'resume' };
        const name = alias[cmd] || cmd;

        if (commands[name]) {
            commands[name]();
        } else {
            printText(`command not found: ${cmd}. Type 'help' to see options.`, 't-error');
        }
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            run(input.value);
            input.value = '';
        }
    });

    // Focus input when the terminal area is clicked
    body.addEventListener('click', () => input.focus());

    // ----- Boot sequence -----
    const bootLines = [
        ['Welcome to Chris\'s portfolio terminal.', 't-accent'],
        ['Type a command to explore, or scroll the old-fashioned way.', 't-muted']
    ];

    function typeLine(text, className, done) {
        const line = el('', className);
        print(line);
        let i = 0;
        (function tick() {
            if (i <= text.length) {
                line.textContent = text.slice(0, i);
                body.scrollTop = body.scrollHeight;
                i++;
                setTimeout(tick, 18);
            } else if (done) {
                done();
            }
        })();
    }

    function boot() {
        if (prefersReducedMotion) {
            bootLines.forEach(([t, c]) => printText(t, c));
            printText("Type 'help' to get started.", 't-success');
            return;
        }
        let idx = 0;
        (function next() {
            if (idx < bootLines.length) {
                const [t, c] = bootLines[idx++];
                typeLine(t, c, next);
            } else {
                printText("Type 'help' to get started.", 't-success');
            }
        })();
    }

    window.addEventListener('load', () => {
        setTimeout(boot, 400);
    });
})();
