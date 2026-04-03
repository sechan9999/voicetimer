# 🎙️ Voice Timer (보이스 타이머)

> 음성 명령으로 제어하는 스마트한 React Native 보이스 타이머 앱입니다. 
> 운동, 요리, 작업 시 손을 쓰지 않고도 "5분 타이머 시작"과 같은 명령으로 타이머를 자유롭게 조절하세요.

![Voice Timer UI Mockup](https://raw.githubusercontent.com/sechan9999/voicetimer/main/assets/mockup.png)

---

## ✨ 핵심 기능 (Key Features)

- **🗣️ 고성능 음성 명령 인식**: 한국어와 영어를 모두 지원하는 NLP 패턴 매칭 엔진을 탑재하여 "시작", "정지", "5분 타이머", "포모도로" 등의 명령을 500ms 이내에 처리합니다.
- **🕒 트리플 타이머 시스템**: 최대 3개의 독립적인 타이머 슬롯을 동시에 운영하며, 탭 한 번으로 활성 타이머를 쉽고 빠르게 전환할 수 있습니다.
- **🎨 3가지 프리미엄 테마**: 사용자 취향과 상황에 맞게  다크(Dark), 라이트(Light), 포모도로(Pomodoro) 테마를 제공하며, 부드러운 애니메이션 전환 효과가 적용되어 있습니다.
- **⚙️ 햅틱 & TTS 피드백**: 타이머 시작/종료와 음성 인식 성공 시 `expo-haptics`를 통한 진동 피드백과 `expo-speech`를 통한 음성 안내를 제공합니다.
- **📊 클라우드 동기화**: Firebase Firestore를 연동하여 세션 히스토리와 커스텀 프리셋을 저장하고 관리합니다 (Native 지원).

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: [Expo](https://expo.dev/) (SDK 54/55) / [React Native](https://reactnative.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (Link-based routing)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Local/Global persistence)
- **Animation**: [React Native Reanimated 3](https://docs.swmansion.com/react-native-reanimated/) (UI-thread native animations)
- **Database/Analytics**: [Firebase Firestore](https://firebase.google.com/docs/firestore) & [Analytics](https://firebase.google.com/docs/analytics)
- **Voice/Speech**: [@react-native-voice/voice](https://github.com/react-native-voice/voice) & [expo-speech](https://docs.expo.dev/versions/latest/sdk/speech/)

## 🚀 빠른 시작 (Getting Started)

### 1. 의존성 설치
```bash
npm install
```

### 2. 로컬 실행 (Web/Mobile)
```bash
# 브라우저에서 실행 (Web Mock 모드)
npx expo start --web

# 스마트폰 Expo Go에서 실행 (QR 코드 스캔)
npx expo start
```

### 3. 네이티브 빌드 전 필수 설정
- Android 기기 또는 iOS 시뮬레이터에서 `@react-native-firebase` 및 음성 기능을 사용하려면 `npx expo prebuild`를 통해 네이티브 코드를 생성해야 합니다.
- `app.json`에 정의된 플러그인 설정이 빌드 프로세스에 자동으로 반영됩니다.

## 📁 프로젝트 구조 (Project Structure)

```text
app/                  # Expo Router (Tabs)
src/
  ├── components/     # UI 컴포넌트 (CircularTimer, VoiceButton 등)
  ├── hooks/          # 커스텀 훅 (useTimer, useVoice, useTTS)
  ├── store/          # 상태 저장소 (Zustand)
  ├── theme/          # 디자인 토큰 (Colors, Typography)
  └── services/       # 비즈니스 로직 (NLP Parser, Firebase)
```

## 📜 라이선스 (License)

본 프로젝트는 Apache-2.0 라이선스를 따릅니다.
ⓒ 2024 sechan9999. All Rights Reserved.
