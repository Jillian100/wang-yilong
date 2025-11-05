/**
 * AURORA Scrollytelling - Diagnostic Tool
 * 檢查所有場景元素是否正確顯示
 */

console.log('🔍 AURORA Diagnostic Starting...\n');

// 檢查所有場景類型
const sceneTypes = [
    { selector: '.scene-hero', name: 'Hero Scenes' },
    { selector: '.scene-split', name: 'Split Scenes' },
    { selector: '.scene-full-media', name: 'Full Media Scenes' }
];

sceneTypes.forEach(({ selector, name }) => {
    const scenes = document.querySelectorAll(selector);
    console.log(`\n📊 ${name}: ${scenes.length} found`);

    scenes.forEach((scene, index) => {
        const computedStyle = window.getComputedStyle(scene);
        const opacity = computedStyle.opacity;
        const display = computedStyle.display;
        const visibility = computedStyle.visibility;

        console.log(`  Scene ${index + 1}:`);
        console.log(`    - Opacity: ${opacity}`);
        console.log(`    - Display: ${display}`);
        console.log(`    - Visibility: ${visibility}`);

        // 檢查文字內容
        const textElements = scene.querySelectorAll('h1, h2, p, li');
        console.log(`    - Text elements: ${textElements.length}`);

        textElements.forEach((el, i) => {
            const elStyle = window.getComputedStyle(el);
            if (elStyle.opacity === '0' || elStyle.display === 'none') {
                console.warn(`    ⚠️  Text element ${i + 1} is hidden!`);
            }
        });
    });
});

// 檢查 GSAP 和 ScrollTrigger
console.log('\n🎬 Animation Libraries:');
console.log(`  - GSAP loaded: ${typeof gsap !== 'undefined'}`);
console.log(`  - ScrollTrigger loaded: ${typeof ScrollTrigger !== 'undefined'}`);

if (typeof ScrollTrigger !== 'undefined') {
    const triggers = ScrollTrigger.getAll();
    console.log(`  - Active ScrollTriggers: ${triggers.length}`);
}

console.log('\n✅ Diagnostic Complete');
