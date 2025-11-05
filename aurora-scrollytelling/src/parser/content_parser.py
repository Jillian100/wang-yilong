#!/usr/bin/env python3
"""
AURORA Scrollytelling - Content Parser
解析 Markdown + YAML 格式的內容檔案

Author: AURORA (Chief Design Officer)
Date: 2025-11-05
"""

import yaml
import re
from pathlib import Path
from typing import Dict, List, Any


class ContentParser:
    """內容解析器：解析 Markdown + YAML 格式"""

    def __init__(self, content_file: str):
        self.content_file = Path(content_file)
        self.metadata = {}
        self.scenes = []

    def parse(self) -> Dict[str, Any]:
        """
        解析內容檔案

        Returns:
            {
                'metadata': {...},  # 全域設定
                'scenes': [...]     # 場景列表
            }
        """
        with open(self.content_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 分離 frontmatter 和內容
        parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)

        if len(parts) >= 3:
            # 有 frontmatter
            self.metadata = yaml.safe_load(parts[1])
            scene_content = '---'.join(parts[2:])
        else:
            # 沒有 frontmatter
            self.metadata = {}
            scene_content = content

        # 解析場景
        self.scenes = self._parse_scenes(scene_content)

        return {
            'metadata': self.metadata,
            'scenes': self.scenes
        }

    def _parse_scenes(self, content: str) -> List[Dict[str, Any]]:
        """解析場景內容"""
        scenes = []

        # 以 --- 分隔場景
        scene_blocks = re.split(r'\n---\s*\n', content.strip())

        for i, block in enumerate(scene_blocks):
            if not block.strip():
                continue

            scene = self._parse_scene_block(block, i)
            if scene:
                scenes.append(scene)

        return scenes

    def _parse_scene_block(self, block: str, index: int) -> Dict[str, Any]:
        """解析單個場景區塊"""
        lines = block.strip().split('\n')

        scene = {
            'id': f'scene-{index}',
            'type': 'split',  # 預設類型
            'content': {}
        }

        # 解析場景內容
        current_key = None
        current_value = []

        for line in lines:
            # 檢查是否為場景標題（# Scene X: ...）
            title_match = re.match(r'^#\s+Scene\s+\d+:\s+(.+)$', line, re.IGNORECASE)
            if title_match:
                scene['title'] = title_match.group(1)
                continue

            # 檢查是否為鍵值對（key: value）
            kv_match = re.match(r'^(\w+):\s*(.*)$', line)
            if kv_match:
                # 儲存前一個鍵的值
                if current_key and current_value:
                    scene['content'][current_key] = '\n'.join(current_value).strip()

                current_key = kv_match.group(1)
                current_value = [kv_match.group(2)] if kv_match.group(2) else []

                # 特殊處理 type 欄位
                if current_key == 'type':
                    scene['type'] = kv_match.group(2).strip()
                    current_key = None
                    current_value = []
            else:
                # 繼續累積當前鍵的值
                if current_key:
                    current_value.append(line)

        # 儲存最後一個鍵的值
        if current_key and current_value:
            scene['content'][current_key] = '\n'.join(current_value).strip()

        return scene

    def get_metadata(self) -> Dict[str, Any]:
        """取得全域 metadata"""
        return self.metadata

    def get_scenes(self) -> List[Dict[str, Any]]:
        """取得所有場景"""
        return self.scenes


# ============================================
# 測試
# ============================================
if __name__ == "__main__":
    # 測試範例
    test_content = """---
title: "王一隆《寂寞的戀人啊》MV 展示"
author: "A&R Maestro"
theme: "aurora-dark"
---

# Scene 1: Hero
type: hero
background: "./images/hero-bg.jpg"
title: 寂寞的戀人啊
subtitle: 王一隆 × City Pop 音樂企劃

---

# Scene 2: Split
type: split
layout: text-left
text: |
  ## 創作理念

  結合 80 年代 City Pop 與現代情歌元素

media_type: video
media_src: ./videos/making-of.mp4
"""

    # 寫入測試檔案
    test_file = Path('/tmp/test_content.md')
    test_file.write_text(test_content, encoding='utf-8')

    # 解析
    parser = ContentParser(test_file)
    result = parser.parse()

    print("✅ Metadata:")
    print(result['metadata'])
    print("\n✅ Scenes:")
    for scene in result['scenes']:
        print(f"\n  Scene: {scene.get('title', 'Untitled')}")
        print(f"  Type: {scene['type']}")
        print(f"  Content: {scene['content']}")
