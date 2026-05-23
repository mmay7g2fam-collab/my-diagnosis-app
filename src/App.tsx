import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Fade, 
  Container,
  CssBaseline 
} from '@mui/material';
import AnswerPage from './AnswerPage';

const steps = [
  {
    id: 0,
    text: "タスクバーにWi-Fiマークは出ていますか？",
    yesText: "ある",
    noText: "ない",
    nextYes: 1,
    nextNo: 2,
  },
  {
    id: 1,
    text: "接続したいSSIDがリストにあるか確認して下さい。リストに存在しますか？",
    yesText: "存在する",
    noText: "存在しない",
    nextYes: 2,
    nextNo: 2,
    backNo: 0,
  },
  {
    id: 2,
    text: "SSIDの下部にある表示は、以下のどちらですか？",
    yesText: "インターネットなし、セキュリティ保護あり",
    noText: "接続済み、セキュリティ保護あり",
    nextYes: 3,
    nextNo: 4,
    backNo: 1,
  },
  {
    id: 3,
    text: "設定アプリを起動して、ネットワークとインターネットを開きましょう。「既知のネットワークの管理」は存在しますか？",
    yesText: "存在する",
    noText: "存在しない",
    nextYes: 4,
    nextNo: 5,
    backNo: 2,
  },
  {
    id: 4,
    text: "帯電による一時的な不具合の可能性が高いです。充電アダプタやLANケーブルなど、PCに接続している外部媒体をすべて取り外して次ページの操作で完全シャットダウン（放電）を行ってください",
    yesText: "次へ",
    nextYes: 5, 
    backNo: 3,
    isAnswer: true,
  },
  {
    id: 5,
    text: "※シャットダウン後、必ず30分間以上は放置（放電）してください※放電中、PCの操作や取り外した外部媒体などの取り付けを一切行わないでください※放電後、電源を入れて改善を確認してくださいQ もし改善しなかったら？管理者にお問い合わせいただき、放電を実施するも改善がなかった旨を申し伝えください",
    yesText: "スタートへ戻る",
    nextYes: 0,
    backNo: 4,
    isAnswer: true,
  }
];

export default function App() {
  // 💡 画面の状態を管理する設定（'start': 開始, 'device': 機種選択, 'diagnostic': 診断中）
  const [phase, setPhase] = useState<'start' | 'device' | 'diagnostic'>('start');
  const [stepId, setStepId] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [device, setDevice] = useState<string>(''); // 選んだ機種を保存する場所

  const currentStep = steps.find((s) => s.id === stepId) || steps[0];

  const handleChoice = (nextId: number) => {
    setIsAnimating(false);
    setTimeout(() => {
      setStepId(nextId);
      setIsAnimating(true);
    }, 200);
  };

  // アプリをはじめからやり直す処理
  const resetApp = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setPhase('start');
      setStepId(0);
      setDevice('');
      setIsAnimating(true);
    }, 200);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <Container maxWidth={false} sx={{ maxWidth: '700px' }}>
          <Fade in={isAnimating}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <Box sx={{ bgcolor: '#1976d2', p: 2, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'white' }}>ネットワーク診断</Typography>
              </Box>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
 <CardContent sx={{ p: 4, textAlign: 'center' }}>
            
 {/* --- ① スタート画面 --- */}
            {phase === 'start' && (
              <Box>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>こんにちは</Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                  PCのトラブルを一緒に解決しましょう。
                </Typography>
                <Button variant="contained" size="large" fullWidth onClick={() => setPhase('device')}>
                  診断をはじめる
                </Button>
              </Box>
            )}

            {/* --- ② 機種選択画面 --- */}
            {phase === 'device' && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>お使いのPCを選んでください</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Surface', 'Dell'].map((name) => (
                    <Button key={name} variant="outlined" size="large" onClick={() => {
                      setDevice(name);
                      setPhase('diagnostic');
                    }}>
                      {name}
                    </Button>
                  ))}
                </Box>
              
              </Box>
            )}

            {/* --- ③ 診断画面 --- */}
            {phase === 'diagnostic' && (
              <Box>
                <Typography 
  variant="caption" 
  sx={{ display: 'block', mb: 2, color: 'text.secondary', fontSize: '0.75rem' }}
>
  選択中の機種: {device}
</Typography>
                {currentStep.isAnswer || currentStep.nextYes === undefined ? (
                  <AnswerPage
                    text={currentStep.text}
                    yesText={currentStep.yesText}
                    nextYes={currentStep.nextYes}
                    onNext={(nextId) => {
                      if (nextId === 0) resetApp();
                      else handleChoice(nextId);
                    }}
                    onBack={() => handleChoice(currentStep.backNo || 0)}
                  />
                ) : (
                  <>
                    <Typography variant="h5" sx={{ mb: 4 }}>{currentStep.text}</Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button variant="contained" size="large" onClick={() => handleChoice(currentStep.nextYes!)}>
                        {currentStep.yesText}
                      </Button>

                      {currentStep.noText && (
                        <Button variant="outlined" size="large" onClick={() => handleChoice(currentStep.nextNo!)}>
                          {currentStep.noText}
                        </Button>
                      )}

                      <Button variant="text" size="medium" onClick={() => {
                        if (stepId === 0) setPhase('device');
                        else handleChoice(currentStep.backNo || 0);
                      }}>
                        機種選択へ戻る
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            )}

          </CardContent>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    </React.Fragment>
  );
}