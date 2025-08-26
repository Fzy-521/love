let clickCount = 0;
const maxClicks = 6;

// 不同阶段的图片URLs
const images = [
    "./images/1.png",
    "./images/2.png",
    "./images/3.png",
    "./images/4.png",
    "./images/5.png",
    "./images/6.png",
    "./images/7.png"
];

// 不同阶段的表白文字
const confessionTexts = [
    "亲爱的，你愿意做我的女朋友吗？💕",
    "别害羞嘛，考虑考虑？🥺",
    "我真的很喜欢你，给个机会好不好？💝",
    "我会对你很好的，真的！🌹",
    "求求你了，就答应我吧！🙏",
    "你看，连按钮都在帮我！😊",
    "这是命运的安排！💫"
];

function clickNo() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const confessionText = document.getElementById('confessionText');
    const loveImage = document.getElementById('loveImage');
    
    clickCount++;
    
    if (clickCount <= maxClicks) {
        // 更新图片
        loveImage.src = images[clickCount % images.length];
        
        // 更新文字
        confessionText.textContent = confessionTexts[clickCount % confessionTexts.length];
        
        // 增大愿意按钮的大小
        const newScale = 1 + (clickCount * 0.2);
        yesBtn.style.transform = `scale(${newScale})`;
        yesBtn.style.zIndex = '10';
        
        // 缩小不愿意按钮
        const noScale = Math.max(0.1, 1 - (clickCount * 0.15));
        noBtn.style.transform = `scale(${noScale})`;
        
        // 移动不愿意按钮位置（确保不遮挡愿意按钮）
        const movePatterns = [
            { x: 0, y: 0 },       // 第1次：原位置
            { x: 60, y: 0 },      // 第2次：右移60px
            { x: 100, y: 0 },     // 第3次：右移100px
            { x: 40, y: 80 },     // 第4次：右下移动
            { x: 80, y: 100 },    // 第5次：右下角更远
            { x: 120, y: 120 }    // 第6次：右下角最远
        ];
        
        // 使用clickCount-1作为索引，因为clickCount从1开始
        const patternIndex = Math.min(clickCount - 1, movePatterns.length - 1);
        const pattern = movePatterns[patternIndex];
        
        noBtn.style.position = 'relative';
        noBtn.style.left = pattern.x + 'px';
        noBtn.style.top = pattern.y + 'px';
        
        // 确保按钮不会超出屏幕右边界
        setTimeout(() => {
            const btnRect = noBtn.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            if (btnRect.right > windowWidth - 20) {
                // 如果超出右边界，向左调整
                const adjustment = btnRect.right - windowWidth + 40;
                noBtn.style.left = (pattern.x - adjustment) + 'px';
            }
        }, 50);
        
        // 如果点击次数达到最大值，隐藏不愿意按钮
        if (clickCount >= maxClicks) {
            noBtn.style.display = 'none';
            confessionText.textContent = "你别无选择了，只能选择我啦！😏💕";
        }
        
        // 添加一些特效
        createHeartsWithMusic();
    }
}

function clickYes() {
    const container = document.querySelector('.container');
    const successMessage = document.getElementById('successMessage');
    const buttonsContainer = document.querySelector('.buttons-container');
    const confessionText = document.getElementById('confessionText');
    const loveImage = document.getElementById('loveImage');
    
    // 隐藏按钮
    buttonsContainer.style.display = 'none';
    
    // 更新内容
    confessionText.textContent = "太好了！我就知道你也喜欢我！";
    confessionText.style.color = '#ff6b9d';
    
    // 显示成功消息
    successMessage.style.display = 'block';
    
    // 更换成功图片
    loveImage.src = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop&crop=faces";
    
    // 创建庆祝特效
    createCelebrationWithMusic();
    
    // 改变背景
    document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
}

function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        
        // 3秒后移除
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 3000);
    }
}

function createCelebration() {
    const heartsContainer = document.querySelector('.hearts');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['💕', '💖', '💝', '💗', '🌹'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }
}

// 音乐控制相关变量
let musicPlaying = false;
let backgroundMusic, musicBtn, musicIcon;

// 初始化音乐控制元素
function initMusicElements() {
    backgroundMusic = document.getElementById('backgroundMusic');
    musicBtn = document.getElementById('musicBtn');
    musicIcon = document.getElementById('musicIcon');
}

// 音乐控制函数
function toggleMusic() {
    if (!backgroundMusic) {
        console.log('音乐元素未初始化');
        return;
    }
    
    if (musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    try {
        // 确保取消静音
        backgroundMusic.muted = false;
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.textContent = '🎵';
            musicBtn.classList.add('playing');
            musicBtn.classList.remove('paused');
        }).catch(error => {
            console.log('音乐播放失败:', error);
            // 浏览器可能阻止了自动播放
            showMusicTip();
        });
    } catch (error) {
        console.log('音乐播放出错:', error);
    }
}

function pauseMusic() {
    backgroundMusic.pause();
    musicPlaying = false;
    musicIcon.textContent = '⏸️';
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('paused');
}

// 显示音乐播放提示
function showMusicTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(255, 107, 157, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 10px;
        font-size: 14px;
        z-index: 1001;
        animation: fadeInOut 3s ease-in-out;
    `;
    tip.textContent = '点击右上角音乐按钮开启背景音乐 🎵';
    document.body.appendChild(tip);
    
    setTimeout(() => {
        if (tip.parentNode) {
            tip.parentNode.removeChild(tip);
        }
    }, 3000);
}

// 智能自动播放策略
function tryAutoPlay() {
    if (!backgroundMusic) {
        console.log('音乐元素未初始化，延迟重试');
        setTimeout(tryAutoPlay, 200);
        return;
    }
    
    console.log('开始加载音乐文件...');
    
    // 先检查音乐文件是否已经加载完成
    if (backgroundMusic.readyState >= 3) {
        console.log('音乐文件已加载完成，开始播放');
        startAutoPlay();
    } else {
        console.log('等待音乐文件加载...');
        
        // 监听音乐加载完成事件
        const onCanPlay = () => {
            console.log('音乐文件加载完成，开始自动播放');
            backgroundMusic.removeEventListener('canplay', onCanPlay);
            backgroundMusic.removeEventListener('canplaythrough', onCanPlayThrough);
            backgroundMusic.removeEventListener('error', onError);
            startAutoPlay();
        };
        
        const onCanPlayThrough = () => {
            console.log('音乐文件完全加载，开始自动播放');
            backgroundMusic.removeEventListener('canplay', onCanPlay);
            backgroundMusic.removeEventListener('canplaythrough', onCanPlayThrough);
            backgroundMusic.removeEventListener('error', onError);
            startAutoPlay();
        };
        
        const onError = (e) => {
            console.log('音乐文件加载失败:', e);
            backgroundMusic.removeEventListener('canplay', onCanPlay);
            backgroundMusic.removeEventListener('canplaythrough', onCanPlayThrough);
            backgroundMusic.removeEventListener('error', onError);
            fallbackAutoPlay();
        };
        
        // 添加事件监听器
        backgroundMusic.addEventListener('canplay', onCanPlay);
        backgroundMusic.addEventListener('canplaythrough', onCanPlayThrough);
        backgroundMusic.addEventListener('error', onError);
        
        // 设置超时保护
        setTimeout(() => {
            if (backgroundMusic.readyState < 3) {
                console.log('音乐加载超时，尝试备用策略');
                backgroundMusic.removeEventListener('canplay', onCanPlay);
                backgroundMusic.removeEventListener('canplaythrough', onCanPlayThrough);
                backgroundMusic.removeEventListener('error', onError);
                fallbackAutoPlay();
            }
        }, 8000);
        
        // 开始加载音乐（如果还没开始加载的话）
        if (backgroundMusic.readyState === 0) {
            backgroundMusic.load();
        }
    }
}

// 开始自动播放音乐
function startAutoPlay() {
    // 设置为静音模式以绕过浏览器限制
    backgroundMusic.muted = true;
    backgroundMusic.volume = 0.7;
    
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('静音播放成功，等待用户交互后取消静音');
            musicPlaying = true;
            addAutoUnmuteListeners();
            showAutoPlayTip();
        }).catch((error) => {
            console.log('静音播放失败:', error.name, error.message);
            fallbackAutoPlay();
        });
    } else {
        // 旧浏览器不支持Promise
        setTimeout(() => {
            if (!backgroundMusic.paused) {
                console.log('播放成功（旧浏览器）');
                musicPlaying = true;
                addAutoUnmuteListeners();
                showAutoPlayTip();
            } else {
                fallbackAutoPlay();
            }
        }, 100);
    }
}

// 添加自动取消静音的监听器
function addAutoUnmuteListeners() {
    const autoUnmute = () => {
        if (musicPlaying && backgroundMusic && backgroundMusic.muted) {
            backgroundMusic.muted = false;
            backgroundMusic.volume = 0.7;
            musicIcon.textContent = '🎵';
            musicBtn.classList.add('playing');
            musicBtn.classList.remove('paused');
            showMusicStartTip();
            
            console.log('用户交互后音乐已取消静音');
            
            // 移除监听器，只执行一次
            document.removeEventListener('click', autoUnmute);
            document.removeEventListener('keydown', autoUnmute);
            document.removeEventListener('touchstart', autoUnmute);
        }
    };
    
    // 监听各种用户交互
    document.addEventListener('click', autoUnmute, { once: true });
    document.addEventListener('keydown', autoUnmute, { once: true });
    document.addEventListener('touchstart', autoUnmute, { once: true });
}

// 显示音乐开始提示
function showMusicStartTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b9d, #ff8a9b);
        color: white;
        padding: 12px 18px;
        border-radius: 15px;
        font-size: 14px;
        z-index: 1001;
        animation: slideInFadeOut 4s ease-in-out;
        box-shadow: 0 5px 20px rgba(255, 107, 157, 0.5);
    `;
    tip.innerHTML = '🎵 背景音乐已开启！';
    document.body.appendChild(tip);
    
    setTimeout(() => {
        if (tip.parentNode) {
            tip.parentNode.removeChild(tip);
        }
    }, 4000);
}





// 增强的特效函数，与音乐同步
function createHeartsWithMusic() {
    createHearts();
    
    // 如果音乐在播放，可以添加一些音乐相关的特效
    if (musicPlaying) {
        // 可以在这里添加更多与音乐同步的特效
        setTimeout(() => {
            if (musicPlaying) {
                createHearts();
            }
        }, 1500);
    }
}

// 成功时播放更欢快的效果
function createCelebrationWithMusic() {
    createCelebration();
    
    // 可以在这里切换到更欢快的音乐
    if (musicPlaying) {
        // 增加音量或者添加额外的庆祝音效
        try {
            backgroundMusic.volume = Math.min(backgroundMusic.volume + 0.2, 1.0);
        } catch (error) {
            console.log('无法调整音量:', error);
        }
    }
}

// 页面加载完成后初始化
window.onload = function() {
    // 初始化音乐元素
    initMusicElements();
    
    // 稍微延迟以确保所有资源加载完成
    setTimeout(() => {
        tryAutoPlay();
        createHearts();
    }, 200);
    
    // 添加CSS动画样式到页面
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateX(20px); }
            10%, 90% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInFadeOut {
            0% { opacity: 0; transform: translateX(50px) scale(0.8); }
            15%, 85% { opacity: 1; transform: translateX(0) scale(1); }
            100% { opacity: 0; transform: translateX(-20px) scale(0.9); }
        }
    `;
    document.head.appendChild(style);
};

// 备用自动播放策略
function fallbackAutoPlay() {
    console.log('使用备用策略：第一次用户交互时启动音乐');
    
    const startOnFirstClick = () => {
        if (!backgroundMusic) return;
        
        backgroundMusic.muted = false;
        backgroundMusic.volume = 0.7;
        
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('用户交互后播放成功');
                musicPlaying = true;
                musicIcon.textContent = '🎵';
                musicBtn.classList.add('playing');
                musicBtn.classList.remove('paused');
                showMusicStartTip();
            }).catch(() => {
                console.log('用户交互后仍无法播放');
            });
        }
        
        // 移除监听器，只执行一次
        document.removeEventListener('click', startOnFirstClick);
        document.removeEventListener('touchstart', startOnFirstClick);
    };
    
    // 监听用户的第一次交互
    document.addEventListener('click', startOnFirstClick, { once: true });
    document.addEventListener('touchstart', startOnFirstClick, { once: true });
    
    showClickToPlayTip();
}

// 显示自动播放提示
function showAutoPlayTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(255, 107, 157, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1001;
        animation: fadeInOut 3s ease-in-out;
    `;
    tip.textContent = '点击任意处开启音乐 🎵';
    document.body.appendChild(tip);
    
    setTimeout(() => {
        if (tip.parentNode) {
            tip.parentNode.removeChild(tip);
        }
    }, 3000);
}

// 显示点击播放提示
function showClickToPlayTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(255, 107, 157, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1001;
        animation: fadeInOut 4s ease-in-out;
    `;
    tip.textContent = '点击任意处开启音乐 🎵';
    document.body.appendChild(tip);
    
    setTimeout(() => {
        if (tip.parentNode) {
            tip.parentNode.removeChild(tip);
        }
    }, 4000);
} 