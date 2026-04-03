
// Check if user is logged in
function checkAuth() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        return true;
    }
    return false;
}

// Get current logged in user
function getCurrentUser() {
    // Since we can't use localStorage, we'll use a global variable
    return window.currentUser || null;
}

// Set current user
function setCurrentUser(user) {
    window.currentUser = user;
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // NEW PHP LOGIN
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.text())
    .then(data => {
        if (data === "success") {
            showNotification('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showNotification('Invalid email or password!', 'error');
        }
    });

    return; // stops old code
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();

    console.log("Register function triggered"); // ✅ DEBUG

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    fetch("register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=" + encodeURIComponent(fullName) +
              "&email=" + encodeURIComponent(email) +
              "&password=" + encodeURIComponent(password)
    })
    .then(res => res.text())
    .then(data => {
        console.log("Server response:", data); // ✅ DEBUG

        if (data === "success") {
            alert("Registered successfully");
            window.location.href = "login.html";
        } else if (data === "exists") {
            alert("User already exists");
        } else {
            alert("Error: " + data);
        }
    })
    .catch(err => {
        console.log(err);
        alert("Server error");
    });
}
// Logout function
function logout() {
    window.currentUser = null;
    window.location.href = 'login.html';
}

// Show notification
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #39ff14, #00ff41)' : 'linear-gradient(135deg, #ff0040, #ff0055)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

