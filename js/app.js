/**
 * Learning Companion Agent (LCA) - Vanilla JS MVP
 * Handles routing and state management.
 */

// Simple State Store
const state = {
    user: null, // { name, skills: { known: [], wanted: [] } }
    view: 'login' // 'login', 'onboarding', 'matching', 'discover'
};

// Router
function navigateTo(viewName) {
    console.log(`Navigating to ${viewName}`);
    state.view = viewName;
    render();
}

// Components
const components = {
    login: () => `
        <div class="glass-panel fade-in" style="max-width: 400px; margin: 4rem auto; text-align: center;">
            <div style="margin-bottom: 2rem;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--accent-primary), #a78bfa); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                    <span class="material-symbols-rounded" style="font-size: 32px; color: white;">group_add</span>
                </div>
                <h1 style="margin-top: 1rem;">Skill-Swap</h1>
                <p style="color: var(--text-secondary);">Connect. Teach. Learn.</p>
            </div>
            <form id="login-form" style="text-align: left;">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">Username</label>
                    <input type="text" id="username" placeholder="@username" 
                        style="width: 100%; padding: 0.75rem; border-radius: 8px; border: var(--glass-border); background: rgba(0,0,0,0.2); color: white; outline: none;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">Password</label>
                    <input type="password" placeholder="••••••••" 
                        style="width: 100%; padding: 0.75rem; border-radius: 8px; border: var(--glass-border); background: rgba(0,0,0,0.2); color: white; outline: none;">
                </div>
                <button type="submit" class="btn" style="width: 100%;">Enter World</button>
            </form>
            <p style="margin-top: 1.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                New here? <a href="#" style="color: var(--accent-primary);">Join the community</a>
            </p>
        </div>
    `,
    onboarding: () => `
        <div class="fade-in" style="max-width: 800px; margin: 2rem auto;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2>Build Your Profile</h2>
                <p style="color: var(--text-secondary);">Tell us what you know and what you want to learn.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- Skills I Know -->
                <div class="glass-panel" style="border-top: 4px solid #10b981;">
                    <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span class="material-symbols-rounded" style="color: #10b981;">school</span>
                        I Can Teach
                    </h3>
                    <div style="margin-bottom: 1rem;">
                        <input type="text" id="input-teach" placeholder="Add skill (e.g. Python)..." 
                            style="width: 100%; padding: 0.5rem; border-radius: 6px; border: var(--glass-border); background: rgba(0,0,0,0.2); color: white; outline: none;">
                    </div>
                    <div id="list-teach" style="min-height: 150px; display: flex; flex-wrap: wrap; gap: 0.5rem; align-content: flex-start;">
                        <!-- Tags injected here -->
                        <span class="tag" style="background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem;">
                            JavaScript <span style="margin-left: 0.25rem; cursor: pointer; opacity: 0.7;">×</span>
                        </span>
                    </div>
                </div>

                <!-- Skills I Want -->
                <div class="glass-panel" style="border-top: 4px solid #f59e0b;">
                     <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span class="material-symbols-rounded" style="color: #f59e0b;">lightbulb</span>
                        I Want to Learn
                    </h3>
                    <div style="margin-bottom: 1rem;">
                        <input type="text" id="input-learn" placeholder="Add skill (e.g. Piano)..." 
                            style="width: 100%; padding: 0.5rem; border-radius: 6px; border: var(--glass-border); background: rgba(0,0,0,0.2); color: white; outline: none;">
                    </div>
                    <div id="list-learn" style="min-height: 150px; display: flex; flex-wrap: wrap; gap: 0.5rem; align-content: flex-start;">
                         <!-- Tags injected here -->
                    </div>
                </div>
            </div>

            <div style="margin-top: 2rem; text-align: right;">
                 <button class="btn" onclick="app.finishProfile()" style="padding: 1rem 3rem;">Start Matching →</button>
            </div>
        </div>
    `,
    matching: () => {
        const matches = [
            { name: 'Sarah', teach: ['Design', 'Figma'], learn: ['Python'], color: '#f472b6' },
            { name: 'Alex', teach: ['React', 'JS'], learn: ['Design'], color: '#3b82f6' },
            { name: 'David', teach: ['Piano'], learn: ['Spanish'], color: '#10b981' }
        ];
        const current = matches[state.matchIndex || 0];

        if (!current) return `
            <div class="fade-in" style="text-align: center; margin-top: 4rem;">
                <div style="font-size: 64px; margin-bottom: 1rem;">🎉</div>
                <h1>All Caught Up!</h1>
                <p style="color: var(--text-secondary);">Check back later for more potential swaps.</p>
                <button class="btn" onclick="app.navigateTo('discover')" style="margin-top: 2rem; background: transparent; border: 1px solid rgba(255,255,255,0.2);">Explore Community</button>
            </div>
        `;

        return `
            <div class="fade-in" style="display: flex; flex-direction: column; align-items: center; height: 100%;">
                <h2 style="margin: 2rem 0 1rem;">Find Your Swap</h2>
                
                <!-- Card -->
                <div class="glass-panel" style="width: 100%; max-width: 360px; padding: 0; overflow: hidden; position: relative; height: 500px; display: flex; flex-direction: column;">
                    
                    <!-- Avatar Area -->
                    <div style="height: 60%; background: ${current.color}; display: flex; align-items: flex-end; padding: 1.5rem; position: relative;">
                        <div style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); position: absolute; bottom: 0; left: 0; right: 0; height: 50%;"></div>
                        <div style="position: relative; z-index: 2; width: 100%;">
                            <h1 style="margin: 0; font-size: 2rem;">${current.name}</h1>
                            <p style="opacity: 0.9;">Wants to learn <b>${current.learn[0]}</b></p>
                        </div>
                    </div>

                    <!-- Details -->
                    <div style="padding: 1.5rem; flex: 1; background: rgba(30, 41, 59, 0.9);">
                        <div style="margin-bottom: 1rem;">
                            <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.05em;">Can Teach You</label>
                            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">
                                ${current.teach.map(t => `
                                    <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; border: 1px solid rgba(16, 185, 129, 0.3);">${t}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Actions Overlay -->
                    <div style="padding: 1.5rem; display: flex; justify-content: space-around; padding-bottom: 2rem; background: rgba(30, 41, 59, 0.9);">
                        <button onclick="app.swipe('left')" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #ef4444; background: transparent; color: #ef4444; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                            <span class="material-symbols-rounded">close</span>
                        </button>
                        <button onclick="app.swipe('right')" style="width: 60px; height: 60px; border-radius: 50%; border: none; background: #10b981; color: white; font-size: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); transition: all 0.2s;">
                            <span class="material-symbols-rounded">favorite</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    discover: () => `
        <div class="fade-in" style="text-align: center; margin-top: 4rem;">
            <h1>Discovery Mode</h1>
            <p>Expanding the circle...</p>
            <button class="btn" onclick="app.navigateTo('login')" style="margin-top: 1rem;">Logout</button>
        </div>
    `
};

// Logic Helpers
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    if (username) {
        state.user = { name: username, skills: { known: ['JavaScript'], wanted: [] } };
        navigateTo('onboarding');
    }
}

// Main Render Function
function render() {
    const appContainer = document.getElementById('view-container');
    if (appContainer) { // Guard clause
        // Execute the component function to get the HTML string
        if (typeof components[state.view] === 'function') {
            appContainer.innerHTML = components[state.view]();
        } else {
            console.error(`View '${state.view}' not found in components.`);
            return;
        }

        // Attach Listeners
        if (state.view === 'login') {
            const loginForm = document.getElementById('login-form');
            if (loginForm) loginForm.addEventListener('submit', handleLogin);
        }

        if (state.view === 'onboarding') {
            const inputLearn = document.getElementById('input-learn');
            if (inputLearn) {
                inputLearn.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const tag = document.createElement('span');
                        tag.className = 'tag';
                        tag.style = "background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; color: #fbbf24;";
                        tag.innerHTML = `${inputLearn.value} <span style="margin-left: 0.25rem; cursor: pointer; opacity: 0.7;">×</span>`;
                        document.getElementById('list-learn').appendChild(tag);
                        inputLearn.value = '';
                    }
                });
            }

            const inputTeach = document.getElementById('input-teach');
            if (inputTeach) {
                inputTeach.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const tag = document.createElement('span');
                        tag.className = 'tag';
                        tag.style = "background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; color: #10b981;"; // Green style
                        tag.innerHTML = `${inputTeach.value} <span style="margin-left: 0.25rem; cursor: pointer; opacity: 0.7;">×</span>`;
                        document.getElementById('list-teach').appendChild(tag);
                        inputTeach.value = '';
                    }
                });
            }
        }
    }
}

window.app = {
    finishProfile: () => {
        state.matchIndex = 0;
        navigateTo('matching');
    },
    swipe: (direction) => {
        console.log(`Swiped ${direction}`);
        state.matchIndex = (state.matchIndex || 0) + 1;
        render(); // Re-render to show next card
    },
    navigateTo,
    state
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    render();
});
