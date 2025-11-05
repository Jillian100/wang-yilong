#!/usr/bin/env python3
"""
AURORA Scrollytelling - HTML Generator
生成完整的 HTML 頁面

Author: AURORA (Chief Design Officer)
Date: 2025-11-05
"""

from pathlib import Path
from typing import Dict, List, Any


class HTMLGenerator:
    """HTML 生成器"""

    def __init__(self, metadata: Dict[str, Any], scenes: List[Dict[str, Any]]):
        self.metadata = metadata
        self.scenes = scenes

    def generate(self) -> str:
        """生成完整的 HTML"""
        html = self._generate_header()
        html += self._generate_canvas_start()

        for scene in self.scenes:
            html += self._generate_scene(scene)

        html += self._generate_canvas_end()
        html += self._generate_footer()

        return html

    def _generate_header(self) -> str:
        """生成 HTML header"""
        title = self.metadata.get('title', 'AURORA Scrollytelling')
        theme = self.metadata.get('theme', 'aurora-dark')

        return f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>

    <!-- AURORA Scrollytelling Styles -->
    <link rel="stylesheet" href="../static/css/aurora-scrollytelling.css">

    <!-- Theme -->
    <link rel="stylesheet" href="../static/css/themes/{theme}.css">
</head>
<body>
"""

    def _generate_canvas_start(self) -> str:
        """生成畫布開始標籤"""
        return '<div class="aurora-canvas">\n'

    def _generate_canvas_end(self) -> str:
        """生成畫布結束標籤"""
        return '</div><!-- .aurora-canvas -->\n'

    def _generate_scene(self, scene: Dict[str, Any]) -> str:
        """生成單個場景"""
        scene_type = scene.get('type', 'split')
        scene_id = scene.get('id', 'scene')

        if scene_type == 'hero':
            return self._generate_hero_scene(scene)
        elif scene_type == 'split':
            return self._generate_split_scene(scene)
        elif scene_type == 'full-media':
            return self._generate_full_media_scene(scene)
        elif scene_type == 'image-sequence':
            return self._generate_image_sequence_scene(scene)
        elif scene_type == 'parallax':
            return self._generate_parallax_scene(scene)
        elif scene_type == 'threejs':
            return self._generate_threejs_scene(scene)
        else:
            return f'<!-- Unknown scene type: {scene_type} -->\n'

    def _generate_hero_scene(self, scene: Dict[str, Any]) -> str:
        """生成 Hero 場景"""
        content = scene.get('content', {})
        background = content.get('background', '')
        title = content.get('title', '')
        subtitle = content.get('subtitle', '')
        scroll_hint = content.get('scroll_hint', 'false').lower() == 'true'

        bg_style = f'background-image: url({background});' if background and not background.startswith('linear-gradient') else f'background: {background};'

        scroll_hint_html = '''
    <div class="scene-hero-scroll-hint"></div>
''' if scroll_hint else ''

        return f"""
<section class="aurora-scene scene-hero" style="{bg_style}">
    <div class="scene-hero-content">
        <h1 class="scene-hero-title">{title}</h1>
        <p class="scene-hero-subtitle">{subtitle}</p>
    </div>
    {scroll_hint_html}
</section>
"""

    def _generate_split_scene(self, scene: Dict[str, Any]) -> str:
        """生成 Split 場景"""
        content = scene.get('content', {})
        layout = content.get('layout', 'text-left')
        text = content.get('text', '')
        media_type = content.get('media_type', 'image')
        media_src = content.get('media_src', '')

        # 將 Markdown 文字轉為 HTML
        text_html = self._markdown_to_html(text)

        # 生成媒體 HTML
        if media_type == 'video':
            media_html = f'<video src="{media_src}" autoplay loop muted playsinline></video>'
        else:
            media_html = f'<img src="{media_src}" alt="Media">'

        return f"""
<section class="aurora-scene scene-split layout-{layout}">
    <div class="scene-split-container">
        <div class="scene-split-text">
            {text_html}
        </div>
        <div class="scene-split-media">
            {media_html}
        </div>
    </div>
</section>
"""

    def _generate_full_media_scene(self, scene: Dict[str, Any]) -> str:
        """生成 Full Media 場景"""
        content = scene.get('content', {})
        media_type = content.get('media_type', 'video')
        media_src = content.get('media_src', '')
        overlay_text = content.get('overlay_text', '')

        # 處理 YouTube embed
        if 'youtube.com' in media_src or 'youtu.be' in media_src:
            media_html = f'<iframe src="{media_src}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="width:100%;height:100%;"></iframe>'
        elif media_type == 'video':
            media_html = f'<video src="{media_src}" controls style="width:100%;height:100%;object-fit:cover;"></video>'
        else:
            media_html = f'<img src="{media_src}" alt="Media" style="width:100%;height:100%;object-fit:cover;">'

        overlay_html = f'''
    <div class="scene-full-media-overlay">
        <div class="scene-full-media-overlay-text">{overlay_text}</div>
    </div>
''' if overlay_text else ''

        return f"""
<section class="aurora-scene scene-full-media">
    <div class="scene-full-media-container">
        {media_html}
        {overlay_html}
    </div>
</section>
"""

    def _markdown_to_html(self, text: str) -> str:
        """簡易 Markdown 轉 HTML（只處理基礎語法）"""
        if not text:
            return ''

        lines = text.strip().split('\n')
        html_lines = []
        in_list = False

        for line in lines:
            line = line.strip()

            if not line:
                if in_list:
                    html_lines.append('</ul>')
                    in_list = False
                html_lines.append('<br>')
                continue

            # 標題
            if line.startswith('## '):
                if in_list:
                    html_lines.append('</ul>')
                    in_list = False
                html_lines.append(f'<h2>{line[3:]}</h2>')
            elif line.startswith('### '):
                if in_list:
                    html_lines.append('</ul>')
                    in_list = False
                html_lines.append(f'<h3>{line[4:]}</h3>')
            # 列表
            elif line.startswith('- '):
                if not in_list:
                    html_lines.append('<ul>')
                    in_list = True
                html_lines.append(f'<li>{line[2:]}</li>')
            # 粗體
            elif '**' in line:
                line = line.replace('**', '<strong>', 1).replace('**', '</strong>', 1)
                html_lines.append(f'<p>{line}</p>')
            # 一般段落
            else:
                if in_list:
                    html_lines.append('</ul>')
                    in_list = False
                html_lines.append(f'<p>{line}</p>')

        if in_list:
            html_lines.append('</ul>')

        return '\n'.join(html_lines)

    def _generate_image_sequence_scene(self, scene: Dict[str, Any]) -> str:
        """生成 PNG 序列場景（Apple 風格）"""
        content = scene.get('content', {})
        frames_path = content.get('frames', './frames')
        frame_count = content.get('frame_count', 150)
        scroll_duration = content.get('scroll_duration', '300vh')
        canvas_width = content.get('canvas_width', 1920)
        canvas_height = content.get('canvas_height', 1080)

        return f"""
<section class="aurora-scene scene-image-sequence">
    <div class="sequence-container">
        <canvas
            class="sequence-canvas"
            data-frame-path="{frames_path}"
            data-frame-count="{frame_count}"
            data-scroll-duration="{scroll_duration}"
            width="{canvas_width}"
            height="{canvas_height}">
        </canvas>
    </div>
</section>
"""

    def _generate_parallax_scene(self, scene: Dict[str, Any]) -> str:
        """生成視差場景"""
        content = scene.get('content', {})
        layers = content.get('layers', [])
        text = content.get('text', '')

        layers_html = ''
        for layer in layers:
            depth = layer.get('depth', 0.5)
            image = layer.get('image', '')
            layers_html += f'<div class="parallax-layer" data-depth="{depth}" style="background-image: url({image});"></div>\n'

        text_html = f'<div class="parallax-text"><h2>{text}</h2></div>' if text else ''

        return f"""
<section class="aurora-scene scene-parallax">
    <div class="parallax-container">
        {layers_html}
        {text_html}
    </div>
</section>
"""

    def _generate_threejs_scene(self, scene: Dict[str, Any]) -> str:
        """生成 Three.js 3D 場景"""
        content = scene.get('content', {})
        scene_type = content.get('scene_type', 'product')  # product, text, particles
        color = content.get('color', '#6366f1')
        auto_rotate = content.get('auto_rotate', 'true')
        scroll_rotation = content.get('scroll_rotation', 'true')
        scroll_zoom = content.get('scroll_zoom', 'false')
        scroll_color = content.get('scroll_color', 'false')
        color_start = content.get('color_start', '#6366f1')
        color_end = content.get('color_end', '#ec4899')
        overlay_title = content.get('overlay_title', '')
        overlay_text = content.get('overlay_text', '')

        overlay_html = ''
        if overlay_title or overlay_text:
            overlay_html = f'''
    <div class="threejs-overlay">
        {f'<h2>{overlay_title}</h2>' if overlay_title else ''}
        {f'<p>{overlay_text}</p>' if overlay_text else ''}
    </div>'''

        return f"""
<section class="aurora-scene scene-threejs">
    <div class="threejs-container">
        <canvas
            class="threejs-canvas"
            data-type="{scene_type}"
            data-color="{color}"
            data-auto-rotate="{auto_rotate}"
            data-scroll-rotation="{scroll_rotation}"
            data-scroll-zoom="{scroll_zoom}"
            data-scroll-color="{scroll_color}"
            data-color-start="{color_start}"
            data-color-end="{color_end}">
        </canvas>
        {overlay_html}
    </div>
</section>
"""

    def _generate_footer(self) -> str:
        """生成 HTML footer"""
        return """
<!-- GSAP Animation Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Three.js Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- AURORA Scrollytelling JavaScript -->
<script src="../static/js/scroll-controller.js"></script>
<script src="../static/js/gsap-animations.js"></script>
<script src="../static/js/threejs-scenes.js"></script>

</body>
</html>
"""


# ============================================
# 測試
# ============================================
if __name__ == "__main__":
    # 測試資料
    metadata = {
        'title': '王一隆《寂寞的戀人啊》MV 展示',
        'theme': 'aurora-dark'
    }

    scenes = [
        {
            'id': 'scene-1',
            'type': 'hero',
            'content': {
                'background': 'https://example.com/bg.jpg',
                'title': '寂寞的戀人啊',
                'subtitle': '王一隆 × City Pop',
                'scroll_hint': 'true'
            }
        },
        {
            'id': 'scene-2',
            'type': 'split',
            'content': {
                'layout': 'text-left',
                'text': '## 創作理念\n\n結合 80 年代 City Pop...',
                'media_type': 'image',
                'media_src': 'https://example.com/img.jpg'
            }
        }
    ]

    generator = HTMLGenerator(metadata, scenes)
    html = generator.generate()
    print(html)
