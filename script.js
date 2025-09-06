document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeShareButton();
    initializeWishlistButton();
    initializeScreenshots();
    initializeFAB();
    initializeMoreButton();
    initializeRatingBars();
    initializeScrollEffects();
    initializeSimilarApps();
}

function initializeShareButton() {
    document.getElementById("shareBtn").addEventListener("click", async () => {
        const shareData = {
            title: "Gift Royal - Make Instant Earning",
            text: "Check out this amazing rewards app! Turn your spare time into instant rewards.",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                showToast("App shared successfully!");
            } catch (err) {
                if (err.name !== 'AbortError') {
                    fallbackShare(shareData);
                }
            }
        } else {
            fallbackShare(shareData);
        }
    });
}

function initializeShareButton() {
    document.getElementById("shareBtnb").addEventListener("click", async () => {
        const shareData = {
            title: "Gift Royal - Make Instant Earning",
            text: "Check out this amazing rewards app! Turn your spare time into instant rewards.",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                showToast("App shared successfully!");
            } catch (err) {
                if (err.name !== 'AbortError') {
                    fallbackShare(shareData);
                }
            }
        } else {
            fallbackShare(shareData);
        }
    });
}

function fallbackShare(shareData) {
    if (navigator.clipboard) {
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        navigator.clipboard.writeText(shareText)
            .then(() => {
                showToast("Link copied to clipboard!");
            })
            .catch(() => {
                showShareModal(shareData);
            });
    } else {
        showShareModal(shareData);
    }
}

function showShareModal(shareData) {
    const modal = document.getElementById('modal');
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3 style="margin-bottom: 20px; font-size: 20px; font-weight: 700;">Share this app</h3>
            <textarea readonly style="width: 100%; height: 120px; margin-bottom: 20px; padding: 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 14px; resize: none;">${shareText}</textarea>
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button onclick="closeModal()" style="padding: 12px 24px; border: 1px solid var(--border); background: white; border-radius: 8px; cursor: pointer; font-weight: 500;">Cancel</button>
                <button onclick="copyShareText('${shareText.replace(/'/g, '\\\'')}')" style="padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Copy</button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function copyShareText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
        closeModal();
    });
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function initializeWishlistButton() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    let isInWishlist = false;
    
    wishlistBtn.addEventListener('click', function() {
        const icon = this.querySelector('svg path');
        
        if (isInWishlist) {
            icon.setAttribute('d', 'M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z');
            showToast('Removed from wishlist');
            isInWishlist = false;
        } else {
            icon.setAttribute('d', 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z');
            showToast('Added to wishlist');
            isInWishlist = true;
        }
        
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

function initializeScreenshots() {
    document.querySelectorAll('.screenshot-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            showImageModal(imgSrc);
        });
    });
}

function showImageModal(imgSrc) {
    const modal = document.getElementById('modal');
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 90vw; max-height: 90vh; padding: 0; border-radius: 16px; overflow: hidden;">
            <img src="${imgSrc}" style="width: 100%; height: auto; display: block;" alt="Screenshot preview">
        </div>
    `;
    
    modal.classList.add('show');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function initializeFAB() {
    const fab = document.getElementById('fabBtn');
    let isExpanded = false;
    
    fab.addEventListener('click', function() {
        if (!isExpanded) {
            this.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
            `;
            createFABMenu();
            isExpanded = true;
        } else {
            this.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                </svg>
            `;
            removeFABMenu();
            isExpanded = false;
        }
    });
}

function createFABMenu() {
    const fabContainer = document.querySelector('.floating-action');
    const menu = document.createElement('div');
    menu.className = 'fab-menu';
    menu.style.cssText = `
        position: absolute;
        bottom: 70px;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        animation: fabMenuSlide 0.3s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fabMenuSlide {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .fab-menu-item {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .fab-menu-item:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
    
    const menuItems = [
        {
            icon: '<path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7"/>',
            color: '#ea4335',
            action: () => showToast('Feature coming soon!')
        },
        {
            icon: '<path d="M12,2L3.09,8.26L4,9L12,4.14L20,9L20.91,8.26L12,2M21,16V14L20,14.5V9.5L12,5.09L4,9.5V14.5L3,14V16L4,16.5V21H6V12H18V21H20V16.5L21,16Z"/>',
            color: '#34a853',
            action: () => window.scrollTo({top: 0, behavior: 'smooth'})
        },
        {
            icon: '<path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>',
            color: '#ffa000',
            action: () => document.querySelector('.review-summary').scrollIntoView({behavior: 'smooth'})
        }
    ];
    
    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.className = 'fab-menu-item';
        button.style.backgroundColor = item.color;
        button.style.color = 'white';
        button.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">${item.icon}</svg>`;
        button.addEventListener('click', item.action);
        menu.appendChild(button);
    });
    
    fabContainer.appendChild(menu);
}

function removeFABMenu() {
    const menu = document.querySelector('.fab-menu');
    if (menu) {
        menu.style.animation = 'fabMenuSlide 0.2s ease-in reverse';
        setTimeout(() => menu.remove(), 200);
    }
}

function initializeMoreButton() {
    document.getElementById('moreBtn').addEventListener('click', function() {
        const modal = document.getElementById('modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <h3 style="margin-bottom: 24px; font-size: 20px; font-weight: 700;">More Options</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <button onclick="reportApp()" style="padding: 16px; border: 1px solid var(--border); background: white; border-radius: 12px; cursor: pointer; text-align: left; font-weight: 500; transition: all 0.2s ease;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px; color: var(--error);">
                                <path d="M12,2L13.09,8.26L22,9L17.27,13.14L18.18,21.02L12,17.77L5.82,21.02L6.73,13.14L2,9L10.91,8.26L12,2M12,15.4V6.1L11.71,6.86L9.14,7.14L11.71,9.5L11.4,12.1L12,11.75L12.6,12.1L12.29,9.5L14.86,7.14L12.29,6.86L12,6.1V15.4Z"/>
                            </svg>
                            Report this app
                        </div>
                    </button>
                    <button onclick="flagInappropriate()" style="padding: 16px; border: 1px solid var(--border); background: white; border-radius: 12px; cursor: pointer; text-align: left; font-weight: 500; transition: all 0.2s ease;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px; color: var(--warning);">
                                <path d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z"/>
                            </svg>
                            Flag as inappropriate
                        </div>
                    </button>
                    <button onclick="addToCollection()" style="padding: 16px; border: 1px solid var(--border); background: white; border-radius: 12px; cursor: pointer; text-align: left; font-weight: 500; transition: all 0.2s ease;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px; color: var(--primary);">
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                            </svg>
                            Add to collection
                        </div>
                    </button>
                </div>
                <div style="margin-top: 24px; text-align: right;">
                    <button onclick="closeModal()" style="padding: 12px 24px; border: 1px solid var(--border); background: white; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    });
}

function reportApp() {
    closeModal();
    showToast('Report submitted. Thank you for your feedback.');
}

function flagInappropriate() {
    closeModal();
    showToast('Content flagged. We will review this app.');
}

function addToCollection() {
    closeModal();
    showToast('Added to your personal collection!');
}

function initializeRatingBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.width;
                    }, index * 200);
                });
            }
        });
    });
    
    const ratingSection = document.querySelector('.rating-bars');
    if (ratingSection) {
        observer.observe(ratingSection);
    }
}

function initializeScrollEffects() {
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = 'var(--shadow-2)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function initializeSimilarApps() {
    document.querySelectorAll('.similar-app').forEach(app => {
        app.addEventListener('click', function() {
            const appName = this.querySelector('.similar-app-name').textContent;
            showToast(`Opening ${appName}...`);
            
            setTimeout(() => {
                showToast('App not available in this demo');
            }, 1500);
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function reload() {
    if (history.length > 1) {
        history.back();
    } else {
        location.reload();
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

window.addEventListener('beforeunload', function() {
    document.querySelector('.container').style.opacity = '0.5';
});

document.querySelectorAll('button, .download-btn').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);