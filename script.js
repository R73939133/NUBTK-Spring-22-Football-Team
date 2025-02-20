// Sample player data - Replace with your actual player data
const players = [
    {
        name: "Rahul Kumar Ghosh",
        position: "Defender", number: 4,
        image: "image/rahul.png",
        stats: { goals: 15, assists: 8, matches: 20, minutesPlayed: 1800 }
    },
    {
        name: "Raul Jobel Baroi", 
        position: "Midfielder", number: 11,
        image: "image/raul.jpg",
        stats: { goals: 5, assists: 12, matches: 18, minutesPlayed: 1620 }
    },
    {
        name: "Peash Das Rudra",
        position: "Goalkeeper", number: 1, 
        image: "image/rudra.png",
        stats: { goals: 1, assists: 3, matches: 19, minutesPlayed: 1710 }
    },
    {
        name: "Kumar Sajib",
        position: "Midfielder", number: 7,
        image: "/api/placeholder/400/500",
        stats: { cleanSheets: 8, saves: 45, matches: 20, minutesPlayed: 1800 }
    },
    {
        name: "Mrinmoy Mondol",
        position: "Forward", number: 10,
        image: "image/mrinmoy.jpg", 
        stats: { goals: 10, assists: 6, matches: 15, minutesPlayed: 1400 }
    },
    {
        name: "Noyon Ghosh",
        position: "Forward", number: 9,
        image: "image/noyon.jpg",
        stats: { goals: 12, assists: 7, matches: 17, minutesPlayed: 1500 }
    },
    {
        name: "Md Jim Arian",
        position: "Winger", number: 8,
        image: "image/Jim.png",
        stats: { goals: 8, assists: 10, matches: 16, minutesPlayed: 1450 }
    },
    {
        name: "Mark Pulak Das",
        position: "Defender", number: 2,
        image: "image/mark.jpg",
        stats: { goals: 3, assists: 5, matches: 14, minutesPlayed: 1200 }
    },
    {
        name: "Md Nasim Hossain",
        position: "Defender", number: 3,
        image: "image/nasim.jpg",
        stats: { goals: 2, assists: 4, matches: 13, minutesPlayed: 1100 }
    },
    {
        name: "Md Masud",
        position: "Midfielder", number: 5,
        image: "image/masud.jpg",
        stats: { goals: 6, assists: 9, matches: 16, minutesPlayed: 1350 }
    }
];
    

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing...');
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    initializeNavigation();
    renderPlayers(players); // Pass the players array to render all players initially
    initializeContactForm();
    initializeAnimations();
    initializeFilters();
}

// Initialize navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle scroll events for active navigation highlighting
    window.addEventListener('scroll', debounce(() => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Initialize filter and sort controls
function initializeFilters() {
    const positionFilter = document.getElementById('positionFilter');
    const sortSelect = document.getElementById('sortPlayers');

    if (positionFilter) {
        positionFilter.addEventListener('change', (e) => {
            filterPlayersByPosition(e.target.value);
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortPlayers(e.target.value);
        });
    }
}

// Filter players by position
function filterPlayersByPosition(position) {
    console.log('Filtering by position:', position);
    const filteredPlayers = position === 'All' 
        ? players 
        : players.filter(player => player.position === position);
    renderPlayers(filteredPlayers);
}

// Sort players by various criteria
function sortPlayers(criteria) {
    console.log('Sorting by:', criteria);
    const sortedPlayers = [...players].sort((a, b) => {
        switch(criteria) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'number':
                return a.number - b.number;
            case 'goals':
                return (b.stats.goals || 0) - (a.stats.goals || 0);
            default:
                return 0;
        }
    });
    renderPlayers(sortedPlayers);
}

// Render players to the page
function renderPlayers(playersToRender) {
    console.log('Rendering players:', playersToRender.length);
    const playerRoster = document.getElementById('playerRoster');
    
    if (!playerRoster) {
        console.error('Player roster element not found!');
        return;
    }

    playerRoster.innerHTML = ''; // Clear existing players

    playersToRender.forEach(player => {
        const playerCard = createPlayerCard(player);
        playerRoster.appendChild(playerCard);
    });
}

// Create individual player card
function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    
    const matchesPlayed = player.stats.matches;
    const minutesPerMatch = (player.stats.minutesPlayed / matchesPlayed).toFixed(0);
    
    card.innerHTML = `
        <div class="player-image-container">
            <img src="${player.image}" alt="${player.name}" class="player-image">
        </div>
        <div class="player-info">
            <h3>${player.name}</h3>
            <div class="player-details">
                <p class="position">${player.position}</p>
                <p class="number">#${player.number}</p>
            </div>
            <div class="player-stats">
                <div class="stat-item">
                    <span>Matches</span>
                    <span>${matchesPlayed}</span>
                </div>
                ${player.position === 'Goalkeeper' ? `
                    <div class="stat-item">
                        <span>Clean Sheets</span>
                        <span>${player.stats.cleanSheets}</span>
                    </div>
                    <div class="stat-item">
                        <span>Saves</span>
                        <span>${player.stats.saves}</span>
                    </div>
                ` : `
                    <div class="stat-item">
                        <span>Goals</span>
                        <span>${player.stats.goals}</span>
                    </div>
                    <div class="stat-item">
                        <span>Assists</span>
                        <span>${player.stats.assists}</span>
                    </div>
                `}
                <div class="stat-item">
                    <span>Avg. Minutes</span>
                    <span>${minutesPerMatch}</span>
                </div>
            </div>
        </div>
    `;

    // Add click event for player details modal
    card.addEventListener('click', () => {
        showPlayerDetails(player);
    });

    return card;
}

// Show player details in a modal
function showPlayerDetails(player) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="player-detail-view">
                <div class="player-image-large">
                    <img src="${player.image}" alt="${player.name}">
                </div>
                <div class="player-info-detailed">
                    <h2>${player.name}</h2>
                    <div class="player-info-grid">
                        <div class="info-item">
                            <span class="label">Position</span>
                            <span class="value">${player.position}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Number</span>
                            <span class="value">#${player.number}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Matches Played</span>
                            <span class="value">${player.stats.matches}</span>
                        </div>
                        ${Object.entries(player.stats)
                            .filter(([key]) => !['matches', 'minutesPlayed'].includes(key))
                            .map(([key, value]) => `
                                <div class="info-item">
                                    <span class="label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                    <span class="value">${value}</span>
                                </div>
                            `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.appendChild(modal);

    // Add close functionality
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Initialize animations using Intersection Observer
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements that should be animated
    document.querySelectorAll('.player-card, .jersey-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Utility function to show notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const container = document.getElementById('notificationContainer') || document.body;
    container.appendChild(notification);

    // Remove notification after delay
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility function to debounce function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add mobile menu toggle functionality if needed
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

// Export functions for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterPlayersByPosition,
        sortPlayers,
        showPlayerDetails
    };
}