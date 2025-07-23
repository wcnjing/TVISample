window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s';
    }
});
document.addEventListener('DOMContentLoaded', function() {
  console.log('Creating styled working FAB...');
  
  if (window.innerWidth <= 768) {
    // Remove any existing FAB
    const existing = document.querySelector('.mobile-nav-fab');
    if (existing) existing.remove();
    
    // Create styled working FAB
    const styledHTML = `
      <div class="mobile-nav-fab" style="position: fixed; bottom: 75px; right: 20px; z-index: 9999;">
        <button id="mainBtn" style="
          width: 50px; 
          height: 50px; 
          background: linear-gradient(135deg, #8a7f72, #2a2520); 
          border: none; 
          border-radius: 50%; 
          color: #f7f5f3; 
          box-shadow: 0 8px 25px rgba(42, 37, 32, 0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        ">
          <svg id="mainIcon" viewBox="0 0 24 24" style="width: 24px; height: 24px; stroke: currentColor; fill: none; stroke-width: 2;">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        
        <div id="menuItems" style="
          position: absolute; 
          bottom: 80px; 
          right: 0; 
          display: none;
          flex-direction: column;
          gap: 15px;
        ">
          <button id="homeBtn" style="
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px);
            border: 1px solid rgba(138, 127, 114, 0.1);
            padding: 12px 20px; 
            border-radius: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            color: #2a2520;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;
            white-space: nowrap;
          ">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; stroke: #8a7f72; fill: none; stroke-width: 2;">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            <span>Home</span>
          </button>
          
          <button id="scheduleBtn" style="
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px);
            border: 1px solid rgba(138, 127, 114, 0.1);
            padding: 12px 20px; 
            border-radius: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            color: #2a2520;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;
            white-space: nowrap;
          ">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; stroke: #8a7f72; fill: none; stroke-width: 2;">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>Schedule</span>
          </button>
          
          <button id="rsvpBtn" style="
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px);
            border: 1px solid rgba(138, 127, 114, 0.1);
            padding: 12px 20px; 
            border-radius: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            color: #2a2520;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;
            white-space: nowrap;
          ">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; stroke: #8a7f72; fill: none; stroke-width: 2;">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>RSVP</span>
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', styledHTML);
    
    // Add hover effects
    const buttons = document.querySelectorAll('#menuItems button');
    buttons.forEach(btn => {
      btn.onmouseenter = function() {
        this.style.transform = 'translateX(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(42, 37, 32, 0.2)';
      };
      btn.onmouseleave = function() {
        this.style.transform = 'translateX(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      };
    });
    
    // Main button hover effect
    document.getElementById('mainBtn').onmouseenter = function() {
      this.style.transform = 'scale(1.1)';
    };
    document.getElementById('mainBtn').onmouseleave = function() {
      this.style.transform = 'scale(1)';
    };
    
    // Keep the same working functionality
    document.getElementById('mainBtn').onclick = function() {
      console.log('Main button clicked');
      const menu = document.getElementById('menuItems');
      const icon = document.getElementById('mainIcon');
      
      if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
        this.style.background = 'linear-gradient(135deg, #5d4e37, #3d2f23)';
        icon.innerHTML = `
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        `;
      } else {
        menu.style.display = 'none';
        this.style.background = 'linear-gradient(135deg, #8a7f72, #2a2520)';
        icon.innerHTML = `
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        `;
      }
    };
    
    document.getElementById('homeBtn').onclick = function() {
      console.log('Home button clicked');
      const aboutElement = document.getElementById('home');
      if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: 'smooth' });
      }
      // Close menu
      document.getElementById('mainBtn').click();
    };
    
    document.getElementById('scheduleBtn').onclick = function() {
      console.log('Schedule button clicked');
      const scheduleElement = document.getElementById('schedule');
      if (scheduleElement) {
        scheduleElement.scrollIntoView({ behavior: 'smooth' });
      }
      // Close menu
      document.getElementById('mainBtn').click();
    };
    
    document.getElementById('rsvpBtn').onclick = function() {
      console.log('RSVP button clicked');
      const rsvpElement = document.getElementById('rsvp');
      if (rsvpElement) {
        rsvpElement.scrollIntoView({ behavior: 'smooth' });
      }
      // Close menu
      document.getElementById('mainBtn').click();
    };
    
    console.log('Styled working FAB created');
  }
});