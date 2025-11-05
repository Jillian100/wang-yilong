/**
 * AURORA Scrollytelling Platform - GSAP Animations
 *
 * 功能：
 * - GSAP Timeline 編舞系統
 * - ScrollTrigger 滾動綁定
 * - 交錯動畫 (Stagger)
 * - 專業級動畫控制
 *
 * Author: AURORA (Chief Design Officer)
 * Date: 2025-11-05
 */

// ========================================
// 🎭 GSAP 註冊插件
// ========================================

gsap.registerPlugin(ScrollTrigger);

// ========================================
// 🎬 AURORA GSAP 動畫控制器
// ========================================

class AuroraGSAPController {
    constructor() {
        this.scrollContainer = null;
        this.init();
    }

    init() {
        console.log('🎬 GSAP Animation System initialized');

        // 🔧 關鍵修復：設定 ScrollTrigger 監聽自定義滾動容器
        this.scrollContainer = document.querySelector('.aurora-canvas');

        if (this.scrollContainer) {
            ScrollTrigger.config({
                autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
            });

            // 告訴所有 ScrollTrigger 要監聽這個容器
            ScrollTrigger.defaults({
                scroller: this.scrollContainer
            });

            console.log('✅ ScrollTrigger configured for .aurora-canvas');
        }

        // 1. Hero 場景動畫
        this.animateHeroScenes();

        // 2. Split 場景動畫
        this.animateSplitScenes();

        // 3. 文字交錯動畫
        this.animateTextStagger();

        // 4. 圖片視差效果
        this.animateImageParallax();

        // 5. 全螢幕媒體場景動畫
        this.animateFullMediaScenes();

        // 6. 微動畫增強
        this.addMicroInteractions();

        // 7. 滾動進度指示器
        this.addScrollProgress();

        // 8. 進階視差效果（多層背景）
        this.animateParallaxScenes();
    }

    // ========================================
    // Hero 場景動畫
    // ========================================
    animateHeroScenes() {
        const heroScenes = document.querySelectorAll('.scene-hero');

        heroScenes.forEach((scene, index) => {
            const title = scene.querySelector('.scene-hero-title');
            const subtitle = scene.querySelector('.scene-hero-subtitle');

            if (!title) return;

            // 設定初始狀態為可見
            gsap.set([title, subtitle], { opacity: 1, y: 0 });

            // Timeline 編舞
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scene,
                    start: 'top 75%',  // 更早觸發
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                    // markers: true  // 調試用，可開啟
                }
            });

            // 標題從下方淡入 + 放大（優化版：更快速、更流暢）
            tl.from(title, {
                y: 80,  // 減少位移距離，更精緻
                opacity: 0,
                scale: 0.95,  // 微妙的縮放
                duration: 1,  // 加快速度
                ease: 'power4.out'  // 更強勁的緩出
            });

            // 副標題接續淡入（優化版：更輕盈）
            if (subtitle) {
                tl.from(subtitle, {
                    y: 30,  // 更短的位移
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out'  // 更流暢
                }, '-=0.5');  // 更快接續
            }

            console.log(`🎬 Hero scene ${index + 1} animated`);
        });
    }

    // ========================================
    // Split 場景動畫
    // ========================================
    animateSplitScenes() {
        const splitScenes = document.querySelectorAll('.scene-split');

        splitScenes.forEach((scene, index) => {
            const textContainer = scene.querySelector('.scene-split-text');
            const mediaContainer = scene.querySelector('.scene-split-media');

            if (!textContainer || !mediaContainer) return;

            // 設定初始狀態為可見
            gsap.set([textContainer, mediaContainer], { opacity: 1, x: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scene,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none none'
                }
            });

            // 判斷佈局方向
            const isTextLeft = !scene.classList.contains('layout-text-right');

            // 文字容器動畫（優化版：更優雅的滑入）
            tl.from(textContainer, {
                x: isTextLeft ? -80 : 80,  // 減少位移，更精緻
                opacity: 0,
                duration: 0.9,  // 稍微加快
                ease: 'power4.out'  // 更強勁的緩出
            });

            // 媒體容器動畫（優化版：更輕盈的浮現）
            tl.from(mediaContainer, {
                x: isTextLeft ? 60 : -60,  // 不對稱的距離創造層次
                opacity: 0,
                scale: 0.97,  // 加入微妙的縮放
                duration: 1,
                ease: 'power3.out'
            }, '-=0.6');  // 更多重疊，創造流暢感

            console.log(`📖 Split scene ${index + 1} animated`);
        });
    }

    // ========================================
    // 文字交錯動畫（列表項目）
    // ========================================
    animateTextStagger() {
        const listContainers = document.querySelectorAll('.scene-split-text ul');

        listContainers.forEach((list) => {
            const items = list.querySelectorAll('li');

            if (items.length === 0) return;

            // 設定初始狀態為可見
            gsap.set(items, { opacity: 1, y: 0 });

            gsap.from(items, {
                scrollTrigger: {
                    trigger: list,
                    start: 'top 75%',  // 更早觸發
                    toggleActions: 'play none none none'
                },
                y: 20,  // 更短的位移，更輕盈
                opacity: 0,
                stagger: {
                    amount: 0.4,  // 總時長 0.4 秒均分
                    from: "start",  // 從第一個開始
                    ease: "power2.inOut"  // 交錯的緩動
                },
                duration: 0.5,  // 更快的個別動畫
                ease: 'power3.out'  // 更流暢的緩出
            });

            console.log(`📋 List stagger animated (${items.length} items)`);
        });
    }

    // ========================================
    // 圖片視差效果（優化版：更細膩的深度感）
    // ========================================
    animateImageParallax() {
        const images = document.querySelectorAll('.scene-split-media img');

        images.forEach((img, index) => {
            // 不同圖片使用不同的視差強度，創造層次
            const parallaxAmount = index % 2 === 0 ? -60 : -40;

            gsap.to(img, {
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5  // 更平滑的跟隨
                },
                y: parallaxAmount,  // 交替的視差強度
                scale: 1.05,  // 微妙的放大，創造深度
                ease: 'none'
            });
        });

        console.log(`🖼️ Image parallax applied (${images.length} images)`);
    }

    // ========================================
    // 全螢幕媒體場景動畫
    // ========================================
    animateFullMediaScenes() {
        const fullMediaScenes = document.querySelectorAll('.scene-full-media');

        fullMediaScenes.forEach((scene, index) => {
            const overlay = scene.querySelector('.scene-full-media-overlay');

            if (!overlay) return;

            // 設定初始狀態為可見
            gsap.set(overlay, { opacity: 1, y: 0 });

            gsap.from(overlay, {
                scrollTrigger: {
                    trigger: scene,
                    start: 'top 65%',  // 更早觸發
                    toggleActions: 'play none none none'
                },
                y: 60,  // 更短的位移
                opacity: 0,
                duration: 1.2,  // 稍微延長，更優雅
                ease: 'power4.out'  // 更強勁的緩出
            });

            console.log(`🎥 Full media scene ${index + 1} animated`);
        });
    }

    // ========================================
    // 微動畫增強（光澤掃過、in-view 偵測）
    // ========================================
    addMicroInteractions() {
        const scenes = document.querySelectorAll('.aurora-scene');

        scenes.forEach((scene) => {
            // 使用 ScrollTrigger 偵測場景進入視口
            ScrollTrigger.create({
                trigger: scene,
                start: 'top 70%',
                onEnter: () => {
                    scene.classList.add('in-view');
                },
                once: true  // 只觸發一次
            });
        });

        console.log('✨ Micro-interactions enabled');
    }

    // ========================================
    // 滾動進度指示器
    // ========================================
    addScrollProgress() {
        // 建立進度條元素
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // 使用 GSAP 更新進度條
        gsap.to(progressBar, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });

        console.log('📊 Scroll progress indicator added');
    }

    // ========================================
    // 進階視差效果（多層背景深度）
    // ========================================
    animateParallaxScenes() {
        const parallaxScenes = document.querySelectorAll('.scene-parallax');

        parallaxScenes.forEach((scene, sceneIndex) => {
            const layers = scene.querySelectorAll('.parallax-layer');

            if (layers.length === 0) return;

            layers.forEach((layer) => {
                const depth = parseFloat(layer.dataset.depth) || 0.5;

                // 根據深度計算移動距離
                // depth 越大，移動越多（近景）
                // depth 越小，移動越少（遠景）
                const moveAmount = 100 * depth;

                gsap.to(layer, {
                    y: -moveAmount,  // 向上移動
                    ease: 'none',
                    scrollTrigger: {
                        trigger: scene,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,  // 平滑跟隨
                        // markers: true  // 調試用
                    }
                });
            });

            // 如果有文字覆層，也加入視差效果
            const parallaxText = scene.querySelector('.parallax-text');
            if (parallaxText) {
                gsap.from(parallaxText, {
                    scrollTrigger: {
                        trigger: scene,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    scale: 0.9,
                    duration: 1,
                    ease: 'power3.out'
                });
            }

            console.log(`🌌 Parallax scene ${sceneIndex + 1} animated (${layers.length} layers)`);
        });
    }
}

// ========================================
// 🎯 進階功能：Apple 風格 PNG 序列動畫
// ========================================

class AppleStyleSequence {
    constructor(options) {
        this.canvas = options.canvas;
        this.frameCount = options.frameCount || 150;
        this.framePath = options.framePath;
        this.scrollDuration = options.scrollDuration || '300vh';
        this.scroller = options.scroller || null;  // 支援自定義滾動容器

        this.images = [];
        this.currentFrame = 0;
        this.context = this.canvas.getContext('2d');
        this.loadedCount = 0;

        this.preloadImages();
    }

    preloadImages() {
        console.log(`🎬 Preloading PNG sequence (${this.frameCount} frames)...`);

        for (let i = 1; i <= this.frameCount; i++) {
            const img = new Image();
            img.src = `${this.framePath}/frame_${String(i).padStart(4, '0')}.png`;

            img.onload = () => {
                this.loadedCount++;
                if (this.loadedCount === 1) {
                    // 第一張圖載入完成，立即顯示
                    this.render(0);
                }
                if (this.loadedCount === this.frameCount) {
                    console.log('✅ All frames preloaded');
                }
            };

            img.onerror = () => {
                console.warn(`⚠️ Failed to load frame ${i}`);
            };

            this.images.push(img);
        }

        // 第一張圖載入後初始化動畫
        this.images[0].onload = () => {
            this.initScrollAnimation();
        };
    }

    initScrollAnimation() {
        const sequence = { frame: 0 };

        const scrollTriggerConfig = {
            trigger: this.canvas.parentElement,
            pin: true,
            scrub: 0.5,
            start: 'top top',
            end: `+=${this.scrollDuration}`,
            onUpdate: (self) => {
                // 即時更新進度
                const progress = self.progress;
                const frameIndex = Math.round(progress * (this.frameCount - 1));
                this.render(frameIndex);
            }
        };

        // 如果有自定義滾動容器，設定 scroller
        if (this.scroller) {
            scrollTriggerConfig.scroller = this.scroller;
        }

        gsap.to(sequence, {
            frame: this.frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: scrollTriggerConfig,
            onUpdate: () => {
                this.render(Math.round(sequence.frame));
            }
        });

        console.log(`✅ PNG sequence animation initialized (${this.frameCount} frames)`);
    }

    render(frameIndex) {
        if (frameIndex !== this.currentFrame && frameIndex >= 0 && frameIndex < this.frameCount) {
            this.currentFrame = frameIndex;
            const img = this.images[frameIndex];

            if (img && img.complete) {
                // 調整 canvas 尺寸以適應圖片
                const scale = Math.max(
                    this.canvas.width / img.width,
                    this.canvas.height / img.height
                );

                const x = (this.canvas.width / 2) - (img.width / 2) * scale;
                const y = (this.canvas.height / 2) - (img.height / 2) * scale;

                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        }
    }
}

// ========================================
// 🚀 自動初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // 初始化 GSAP 動畫系統
    new AuroraGSAPController();

    // 如果有 PNG 序列場景，自動初始化
    const sequenceCanvas = document.querySelector('.sequence-canvas');
    if (sequenceCanvas) {
        const frameCount = parseInt(sequenceCanvas.dataset.frameCount) || 150;
        const framePath = sequenceCanvas.dataset.framePath || './frames';
        const scrollDuration = sequenceCanvas.dataset.scrollDuration || '300vh';

        // 取得滾動容器
        const scrollContainer = document.querySelector('.aurora-canvas');

        new AppleStyleSequence({
            canvas: sequenceCanvas,
            frameCount: frameCount,
            framePath: framePath,
            scrollDuration: scrollDuration,
            scroller: scrollContainer  // 傳入滾動容器
        });

        console.log('🎬 Apple-style PNG sequence initialized');
    }
});
