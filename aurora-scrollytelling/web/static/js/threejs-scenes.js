/**
 * AURORA Scrollytelling Platform - Three.js 3D Scenes
 *
 * 功能：
 * - WebGL 3D 場景渲染
 * - 滾動控制 3D 物件
 * - 產品展示、3D 文字、粒子效果
 *
 * Author: AURORA (Chief Design Officer)
 * Date: 2025-11-05
 */

// ========================================
// 🎮 AURORA Three.js 3D 控制器
// ========================================

class AuroraThreeController {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.options = {
            type: options.type || 'product',  // product, text, particles
            model: options.model || null,
            color: options.color || 0x6366f1,  // AURORA purple
            autoRotate: options.autoRotate !== false,
            ...options
        };

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
        this.scrollContainer = null;

        this.init();
    }

    init() {
        console.log('🎮 Three.js 3D Scene initializing...');

        // 檢查 WebGL 支援
        if (!this.checkWebGLSupport()) {
            console.error('❌ WebGL not supported');
            this.showFallback();
            return;
        }

        // 設定 Canvas 尺寸（關鍵修復）
        this.canvas.width = this.canvas.clientWidth || 800;
        this.canvas.height = this.canvas.clientHeight || 600;

        // 創建場景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e27);  // AURORA dark

        // 創建相機
        const aspect = this.canvas.width / this.canvas.height;
        this.camera = new THREE.PerspectiveCamera(
            75,  // FOV
            aspect,  // Aspect
            0.1,  // Near
            1000   // Far
        );
        this.camera.position.z = 5;

        // 創建渲染器（加入錯誤處理）
        try {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(this.canvas.width, this.canvas.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } catch (error) {
            console.error('❌ Failed to create WebGL renderer:', error);
            this.showFallback();
            return;
        }

        // 加入燈光
        this.addLights();

        // 根據類型創建 3D 物件
        switch (this.options.type) {
            case 'product':
                this.createProductMesh();
                break;
            case 'text':
                this.createTextMesh();
                break;
            case 'particles':
                this.createParticles();
                break;
            default:
                this.createProductMesh();
        }

        // 開始渲染循環
        this.animate();

        // 響應式調整
        window.addEventListener('resize', () => this.onResize());

        console.log(`✅ Three.js 3D Scene ready (type: ${this.options.type})`);
    }

    addLights() {
        // 環境光（基礎照明）
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // 方向光（主光源）
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // 點光源（AURORA 紫色光芒）
        const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
        pointLight.position.set(-5, 3, 5);
        this.scene.add(pointLight);
    }

    createProductMesh() {
        // 創建產品展示的 3D 物件（立方體為例）
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: this.options.color,
            shininess: 100,
            specular: 0x444444
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // 加入邊緣輪廓（更酷炫）
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
        );
        this.mesh.add(line);

        console.log('📦 Product mesh created');
    }

    createTextMesh() {
        // 創建 3D 文字（使用簡單幾何代替，實際需載入字體）
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new THREE.MeshPhongMaterial({
            color: this.options.color,
            shininess: 100
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        console.log('🔤 Text mesh created (TorusKnot placeholder)');
    }

    createParticles() {
        // 創建粒子系統
        const particlesCount = 5000;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: this.options.color,
            size: 0.02,
            transparent: true,
            opacity: 0.8
        });

        this.mesh = new THREE.Points(geometry, material);
        this.scene.add(this.mesh);

        console.log('✨ Particles system created (5000 particles)');
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // 自動旋轉（如果啟用）
        if (this.options.autoRotate && this.mesh) {
            this.mesh.rotation.y += 0.005;
            this.mesh.rotation.x += 0.002;
        }

        this.renderer.render(this.scene, this.camera);
    }

    // ========================================
    // WebGL 支援檢測
    // ========================================
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch (e) {
            return false;
        }
    }

    showFallback() {
        // 顯示降級提示
        const container = this.canvas.parentElement;
        const fallback = document.createElement('div');
        fallback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #CCCCCC;
            padding: 2rem;
        `;
        fallback.innerHTML = `
            <h3 style="color: #6366f1; margin-bottom: 1rem;">WebGL 未啟用</h3>
            <p>您的瀏覽器不支援 WebGL 或已被停用</p>
            <p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.7;">
                請嘗試使用 Chrome、Firefox 或 Safari 瀏覽器
            </p>
        `;
        container.appendChild(fallback);
        this.canvas.style.display = 'none';
    }

    onResize() {
        if (!this.camera || !this.renderer) return;

        // 更新相機比例
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();

        // 更新渲染器尺寸
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    // ========================================
    // 公開方法：滾動控制
    // ========================================

    bindScrollRotation(scrollContainer) {
        if (!this.mesh) return;

        this.scrollContainer = scrollContainer;

        gsap.to(this.mesh.rotation, {
            y: Math.PI * 4,  // 旋轉 2 圈
            x: Math.PI * 2,  // 旋轉 1 圈
            ease: 'none',
            scrollTrigger: {
                trigger: this.canvas.parentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                scroller: scrollContainer
            }
        });

        console.log('🔄 Scroll-controlled rotation bound');
    }

    bindScrollZoom(scrollContainer) {
        if (!this.camera) return;

        gsap.to(this.camera.position, {
            z: 2,  // 拉近
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: this.canvas.parentElement,
                start: 'top center',
                end: 'center center',
                scrub: 1,
                scroller: scrollContainer
            }
        });

        console.log('🔍 Scroll-controlled zoom bound');
    }

    bindScrollColor(scrollContainer, startColor = 0x6366f1, endColor = 0xec4899) {
        if (!this.mesh) return;

        const colorStart = new THREE.Color(startColor);
        const colorEnd = new THREE.Color(endColor);
        const colorData = { r: colorStart.r, g: colorStart.g, b: colorStart.b };

        gsap.to(colorData, {
            r: colorEnd.r,
            g: colorEnd.g,
            b: colorEnd.b,
            ease: 'none',
            scrollTrigger: {
                trigger: this.canvas.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                scroller: scrollContainer
            },
            onUpdate: () => {
                this.mesh.material.color.setRGB(colorData.r, colorData.g, colorData.b);
            }
        });

        console.log('🎨 Scroll-controlled color bound');
    }
}

// ========================================
// 🚀 自動初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const threeCanvases = document.querySelectorAll('.threejs-canvas');

    if (threeCanvases.length === 0) return;

    threeCanvases.forEach((canvas, index) => {
        const type = canvas.dataset.type || 'product';
        const color = canvas.dataset.color ? parseInt(canvas.dataset.color.replace('#', '0x')) : 0x6366f1;
        const autoRotate = canvas.dataset.autoRotate !== 'false';

        const controller = new AuroraThreeController(canvas, {
            type: type,
            color: color,
            autoRotate: autoRotate
        });

        // 取得滾動容器
        const scrollContainer = document.querySelector('.aurora-canvas');

        // 綁定滾動控制
        if (canvas.dataset.scrollRotation !== 'false') {
            controller.bindScrollRotation(scrollContainer);
        }

        if (canvas.dataset.scrollZoom === 'true') {
            controller.bindScrollZoom(scrollContainer);
        }

        if (canvas.dataset.scrollColor === 'true') {
            const startColor = parseInt(canvas.dataset.colorStart?.replace('#', '0x') || '0x6366f1');
            const endColor = parseInt(canvas.dataset.colorEnd?.replace('#', '0x') || '0xec4899');
            controller.bindScrollColor(scrollContainer, startColor, endColor);
        }

        console.log(`🎮 Three.js scene ${index + 1} initialized`);
    });
});
