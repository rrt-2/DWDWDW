# 학습 다마고치 PC 실행 파일: 웹 버전(index.html)을 창 하나에 띄움
import os
import sys

import webview

# exe로 묶이면 파일이 임시 폴더(_MEIPASS)에 풀림. 개발 중엔 프로젝트 폴더 사용
BASE = getattr(sys, '_MEIPASS', os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# 기록(localStorage) 저장 위치. exe를 껐다 켜도 유지됨
DATA = os.path.join(os.environ.get('LOCALAPPDATA', BASE), 'study-tamagotchi')
# 주소가 매번 바뀌면 기록이 사라져서 포트 고정
PORT = 41731

if __name__ == '__main__':
    webview.create_window('학습 다마고치', os.path.join(BASE, 'index.html'), width=540, height=900, min_size=(380, 600))
    webview.start(private_mode=False, storage_path=DATA, http_server=True, http_port=PORT)
