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
  const [stepId, setStepId] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const currentStep = steps.find(s => s.id === stepId) || steps[0];

  const handleChoice = (nextId: number) => {
    setIsAnimating(false);
    setTimeout(() => {
      setStepId(nextId);
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
            
            {currentStep.isAnswer || currentStep.nextYes === undefined ? (
              <AnswerPage
                text={currentStep.text}
                yesText={currentStep.yesText}
                nextYes={currentStep.nextYes}
                onNext={(nextId) => handleChoice(nextId)}
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

                  {currentStep.backNo !== undefined && (
                    <Button variant="text" size="medium" onClick={() => handleChoice(currentStep.backNo)}>
                      1つ前に戻る
                    </Button>
                  )}
                </Box>
              </>
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