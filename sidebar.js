// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('ai-chat-sidebar');
    const body = document.body;
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        body.classList.remove('sidebar-open');
    } else {
        sidebar.classList.add('open');
        body.classList.add('sidebar-open');
    }
}

// Initialize sidebar state
document.addEventListener('DOMContentLoaded', () => {
   // const sidebar = document.getElementById('ai-chat-sidebar');
    //if (sidebar) {
        // Add toggle button if it doesn't exist
        if (!document.getElementById('sidebar-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'sidebar-toggle';
            toggleBtn.innerHTML = '💬';
            toggleBtn.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 2147483646;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #007bff;
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            toggleBtn.addEventListener('click', toggleSidebar);
            document.body.appendChild(toggleBtn);
        }
    //}
}); 