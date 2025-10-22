#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
王一隆知識圖譜建立腳本
Build Wang Yilong Knowledge Graph in Neo4j
"""

from neo4j import GraphDatabase
import json
from datetime import datetime

# Neo4j 連接配置
NEO4J_URI = "bolt://127.0.0.1:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "graphrag2025"


class WangYilongKnowledgeGraph:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def clear_wang_yilong_data(self):
        """清除王一隆相關數據（可選）"""
        with self.driver.session() as session:
            session.run("""
                MATCH (n)
                WHERE n.id STARTS WITH 'wang_yilong'
                   OR n.name = '王一隆'
                   OR n.name IN ['張學友', '莫文蔚', '蕭亞軒', '李宗盛']
                DETACH DELETE n
            """)
            print("✅ 清除舊數據完成")

    def create_wang_yilong_artist(self):
        """創建王一隆藝人節點"""
        with self.driver.session() as session:
            result = session.run("""
                CREATE (wang:Artist {
                    id: 'wang_yilong_001',
                    name: '王一隆',
                    name_en: 'Wang Yilong',
                    artist_type: 'HUMAN',
                    birth_year: 1970,
                    genres: ['Electronic', 'Dance', 'Pop', 'Rock'],
                    debut_date: '1990-01-01',
                    label: 'Tactus',
                    status: 'active',
                    roles: ['composer', 'producer', 'arranger'],
                    career_span: '1990-2024',
                    monthly_listeners: 65,
                    total_streams: 0,
                    legacy_level: 'master',
                    philosophy: '靈魂與本質高於一切',
                    description: '華語流行音樂作曲家，幕後的靈魂，用音符編織時代記憶',
                    created_at: datetime($timestamp)
                })
                RETURN wang
            """, timestamp=datetime.now().isoformat())
            print("✅ 創建王一隆藝人節點")
            return result.single()

    def create_songs(self):
        """創建經典作品節點"""
        songs_data = [
            {
                'id': 'song_001',
                'title': '你好毒',
                'title_en': 'You Are So Poisonous',
                'release_date': '1999-11-01',
                'album': '走過1999',
                'genre': ['rock', 'pop'],
                'key': 'E Minor',
                'bpm': 120,
                'duration': 240,
                'impact_score': 9.5,
                'description': '張學友突破性搖滾作品，展現歌神不為人知的叛逆一面'
            },
            {
                'id': 'song_002',
                'title': '寂寞的戀人啊',
                'title_en': 'Lonely Lovers',
                'release_date': '2000-05-01',
                'album': '十二樓的莫文蔚',
                'genre': ['ballad', 'urban_pop'],
                'key': 'D Minor',
                'bpm': 80,
                'duration': 280,
                'impact_score': 9.8,
                'description': '李宗盛製作，莫文蔚傳世經典，都會情感的極致表達'
            },
            {
                'id': 'song_003',
                'title': '準備好了沒有',
                'title_en': 'Are You Ready',
                'release_date': '2000-08-01',
                'album': '紅薔薇',
                'genre': ['dance', 'electronic'],
                'key': 'C Major',
                'bpm': 128,
                'duration': 220,
                'impact_score': 8.8,
                'description': '蕭亞軒電音舞曲代表作，注入舞動能量'
            }
        ]

        with self.driver.session() as session:
            for song in songs_data:
                session.run("""
                    CREATE (s:Song {
                        id: $id,
                        title: $title,
                        title_en: $title_en,
                        release_date: date($release_date),
                        album: $album,
                        genre: $genre,
                        key: $key,
                        bpm: $bpm,
                        duration: $duration,
                        impact_score: $impact_score,
                        description: $description
                    })
                """, **song)
                print(f"✅ 創建作品：{song['title']}")

    def create_collaborators(self):
        """創建合作藝人節點"""
        collaborators = [
            {
                'id': 'artist_jacky_cheung',
                'name': '張學友',
                'name_en': 'Jacky Cheung',
                'role': 'singer',
                'status': '歌神',
                'description': '四大天王之一，華語樂壇傳奇'
            },
            {
                'id': 'artist_karen_mok',
                'name': '莫文蔚',
                'name_en': 'Karen Mok',
                'role': 'singer',
                'status': '天后',
                'description': '跨界音樂才女，國際知名華語歌手'
            },
            {
                'id': 'artist_elva_hsiao',
                'name': '蕭亞軒',
                'name_en': 'Elva Hsiao',
                'role': 'singer',
                'status': '亞洲舞娘',
                'description': '電音舞曲天后，2000年代流行代表'
            },
            {
                'id': 'producer_li_zongsheng',
                'name': '李宗盛',
                'name_en': 'Jonathan Lee',
                'role': 'producer',
                'status': '音樂教父',
                'description': '華語流行音樂金牌製作人'
            }
        ]

        with self.driver.session() as session:
            for person in collaborators:
                session.run("""
                    CREATE (a:Artist {
                        id: $id,
                        name: $name,
                        name_en: $name_en,
                        role: $role,
                        status: $status,
                        description: $description
                    })
                """, **person)
                print(f"✅ 創建合作者：{person['name']}")

    def create_awards(self):
        """創建獎項節點"""
        with self.driver.session() as session:
            session.run("""
                CREATE (award:Award {
                    id: 'award_001',
                    name: '世界閩南語金曲盛典 - 最佳作曲人獎',
                    name_en: 'World Hokkien Music Awards - Best Composer',
                    year: 2024,
                    date: date('2024-11-01'),
                    organization: '世界閩南語金曲盛典',
                    location: '廈門',
                    significance: 'transcendence',
                    description: '跨越語種與曲風疆界的創作能力認可'
                })
            """)
            print("✅ 創建獎項：2024 最佳作曲人獎")

    def create_eras(self):
        """創建音樂時代節點"""
        eras = [
            {
                'id': 'era_90s',
                'name': '1990s - 電音起點',
                'period': '1990-1999',
                'style': 'Electronic Dance Music',
                'color': '#764ba2',
                'description': '從 Coco 李玟開始的電子音樂探索'
            },
            {
                'id': 'era_00s',
                'name': '2000s - 金曲巔峰',
                'period': '2000-2009',
                'style': 'Pop & Rock',
                'color': 'linear-gradient(#f5576c, #4facfe)',
                'description': '與天王天后合作，創作黃金年代'
            },
            {
                'id': 'era_10s',
                'name': '2010s - 持續探索',
                'period': '2010-2019',
                'style': 'Experimental',
                'color': '#00f2fe',
                'description': '跨界實驗與製作人角色深化'
            },
            {
                'id': 'era_20s',
                'name': '2020s - 跨界獲獎',
                'period': '2020-2024',
                'style': 'Cross-cultural',
                'color': 'linear-gradient(#43e97b, #667eea)',
                'description': '語種融合，文化橋樑'
            }
        ]

        with self.driver.session() as session:
            for era in eras:
                session.run("""
                    CREATE (e:Era {
                        id: $id,
                        name: $name,
                        period: $period,
                        style: $style,
                        color: $color,
                        description: $description
                    })
                """, **era)
                print(f"✅ 創建時代：{era['name']}")

    def create_relationships(self):
        """創建所有關係"""
        with self.driver.session() as session:
            # 王一隆 COMPOSED 作品
            session.run("""
                MATCH (wang:Artist {id: 'wang_yilong_001'})
                MATCH (song:Song {id: 'song_001'})
                CREATE (wang)-[:COMPOSED {
                    year: 1999,
                    role: 'composer',
                    impact: 9.5,
                    emotion: 'rebellious'
                }]->(song)
            """)
            print("✅ 關聯：王一隆 -> 你好毒")

            session.run("""
                MATCH (wang:Artist {id: 'wang_yilong_001'})
                MATCH (song:Song {id: 'song_002'})
                CREATE (wang)-[:COMPOSED {
                    year: 2000,
                    role: 'composer',
                    impact: 9.8,
                    emotion: 'melancholic'
                }]->(song)
            """)
            print("✅ 關聯：王一隆 -> 寂寞的戀人啊")

            session.run("""
                MATCH (wang:Artist {id: 'wang_yilong_001'})
                MATCH (song:Song {id: 'song_003'})
                CREATE (wang)-[:COMPOSED {
                    year: 2000,
                    role: 'composer',
                    impact: 8.8,
                    emotion: 'energetic'
                }]->(song)
            """)
            print("✅ 關聯：王一隆 -> 準備好了沒有")

            # 藝人 PERFORMED 作品
            session.run("""
                MATCH (jacky:Artist {id: 'artist_jacky_cheung'})
                MATCH (song:Song {id: 'song_001'})
                CREATE (jacky)-[:PERFORMED {album: '走過1999'}]->(song)
            """)
            print("✅ 關聯：張學友 -> 你好毒")

            session.run("""
                MATCH (karen:Artist {id: 'artist_karen_mok'})
                MATCH (song:Song {id: 'song_002'})
                CREATE (karen)-[:PERFORMED {album: '十二樓的莫文蔚'}]->(song)
            """)
            print("✅ 關聯：莫文蔚 -> 寂寞的戀人啊")

            session.run("""
                MATCH (elva:Artist {id: 'artist_elva_hsiao'})
                MATCH (song:Song {id: 'song_003'})
                CREATE (elva)-[:PERFORMED {album: '紅薔薇'}]->(song)
            """)
            print("✅ 關聯：蕭亞軒 -> 準備好了沒有")

            # 王一隆 COLLABORATED_WITH 藝人
            collaborations = [
                ('artist_jacky_cheung', '張學友', '你好毒', 1999),
                ('artist_karen_mok', '莫文蔚', '寂寞的戀人啊', 2000),
                ('artist_elva_hsiao', '蕭亞軒', '準備好了沒有', 2000),
                ('producer_li_zongsheng', '李宗盛', '寂寞的戀人啊', 2000)
            ]

            for artist_id, artist_name, project, year in collaborations:
                session.run("""
                    MATCH (wang:Artist {id: 'wang_yilong_001'})
                    MATCH (collaborator:Artist {id: $artist_id})
                    CREATE (wang)-[:COLLABORATED_WITH {
                        project: $project,
                        year: $year,
                        relationship: 'professional'
                    }]->(collaborator)
                """, artist_id=artist_id, project=project, year=year)
                print(f"✅ 關聯：王一隆 <-> {artist_name}")

            # 李宗盛 PRODUCED 寂寞的戀人啊
            session.run("""
                MATCH (li:Artist {id: 'producer_li_zongsheng'})
                MATCH (song:Song {id: 'song_002'})
                CREATE (li)-[:PRODUCED {
                    year: 2000,
                    role: 'producer',
                    note: '金牌製作人'
                }]->(song)
            """)
            print("✅ 關聯：李宗盛 PRODUCED -> 寂寞的戀人啊")

            # 王一隆 RECEIVED 獎項
            session.run("""
                MATCH (wang:Artist {id: 'wang_yilong_001'})
                MATCH (award:Award {id: 'award_001'})
                CREATE (wang)-[:RECEIVED {
                    date: date('2024-11-01'),
                    significance: 'transcendence',
                    note: '跨越語種與曲風的卓越創作能力'
                }]->(award)
            """)
            print("✅ 關聯：王一隆 -> 2024 獎項")

            # 作品 BELONGS_TO 時代
            song_era_mapping = [
                ('song_001', 'era_90s'),
                ('song_002', 'era_00s'),
                ('song_003', 'era_00s')
            ]

            for song_id, era_id in song_era_mapping:
                session.run("""
                    MATCH (song:Song {id: $song_id})
                    MATCH (era:Era {id: $era_id})
                    CREATE (song)-[:BELONGS_TO]->(era)
                """, song_id=song_id, era_id=era_id)
                print(f"✅ 關聯：作品 -> 時代")

    def create_visual_dna_nodes(self):
        """創建視覺DNA節點"""
        with self.driver.session() as session:
            # 為每個時代創建視覺DNA
            visual_dnas = [
                {
                    'era_id': 'era_90s',
                    'color_primary': '#764ba2',
                    'style': 'geometric_minimal',
                    'animation': 'sharp_beats',
                    'mood': 'pioneering'
                },
                {
                    'era_id': 'era_00s',
                    'color_primary': 'linear-gradient(#f5576c, #4facfe)',
                    'style': 'fluid_organic',
                    'animation': 'smooth_transitions',
                    'mood': 'peak_flow'
                },
                {
                    'era_id': 'era_10s',
                    'color_primary': '#00f2fe',
                    'style': 'experimental_fusion',
                    'animation': 'glitch_effects',
                    'mood': 'exploration'
                },
                {
                    'era_id': 'era_20s',
                    'color_primary': 'linear-gradient(#43e97b, #667eea)',
                    'style': 'holistic_harmony',
                    'animation': 'breathing_pulse',
                    'mood': 'transcendence'
                }
            ]

            for dna in visual_dnas:
                session.run("""
                    MATCH (era:Era {id: $era_id})
                    CREATE (vdna:VisualDNA {
                        id: $era_id + '_visual',
                        color_primary: $color_primary,
                        style: $style,
                        animation: $animation,
                        mood: $mood
                    })
                    CREATE (era)-[:HAS_VISUAL_DNA]->(vdna)
                """, **dna)
                print(f"✅ 創建視覺DNA：{dna['era_id']}")

    def query_wang_yilong_graph(self):
        """查詢並顯示王一隆知識圖譜"""
        with self.driver.session() as session:
            # 統計
            result = session.run("""
                MATCH (wang:Artist {id: 'wang_yilong_001'})
                OPTIONAL MATCH (wang)-[:COMPOSED]->(songs:Song)
                OPTIONAL MATCH (wang)-[:COLLABORATED_WITH]->(collaborators)
                OPTIONAL MATCH (wang)-[:RECEIVED]->(awards)
                RETURN
                    wang.name as name,
                    count(DISTINCT songs) as song_count,
                    count(DISTINCT collaborators) as collaborator_count,
                    count(DISTINCT awards) as award_count
            """)

            stats = result.single()
            print("\n" + "="*60)
            print("🎵 王一隆知識圖譜統計")
            print("="*60)
            print(f"藝人: {stats['name']}")
            print(f"作品數: {stats['song_count']}")
            print(f"合作者: {stats['collaborator_count']}")
            print(f"獲獎: {stats['award_count']}")
            print("="*60 + "\n")

            # 詳細作品列表
            result = session.run("""
                MATCH (wang:Artist {id: 'wang_yilong_001'})-[r:COMPOSED]->(song:Song)
                MATCH (performer:Artist)-[:PERFORMED]->(song)
                RETURN
                    song.title as title,
                    song.release_date as release_date,
                    performer.name as performer,
                    r.impact as impact
                ORDER BY song.release_date
            """)

            print("📀 代表作品：")
            for record in result:
                print(f"  • {record['title']} - {record['performer']} ({record['release_date'].year}) [影響力: {record['impact']}]")

            print("\n✅ 知識圖譜建立完成！")
            print("\n💡 訪問 Neo4j Browser: http://localhost:7474")
            print("   運行查詢: MATCH (n) WHERE n.name = '王一隆' RETURN n")


def main():
    print("🚀 開始建立王一隆知識圖譜...")
    print("="*60)

    kg = WangYilongKnowledgeGraph(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD)

    try:
        # 可選：清除舊數據
        # kg.clear_wang_yilong_data()

        # 創建節點
        kg.create_wang_yilong_artist()
        kg.create_songs()
        kg.create_collaborators()
        kg.create_awards()
        kg.create_eras()
        kg.create_visual_dna_nodes()

        # 創建關係
        kg.create_relationships()

        # 查詢統計
        kg.query_wang_yilong_graph()

    finally:
        kg.close()

    print("\n🎉 知識圖譜建立成功！")


if __name__ == "__main__":
    main()
