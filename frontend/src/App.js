import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = (predictionResult) => {
    setResult(predictionResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Box display="flex" alignItems="center" gap={3}>
              <Text fontSize="6xl" color="chili.red">🌶️</Text>
              <Heading
                as="h1"
                size="2xl"
                bgGradient="linear(to-r, chili.red, chili.orange)"
                bgClip="text"
              >
                Chili Plant Care Assistant
              </Heading>
            </Box>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Upload a photo of your chili plant to detect nutrient deficiencies 
              and get personalized organic fertilizer recommendations
            </Text>
          </VStack>

          {/* Main Content */}
          {!result ? (
            <ImageUploader 
              onPrediction={handlePrediction} 
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <ResultDisplay 
              result={result} 
              onReset={handleReset} 
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
