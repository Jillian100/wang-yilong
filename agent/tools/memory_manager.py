#!/usr/bin/env python3
"""
AURORA 記憶管理器
管理 AI Agent 的短期與長期記憶
"""

import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any

class MemoryManager:
    """AURORA 記憶管理系統"""

    def __init__(self, base_path: str = None):
        if base_path is None:
            base_path = Path(__file__).parent.parent / "memory"
        self.base_path = Path(base_path)
        self.longterm_db = self.base_path / "longterm_db.json"
        self.session_file = self.base_path / "session_current.json"

    def load_longterm_memory(self) -> Dict:
        """載入長期記憶"""
        if self.longterm_db.exists():
            with open(self.longterm_db, 'r', encoding='utf-8') as f:
                return json.load(f)
        return self._create_empty_memory()

    def save_longterm_memory(self, memory: Dict):
        """保存長期記憶"""
        memory['metadata']['last_updated'] = datetime.now().isoformat()
        with open(self.longterm_db, 'w', encoding='utf-8') as f:
            json.dump(memory, f, ensure_ascii=False, indent=2)

    def add_project(self, project_data: Dict):
        """添加新項目記錄"""
        memory = self.load_longterm_memory()

        # 確保有必需的字段
        project_data.setdefault('id', f"project_{len(memory['projects']) + 1:03d}")
        project_data.setdefault('date_start', datetime.now().isoformat()[:10])

        memory['projects'].append(project_data)
        memory['statistics']['total_projects'] = len(memory['projects'])

        self.save_longterm_memory(memory)
        return project_data['id']

    def get_project(self, project_id: str) -> Dict:
        """獲取項目詳情"""
        memory = self.load_longterm_memory()
        for project in memory['projects']:
            if project['id'] == project_id:
                return project
        return None

    def add_knowledge(self, knowledge_type: str, entry: Dict):
        """添加知識庫條目"""
        memory = self.load_longterm_memory()

        if knowledge_type not in memory['knowledge_base']:
            memory['knowledge_base'][knowledge_type] = []

        entry.setdefault('id', f"{knowledge_type}_{len(memory['knowledge_base'][knowledge_type]) + 1:03d}")
        entry.setdefault('created_date', datetime.now().isoformat()[:10])

        memory['knowledge_base'][knowledge_type].append(entry)
        self.save_longterm_memory(memory)
        return entry['id']

    def search_knowledge(self, tags: List[str] = None, category: str = None) -> List[Dict]:
        """搜尋知識庫"""
        memory = self.load_longterm_memory()
        results = []

        for kb_type, entries in memory['knowledge_base'].items():
            for entry in entries:
                # 按類別過濾
                if category and entry.get('category') != category:
                    continue

                # 按標籤過濾
                if tags:
                    entry_tags = entry.get('tags', [])
                    if not any(tag in entry_tags for tag in tags):
                        continue

                results.append(entry)

        # 按有用性排序
        results.sort(key=lambda x: x.get('usefulness_score', 0), reverse=True)
        return results

    def add_learning(self, topic: str, lesson: str, importance: str = "medium"):
        """記錄學習經驗"""
        memory = self.load_longterm_memory()

        learning_entry = {
            "date": datetime.now().isoformat()[:10],
            "topic": topic,
            "lesson": lesson,
            "importance": importance,
            "applied_to": []
        }

        memory['learning_log'].append(learning_entry)
        self.save_longterm_memory(memory)

    def update_statistics(self):
        """更新統計數據"""
        memory = self.load_longterm_memory()
        projects = memory['projects']

        # 計算平均分數
        if projects:
            aesthetic_scores = [p.get('aesthetic_score', 0) for p in projects if p.get('aesthetic_score')]
            performance_scores = [p.get('performance_score', 0) for p in projects if p.get('performance_score')]

            memory['statistics']['average_aesthetic_score'] = sum(aesthetic_scores) / len(aesthetic_scores) if aesthetic_scores else 0
            memory['statistics']['average_performance_score'] = sum(performance_scores) / len(performance_scores) if performance_scores else 0

        # 統計技術使用
        tech_count = {}
        for project in projects:
            for tech in project.get('technologies', []):
                tech_count[tech] = tech_count.get(tech, 0) + 1

        memory['statistics']['technologies_used'] = tech_count
        self.save_longterm_memory(memory)

    def get_summary(self) -> Dict:
        """獲取記憶摘要"""
        memory = self.load_longterm_memory()
        return {
            "total_projects": memory['statistics']['total_projects'],
            "average_scores": {
                "aesthetic": memory['statistics']['average_aesthetic_score'],
                "performance": memory['statistics']['average_performance_score']
            },
            "knowledge_entries": {
                kb_type: len(entries)
                for kb_type, entries in memory['knowledge_base'].items()
            },
            "total_learnings": len(memory['learning_log'])
        }

    def _create_empty_memory(self) -> Dict:
        """創建空的記憶結構"""
        return {
            "metadata": {
                "version": "1.0",
                "created": datetime.now().isoformat()[:10],
                "last_updated": datetime.now().isoformat()[:10],
                "agent_version": "AURORA-1.0"
            },
            "projects": [],
            "knowledge_base": {
                "design_patterns": [],
                "best_practices": [],
                "client_preferences": [],
                "code_snippets": []
            },
            "learning_log": [],
            "statistics": {
                "total_projects": 0,
                "average_aesthetic_score": 0,
                "average_performance_score": 0,
                "technologies_used": {},
                "common_challenges": [],
                "success_rate": 0
            }
        }


if __name__ == "__main__":
    # 測試記憶管理器
    mm = MemoryManager()

    print("📊 記憶摘要:")
    summary = mm.get_summary()
    print(json.dumps(summary, indent=2, ensure_ascii=False))

    print("\n🔍 搜尋動畫相關知識:")
    animation_knowledge = mm.search_knowledge(tags=["animation"])
    for entry in animation_knowledge:
        print(f"  - {entry['title']} (評分: {entry['usefulness_score']})")
