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
    discover: () => {
        // Mock Community Data
        const community = [
            { name: 'Elena', role: 'Designer', teach: ['UI/UX'], learn: ['React'], color: '#f472b6' },
            { name: 'Marcus', role: 'Developer', teach: ['Node.js'], learn: ['Piano'], color: '#3b82f6' },
            { name: 'Priya', role: 'Musician', teach: ['Violin'], learn: ['French'], color: '#10b981' },
            { name: 'Chen', role: 'Artist', teach: ['Drawing'], learn: ['Marketing'], color: '#f59e0b' },
            { name: 'Sarah', role: 'Engineer', teach: ['Python'], learn: ['Design'], color: '#ef4444' }, // Part of circle
            { name: 'David', role: 'Teacher', teach: ['Spanish'], learn: ['Python'], color: '#8b5cf6' }  // Part of circle
        ];

        return `
            <div class="fade-in" style="padding-bottom: 4rem;">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <h1>Explore Community</h1>
                    <p style="color: var(--text-secondary);">Find swap partners beyond your direct matches.</p>
                    <button class="btn" onclick="app.simulateCircleSwap()" style="margin-top: 1.5rem; background: linear-gradient(135deg, #a855f7, #ec4899); border: none;">
                        <span class="material-symbols-rounded" style="vertical-align: middle; margin-right: 0.5rem;">autorenew</span>
                        Simulate 3-Way Swap
                    </button>
                </div>

                <!-- 3-Way Overlay (Hidden by default) -->
                <div id="circle-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 100; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(8px);">
                    <h2 style="margin-bottom: 2rem; color: #a855f7;">✨ Circle Swap Found! ✨</h2>
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                        <!-- You -->
                        <div style="text-align: center;">
                            <div style="width: 80px; height: 80px; background: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 4px solid #a855f7;">YOU</div>
                            <p style="color: var(--text-secondary);">Teach: JS</p>
                        </div>
                        <span class="material-symbols-rounded" style="color: white; font-size: 32px;">arrow_forward</span>
                        
                        <!-- Alex -->
                        <div style="text-align: center;">
                             <div style="width: 80px; height: 80px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">Alex</div>
                             <p style="color: var(--text-secondary);">Teach: Design</p>
                        </div>
                         <span class="material-symbols-rounded" style="color: white; font-size: 32px;">arrow_forward</span>

                        <!-- Sarah -->
                        <div style="text-align: center;">
                             <div style="width: 80px; height: 80px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">Sarah</div>
                             <p style="color: var(--text-secondary);">Teach: Python</p>
                        </div>
                         <span class="material-symbols-rounded" style="color: white; font-size: 32px;">arrow_forward</span>

                        <!-- Back to You -->
                         <div style="text-align: center; opacity: 0.5;">
                            <div style="width: 60px; height: 60px; background: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 2px dashed #a855f7;">YOU</div>
                            <p style="font-size: 0.875rem;">Learn: Python</p>
                        </div>
                    </div>
                    <button class="btn" onclick="document.getElementById('circle-overlay').style.display='none'" style="margin-top: 3rem;">Close Simulation</button>
                </div>

                <!-- Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem;">
                    ${community.map(u => `
                        <div class="glass-panel" style="padding: 1.5rem; text-align: center; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                            <div style="width: 60px; height: 60px; background: ${u.color}; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">${u.name[0]}</div>
                            <h3 style="margin-bottom: 0.25rem;">${u.name}</h3>
                            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">${u.role}</p>
                            <div style="display: flex; gap: 0.5rem; justify-content: center;">
                                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.1); padding: 0.25rem 0.5rem; border-radius: 4px;">Teaches ${u.teach[0]}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                 <div style="text-align: center; margin-top: 4rem;">
                     <button class="btn" onclick="app.navigateTo('login')" style="background: transparent; border: 1px solid rgba(255,255,255,0.2);">Logout</button>
                 </div>
            </div>
        `;
    }

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
                        tag.innerHTML = `${inputLearn.value} <span style="margin-left: 0.25rem; cursor: pointer; opacity: 0.7;" onclick="this.parentElement.remove()">×</span>`;
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
                        tag.innerHTML = `${inputTeach.value} <span style="margin-left: 0.25rem; cursor: pointer; opacity: 0.7;" onclick="this.parentElement.remove()">×</span>`;
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
    simulateCircleSwap: () => {
        const overlay = document.getElementById('circle-overlay');
        if (overlay) overlay.style.display = 'flex';
    },
    navigateTo,
    state
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    render();
});
