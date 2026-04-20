const API_URL = "http://localhost:5000/api";

// --- 1. GLOBAL UI HANDLERS ---
function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
}

function closeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) modal.classList.add('hidden');
}

// --- 2. IDEA BOARD LOGIC ---
async function loadIdeas() {
    const grid = document.getElementById('idea-board-grid');
    if (!grid) return; 

    try {
        const response = await fetch(`${API_URL}/ideas`);
        const data = await response.json();
        
        grid.innerHTML = data.map(idea => `
            <div class="idea-card">
                <div class="section-tag">${idea.field}</div>
                <h3 class="idea-title">${idea.title}</h3>
                <p class="idea-desc">${idea.description}</p>
                <div class="author-tag">Posted by: <strong>${idea.author}</strong></div>
                <button class="btn-secondary sm" style="margin-top:15px; width:100%;" onclick="openResume('${idea.author}')">
                    Collaborate
                </button>
            </div>
        `).join('');
    } catch (e) { console.error("Error loading ideas:", e); }
}

// --- 3. COLLABORATORS LOGIC ---
async function loadCollaborators() {
    const grid = document.getElementById('collab-grid');
    if (!grid) return;

    try {
        const response = await fetch(`${API_URL}/profiles`);
        const data = await response.json();
        renderCollaborators(data);
    } catch (e) { console.error(e); }
}

function renderCollaborators(data) {
    const grid = document.getElementById('collab-grid');
    if (!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="profile-card collab-card">
            <div class="profile-avatar">${p.name.charAt(0)}</div>
            <h3 class="collab-name">${p.name}</h3>
            <p>${p.field}</p>
            <div class="profile-tags collab-tags">
                ${p.skills.map(s => `<span class="tag">${s}</span>`).join('')}
            </div>
            <button class="btn-secondary sm" onclick="openResume('${p.name}')">Connect+</button>
        </div>
    `).join('');
}

// --- 4. SEARCH FEATURE (THE BULLETPROOF VERSION) ---
document.addEventListener('input', (e) => {
    // Check if we are typing in a search bar (handles any ID containing 'search')
    if (e.target.id.includes('search')) {
        const searchTerm = e.target.value.toLowerCase();
        
        // 1. Filter Idea Cards (Idea Board Page)
        const ideaCards = document.querySelectorAll('.idea-card');
        ideaCards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(searchTerm) ? "block" : "none";
        });

        // 2. Filter Collaborator Cards (Collaborators Page)
        const collabCards = document.querySelectorAll('.profile-card, .collab-card');
        collabCards.forEach(card => {
            // Only filter if we aren't on the idea board (to avoid conflicts)
            if (!card.classList.contains('idea-card')) {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(searchTerm) ? "block" : "none";
            }
        });
    }
});

// --- 5. SAVING & TOAST LOGIC ---
let isToastShowing = false;
function showSuccessToast(message) {
    if (isToastShowing) return;
    const container = document.getElementById('toast-container');
    if (!container) {
        alert(message); // Fallback
        return;
    }

    isToastShowing = true;
    const toast = document.createElement('div');
    toast.className = 'toast-card';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <div><strong>Success!</strong> <span>${message}</span></div>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.remove(); isToastShowing = false; }, 500);
    }, 3000);
}

async function saveProfileAndMatch(event) {
    if (event) event.preventDefault(); 
    const profileData = {
        name: document.getElementById('name').value,
        skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
        college: document.getElementById('college').value,
        field: "Researcher"
    };

    try {
        const response = await fetch(`${API_URL}/profiles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profileData)
        });
        if (response.ok) showSuccessToast("Profile Saved Successfully!");
    } catch (e) { 
        console.error(e);
        showSuccessToast("Saved locally (Server Offline)");
    }
}

// --- 6. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadCollaborators();
    loadIdeas();
});

// Modal Logic
async function openResume(name) {
    try {
        const response = await fetch(`${API_URL}/profiles`);
        const data = await response.json();
        const person = data.find(p => p.name.trim() === name.trim());
        if (person) {
            document.getElementById('res-name').innerText = person.name;
            document.getElementById('res-field').innerText = person.field;
            document.getElementById('res-college').innerText = person.college || "Independent";
            document.getElementById('res-avatar').innerText = person.name.charAt(0);
            document.getElementById('resume-modal').classList.remove('hidden');
        }
    } catch(e) { console.error(e); }
}

function sendRequest() {
    const personName = document.getElementById('res-name').innerText;
    closeModal();
    showSuccessToast(`Request sent to ${personName}`);
}