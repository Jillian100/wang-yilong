/**
 * AURORA Scrollytelling Platform - Scroll Controller
 *
 * 功能：
 * - 滾動觸發動畫
 * - 場景光澤效果
 * - 深度元素控制
 *
 * Author: AURORA (Chief Design Officer)
 * Date: 2025-11-05
 */

// ========================================
// 🎭 劇場式滾動控制器
// ========================================

class AuroraScrollController {
    constructor() {
        this.scenes = document.querySelectorAll('.aurora-scene');
        this.currentScene = 0;

        this.init();
    }

    init() {
        // 監聽滾動事件
        window.addEventListener('scroll', () => this.onScroll());

        // 初始化場景光澤效果
        this.initSceneGlow();

        // 初始化深度元素
        this.initDepthElements();

        console.log('🌌 AURORA Scrollytelling Platform initialized');
    }

    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        // 更新當前場景
        this.updateCurrentScene(scrollTop, windowHeight);

        // 觸發深度動畫
        this.triggerDepthAnimations(scrollTop, windowHeight);
    }

    updateCurrentScene(scrollTop, windowHeight) {
        this.scenes.forEach((scene, index) => {
            const sceneTop = scene.offsetTop;
            const sceneHeight = scene.offsetHeight;

            // 判斷場景是否在視窗中
            if (scrollTop >= sceneTop - windowHeight * 0.5 &&
                scrollTop < sceneTop + sceneHeight - windowHeight * 0.5) {

                if (this.currentScene !== index) {
                    this.currentScene = index;
                    this.activateScene(scene);
                }
            }
        });
    }

    activateScene(scene) {
        // 移除所有場景的 active class
        this.scenes.forEach(s => s.classList.remove('active'));

        // 添加當前場景的 active class（觸發光澤效果）
        if (scene.classList.contains('scene-glow')) {
            scene.classList.add('active');
        }

        console.log('🎬 Scene activated:', scene);
    }

    initSceneGlow() {
        // 為所有場景添加光澤效果準備
        this.scenes.forEach(scene => {
            if (!scene.classList.contains('scene-glow')) {
                // 可選：自動為特定場景添加光澤
                // scene.classList.add('scene-glow');
            }
        });
    }

    initDepthElements() {
        const depthElements = document.querySelectorAll('.depth-element');

        depthElements.forEach(element => {
            // 初始狀態：移除 in-view
            element.classList.remove('in-view');
        });
    }

    triggerDepthAnimations(scrollTop, windowHeight) {
        const depthElements = document.querySelectorAll('.depth-element');

        depthElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // 當元素進入視窗時，添加 in-view class
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.classList.add('in-view');
            } else {
                element.classList.remove('in-view');
            }
        });
    }
}

// ========================================
// 🚀 初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    new AuroraScrollController();
});
