// src/AnswerPage.tsx
import { Box, Button, Typography } from '@mui/material';

interface AnswerPageProps {
  text: string;
  yesText?: string;
  nextYes?: number;
  onNext: (id: number) => void;
  onBack: () => void;
}

export default function AnswerPage({ text, yesText, nextYes, onNext, onBack }: AnswerPageProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'center', my: 2, width: '100%' }}>
      
      <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
        🎉 診断結果・対処法
      </Typography>

      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, textAlign: 'center', px: 2 }}>
        {text}
      </Typography>
      
      {nextYes !== undefined ? (
        <Button variant="contained" color="success" size="large" onClick={() => onNext(nextYes)} sx={{ mt: 2 }}>
          {yesText || "次へ"}
        </Button>
      ) : (
        <Button variant="contained" color="success" size="large" onClick={() => onNext(0)} sx={{ mt: 2 }}>
          {yesText || "トップに戻って最初からやり直す"}
        </Button>
      )}

      <Button variant="text" size="medium" onClick={onBack}>
        1つ前に戻る
      </Button>
      
    </Box>
  );
}