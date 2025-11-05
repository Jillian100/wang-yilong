#!/usr/bin/env python3
"""
AURORA Scrollytelling - Command Line Interface

使用方式:
    python aurora.py create content.md
    python aurora.py preview output/
    python aurora.py --help

Author: AURORA (Chief Design Officer)
Date: 2025-11-05
"""

import sys
import argparse
from pathlib import Path

# 加入 src 路徑
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from parser.content_parser import ContentParser
from generator.html_generator import HTMLGenerator


def create_website(content_file: Path, output_dir: Path):
    """
    建立 Scrollytelling 網站

    Args:
        content_file: 內容檔案路徑（Markdown + YAML）
        output_dir: 輸出目錄
    """
    print(f"🌌 AURORA Scrollytelling Platform")
    print(f"📄 讀取內容: {content_file}")

    # 解析內容
    parser = ContentParser(content_file)
    data = parser.parse()

    print(f"✅ 解析完成！")
    print(f"   - 標題: {data['metadata'].get('title', 'Untitled')}")
    print(f"   - 場景數: {len(data['scenes'])}")

    # 生成 HTML
    generator = HTMLGenerator(data['metadata'], data['scenes'])
    html = generator.generate()

    # 建立輸出目錄
    output_dir.mkdir(parents=True, exist_ok=True)

    # 寫入 HTML
    output_file = output_dir / 'index.html'
    output_file.write_text(html, encoding='utf-8')

    print(f"✅ 網站生成完成！")
    print(f"   - 輸出: {output_file}")
    print(f"\n🚀 使用以下指令預覽：")
    print(f"   cd {output_dir.parent}")
    print(f"   python -m http.server 8000")
    print(f"   然後開啟: http://localhost:8000/{output_dir.name}/")


def preview_website(output_dir: Path):
    """啟動預覽伺服器"""
    import http.server
    import socketserver
    import os

    os.chdir(output_dir.parent)
    PORT = 8000

    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", PORT), Handler)

    print(f"🌌 AURORA Scrollytelling 預覽伺服器")
    print(f"🌐 開啟瀏覽器訪問: http://localhost:{PORT}/{output_dir.name}/")
    print(f"⏹️  按 Ctrl+C 停止")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 伺服器已停止")
        httpd.shutdown()


def main():
    parser = argparse.ArgumentParser(
        description='🌌 AURORA Scrollytelling Platform - 絲滑的故事滾動生成工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
範例:
  建立網站:
    python aurora.py create content.md
    python aurora.py create content.md -o ./website

  預覽網站:
    python aurora.py preview ./website

  完整流程:
    python aurora.py create examples/music-showcase/content.md -o ./output
    python aurora.py preview ./output
        """
    )

    subparsers = parser.add_subparsers(dest='command', help='指令')

    # create 指令
    create_parser = subparsers.add_parser('create', help='建立 Scrollytelling 網站')
    create_parser.add_argument('content', type=Path, help='內容檔案 (Markdown + YAML)')
    create_parser.add_argument('-o', '--output', type=Path, default=Path('./output'),
                              help='輸出目錄 (預設: ./output)')

    # preview 指令
    preview_parser = subparsers.add_parser('preview', help='預覽網站')
    preview_parser.add_argument('directory', type=Path, help='網站目錄')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    if args.command == 'create':
        if not args.content.exists():
            print(f"❌ 找不到檔案: {args.content}")
            return
        create_website(args.content, args.output)

    elif args.command == 'preview':
        if not args.directory.exists():
            print(f"❌ 找不到目錄: {args.directory}")
            return
        preview_website(args.directory)


if __name__ == "__main__":
    main()
