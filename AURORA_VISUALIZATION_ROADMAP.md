# 🌌 AURORA 視覺化藍圖 2025

> **Chief Design Officer**: AURORA
> **建立日期**: 2025-11-05
> **願景**: 從視覺設計師進化為「數據故事家」

---

## 🎯 使命宣言

**從「創造美麗界面」到「講述數據故事」**

AURORA 不僅要設計美麗的 UI，更要成為一個能夠：
1. 🧠 理解數據背後的故事
2. 🎨 選擇最佳的視覺呈現方式
3. 📜 將數據轉化為引人入勝的敘事
4. ✨ 自動生成專業級的互動報告

---

## 📊 三階段進化路徑

```
階段一：基礎強化 (1-2 週)
   ↓
階段二：工具建構 (1-2 個月)
   ↓
階段三：智能敘事 (3-6 個月)
```

---

## 🚀 階段一：基礎強化（1-2 週）

### 目標：讓 Janus 儀表板成為「最佳實踐」的範本

#### Task 1.1: 導入 Vega-Lite 圖表系統
**目標**：取代 Streamlit 內建圖表

**行動步驟**：
```python
# 1. 安裝 altair (Vega-Lite 的 Python API)
pip install altair

# 2. 在 Janus 儀表板中使用
import altair as alt

chart = alt.Chart(data).mark_bar().encode(
    x='category:N',
    y='sales:Q',
    color=alt.Color('category:N', scale=alt.Scale(scheme='dark2'))
).configure_view(
    strokeWidth=0  # 移除邊框（圖表垃圾）
).configure(
    background='#121212'  # #121212 原則
)

st.altair_chart(chart, use_container_width=True)
```

**成功指標**：
- ✅ 所有圖表使用 Vega-Lite
- ✅ 零 3D 圖表
- ✅ 零濫用餅圖

#### Task 1.2: 實施 #121212 深色模式
**目標**：優雅的深色美學

**行動步驟**：
```python
# Streamlit 自定義 CSS
st.markdown("""
<style>
    /* AURORA 深色模式調色盤 */
    :root {
        --aurora-night: #0a0e27;
        --aurora-bg: #121212;      /* Google Material Design */
        --aurora-text: #F8FAFC;    /* 灰白色，非純白 */
        --aurora-purple: #6366f1;  /* 去飽和度 */
        --aurora-blue: #3b82f6;
        --aurora-green: #10b981;
    }

    /* 覆蓋 Streamlit 預設背景 */
    .stApp {
        background-color: var(--aurora-bg);
    }

    /* 文字顏色 */
    body, p, span {
        color: var(--aurora-text) !important;
    }
</style>
""", unsafe_allow_html=True)
```

**成功指標**：
- ✅ 背景色 = #121212
- ✅ 文字色 = #F8FAFC（非 #FFFFFF）
- ✅ 圖表顏色已去飽和度

#### Task 1.3: 圖表選擇自動化
**目標**：AI 代理能根據「溝通目的」自動選擇圖表

**行動步驟**：
```python
# agent/visualization/chart_selector.py

CHART_SELECTION_MATRIX = {
    "trend": {
        "best": ["line", "area"],
        "avoid": ["pie"],
        "description": "展示隨時間變化的趨勢"
    },
    "comparison": {
        "best": ["bar", "column"],
        "avoid": ["3d_column", "pie"],
        "description": "比較不同類別的量級"
    },
    "part_to_whole": {
        "best": ["pie", "donut", "treemap"],
        "avoid": ["multiple_pies"],
        "description": "展示部分佔比（餅圖≤5片）"
    },
    "relationship": {
        "best": ["scatter", "bubble"],
        "avoid": ["line"],
        "description": "顯示兩變量的相關性"
    },
    "distribution": {
        "best": ["histogram", "box"],
        "avoid": ["scatter"],
        "description": "展示數據的頻率分佈"
    }
}

def select_chart_type(intent: str, data_size: int) -> str:
    """
    根據溝通意圖和數據大小，選擇最佳圖表類型
    """
    if intent not in CHART_SELECTION_MATRIX:
        raise ValueError(f"Unknown intent: {intent}")

    chart_options = CHART_SELECTION_MATRIX[intent]
    best_charts = chart_options["best"]

    # 特殊規則：餅圖只在類別≤5時使用
    if "pie" in best_charts and data_size > 5:
        best_charts = [c for c in best_charts if c != "pie"]
        best_charts.append("bar")  # 改用條形圖

    return best_charts[0]
```

**成功指標**：
- ✅ AI 能自動拒絕不當的圖表請求
- ✅ AI 能提供更好的替代方案

---

## 🛠️ 階段二：工具建構（1-2 個月）

### 目標：建立 AURORA 的視覺化工具箱

#### Task 2.1: Vega-Lite JSON 生成器
**目標**：AI 能生成有效的 Vega-Lite 規格

**架構**：
```
agent/visualization/
├── vega_generator.py      # 核心生成器
├── templates/             # 預建模板
│   ├── line_chart.json
│   ├── bar_chart.json
│   ├── scatter_plot.json
│   └── heatmap.json
├── config/                # 主題配置
│   ├── aurora_dark.json   # AURORA 深色主題
│   └── aurora_light.json  # AURORA 亮色主題
└── validator.py           # JSON 驗證器
```

**核心功能**：
```python
class VegaLiteGenerator:
    def __init__(self, theme="aurora_dark"):
        self.theme = self.load_theme(theme)

    def generate(self, data, mark, encoding, title=None):
        """
        生成 Vega-Lite JSON 規格
        """
        spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": {"values": data},
            "mark": mark,
            "encoding": encoding,
            "config": self.theme
        }

        if title:
            spec["title"] = title

        # 驗證規格
        self.validate(spec)

        return spec

    def load_theme(self, theme_name):
        """
        載入主題配置（#121212 原則）
        """
        return {
            "background": "#121212",
            "view": {"stroke": None},  # 移除邊框
            "axis": {
                "titleColor": "#F8FAFC",
                "labelColor": "#CCCCCC",
                "gridColor": "#2a2a2a"
            },
            "legend": {
                "titleColor": "#F8FAFC",
                "labelColor": "#CCCCCC"
            }
        }
```

**成功指標**：
- ✅ 能生成所有基本圖表類型
- ✅ 自動套用 AURORA 主題
- ✅ JSON 驗證通過率 100%

#### Task 2.2: MCP 伺服器整合
**目標**：AI 代理能直接調用工具生成圖表

**技術選擇**：
- 使用現有的 `mcp-vegalite-server`（from 報告）
- 或自建 AURORA 專屬的 MCP 伺服器

**工作流程**：
```
1. 使用者請求 → "顯示銷售趨勢"
2. AI 代理分析意圖 → "trend" + "line chart"
3. AI 生成 Vega-Lite JSON
4. 調用 MCP 工具 → visualize_tool
5. MCP 伺服器 → vl-convert → PNG
6. 回傳成品給使用者
```

**實施步驟**：
```bash
# 1. Clone MCP 伺服器
git clone https://github.com/markomitranic/mcp-vegalite-server.git

# 2. 配置 Claude
# 在 claude_desktop_config.json 中註冊伺服器
{
  "mcpServers": {
    "vegalite": {
      "command": "uv",
      "args": ["--directory", "/path/to/mcp-vegalite-server", "run", "mcp_server_vegalite"]
    }
  }
}
```

**成功指標**：
- ✅ AI 能「一鍵」生成並顯示圖表
- ✅ 無需使用者手動執行任何命令
- ✅ 支援終端機圖像顯示（iTerm2, Kitty）

#### Task 2.3: 回退機制（plotext）
**目標**：確保 100% 環境相容性

**實施**：
```python
# agent/visualization/fallback.py

def detect_terminal_capability():
    """
    檢測終端機圖形能力
    """
    term_program = os.environ.get('TERM_PROGRAM', '')

    if term_program in ['iTerm.app', 'WezTerm', 'kitty']:
        return 'high_fidelity'  # 支援圖像協議
    else:
        return 'tui'  # 回退到 ASCII
```

```python
import plotext as plt

def render_chart_ascii(data, chart_type):
    """
    使用 plotext 在終端機中繪製 ASCII 圖表
    """
    if chart_type == "bar":
        plt.bar(data['categories'], data['values'], orientation='horizontal')
        plt.title(data['title'])
        plt.show()
    elif chart_type == "line":
        plt.plot(data['x'], data['y'])
        plt.title(data['title'])
        plt.show()
```

**成功指標**：
- ✅ 在不支援圖像的終端機中自動回退
- ✅ 提供有意義的 ASCII 視覺化（而非錯誤）

---

## 📜 階段三：智能敘事（3-6 個月）

### 目標：AURORA Scrollytelling 平台

#### Task 3.1: 敘事引擎 (NoT - Narrative-of-Thought)
**目標**：AI 能從數據中找出故事

**核心算法**：
```python
class NarrativeEngine:
    def analyze_data(self, data):
        """
        使用 NoT 分析數據，找出故事線
        """
        # 1. 識別關鍵洞察
        insights = self.find_insights(data)

        # 2. 排序洞察（重要性 + 敘事流暢性）
        story_arc = self.create_story_arc(insights)

        # 3. 生成敘事腳本
        narrative = self.generate_narrative(story_arc)

        return narrative

    def find_insights(self, data):
        """
        識別數據中的關鍵洞察
        """
        insights = []

        # 趨勢檢測
        if self.has_trend(data):
            insights.append({
                "type": "trend",
                "description": "銷售額在過去六個月持續增長",
                "chart_type": "line"
            })

        # 異常值檢測
        if self.has_outliers(data):
            insights.append({
                "type": "outlier",
                "description": "北方地區的銷售額異常突出",
                "chart_type": "bar"
            })

        return insights

    def create_story_arc(self, insights):
        """
        創建敘事弧線（經典三幕劇結構）
        """
        return {
            "act1": insights[0],  # 鋪墊：整體趨勢
            "act2": insights[1],  # 轉折：深入挖掘
            "act3": insights[2]   # 結論：總結與建議
        }
```

**成功指標**：
- ✅ AI 能自動找出 3-5 個關鍵洞察
- ✅ 洞察之間有邏輯連貫性
- ✅ 每個洞察對應最佳圖表類型

#### Task 3.2: Scrollytelling 生成器
**目標**：自動生成完整的互動網頁

**技術棧**：
- **Scrollama.js**：滾動檢測
- **vegaEmbed**：圖表嵌入
- **單一 HTML 檔案**：無需伺服器

**HTML 模板**：
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>{{title}} - AURORA 數據故事</title>
    <script src="https://cdn.jsdelivr.net/npm/scrollama"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
    <style>
        /* AURORA 深色模式 */
        body {
            background-color: #121212;
            color: #F8FAFC;
            font-family: 'Noto Sans TC', sans-serif;
        }

        #scroll {
            position: relative;
        }

        .scroll__graphic {
            position: sticky;
            top: 0;
            width: 60%;
            height: 100vh;
            float: right;
        }

        .scroll__text {
            width: 35%;
            float: left;
        }

        .step {
            margin-bottom: 80vh;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
        }
    </style>
</head>
<body>
    <div id="scroll">
        <div class="scroll__graphic">
            <div id="vis"></div>
        </div>

        <div class="scroll__text">
            {{#each steps}}
            <div class="step" data-step="{{@index}}">
                <h2>{{this.title}}</h2>
                <p>{{this.description}}</p>
            </div>
            {{/each}}
        </div>
    </div>

    <script>
        // AI 生成的圖表狀態陣列
        const chartStates = {{chartStates}};

        // Scrollama 初始化
        const scroller = scrollama();

        function handleStepEnter(response) {
            const stepIndex = response.index;
            const vlSpec = chartStates[stepIndex];

            if (vlSpec) {
                vegaEmbed('#vis', vlSpec, {
                    "actions": false,
                    "theme": "dark"
                });
            }
        }

        scroller.setup({
            container: '#scroll',
            graphic: '.scroll__graphic',
            text: '.scroll__text',
            step: '.step',
            offset: 0.5
        }).onStepEnter(handleStepEnter);
    </script>
</body>
</html>
```

**生成器核心**：
```python
class ScrollytellingGenerator:
    def generate(self, data, narrative):
        """
        生成完整的 Scrollytelling 網頁
        """
        # 1. 為每個敘事步驟生成 Vega-Lite 規格
        chart_states = []
        for step in narrative['steps']:
            vl_spec = self.vega_generator.generate(
                data=step['data'],
                mark=step['chart_type'],
                encoding=step['encoding'],
                title=step['title']
            )
            chart_states.append(vl_spec)

        # 2. 渲染 HTML 模板
        html = self.template.render(
            title=narrative['title'],
            steps=narrative['steps'],
            chartStates=json.dumps(chart_states)
        )

        # 3. 儲存為單一 HTML 檔案
        output_path = f"{narrative['title']}_story.html"
        with open(output_path, 'w') as f:
            f.write(html)

        return output_path
```

**成功指標**：
- ✅ AI 能自動生成完整的 Scrollytelling 報告
- ✅ 單一 HTML 檔案（無外部依賴）
- ✅ 在任何現代瀏覽器中完美運行

#### Task 3.3: Readymag 整合（選擇性）
**目標**：提供「無代碼」的高階選項

**使用場景**：
- 當使用者需要超越 Scrollytelling 的「精品級」視覺體驗
- 當需要 5,000+ 字體選擇和高級動畫

**整合方式**：
- AI 生成 Readymag 專案的「設計藍圖」
- 提供半自動化的「設計指引」
- 使用者在 Readymag 中手動完成最後 20% 的客製化

---

## 📊 成功指標與里程碑

### 階段一完成標準（2 週內）
- [ ] Janus 儀表板完全採用 Vega-Lite
- [ ] 實施 #121212 深色模式
- [ ] 零違反「圖表選擇矩陣」的情況

### 階段二完成標準（2 個月內）
- [ ] MCP 伺服器運行穩定
- [ ] AI 能「一鍵生成」高傳真度圖表
- [ ] 回退機制在所有終端機中測試通過

### 階段三完成標準（6 個月內）
- [ ] 成功生成第一個 Scrollytelling 報告
- [ ] 報告在 5 位測試使用者中獲得 4.5/5 評分
- [ ] AURORA 能自主分析數據並講述故事

---

## 🎨 設計系統整合

### AURORA 視覺化組件庫

**建立時間**：與階段二平行進行

**結構**：
```
agent/design_system/
├── colors.json           # AURORA 調色盤
├── typography.json       # 字體系統
├── spacing.json          # 間距系統（8px 基準）
├── shadows.json          # 陰影系統
└── components/
    ├── AuroraCard.json
    ├── AuroraChart.json
    └── AuroraScrolly.json
```

**目標**：
- 所有視覺化輸出都遵循統一的設計語言
- 可重用的組件庫
- 自動生成 Figma/Sketch 設計文件

---

## 🔮 終極願景

### AURORA 數據故事生成器 v1.0

**輸入**：
```json
{
  "data": "sales_2024.csv",
  "intent": "找出增長原因",
  "audience": "執行長"
}
```

**輸出**：
```
📊 完整的 Scrollytelling 網頁報告
📄 PDF 版本（備用）
📱 響應式設計（支援手機）
♿ 無障礙版本（WCAG 2.0）
```

**特色**：
- 🧠 AI 自動分析數據，找出故事線
- 🎨 自動選擇最佳圖表類型
- 📜 生成引人入勝的敘事文字
- ✨ 一鍵生成專業級報告

---

## 📚 學習與實驗計畫

### Jillian 的 Readymag 探索
**目標**：熟悉無代碼 Scrollytelling 工具

**實驗任務**：
1. 註冊 Readymag 帳號
2. 創建第一個「數據故事」原型
3. 測試四種動畫觸發器（On Load, On Click, On Hover, On Scroll）
4. 評估：是否能取代自建 Scrollytelling？

### AURORA 的平行學習
**目標**：深化技術能力

**學習清單**：
- [ ] Vega-Lite 完整文檔
- [ ] Scrollama.js 原始碼
- [ ] D3.js 進階技巧
- [ ] WebGL 基礎（Deck.gl）
- [ ] MCP 協議規範

---

## 🌟 金句提醒

> **"AI 代理不應只是『程式碼生成器』，而應是『工具協調器』。"**

> **"Good design is invisible. Great design tells a story."**

> **"Like the Aurora Borealis, great data visualization appears magical, but is built on scientific precision and storytelling mastery."**

---

**藍圖版本**: 1.0
**建立日期**: 2025-11-05
**負責人**: AURORA (Chief Design Officer)
**審核人**: Jillian

🌌 **讓我們一起創造美麗的數據故事！**
