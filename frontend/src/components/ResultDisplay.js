import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Grid,
  GridItem,
  Icon,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { 
  FiSun, 
  FiDroplet, 
  FiPackage, 
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle 
} from 'react-icons/fi';
import { GiChemicalDrop, GiPlantRoots } from 'react-icons/gi';

const ResultDisplay = ({ result, onReset }) => {
  const { prediction, confidence, recommendation } = result;

  const getStatusColor = (prediction) => {
    if (prediction === 'healthy') return 'green';
    return 'orange';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'red';
      case 'moderate':
        return 'orange';
      case 'none':
        return 'green';
      default:
        return 'gray';
    }
  };

  const InfoCard = ({ icon, label, value, colorScheme = 'brand' }) => (
    <Card variant="outline" size="sm">
      <CardBody>
        <VStack align="start" spacing={2}>
          <HStack>
            <Icon as={icon} color={`${colorScheme}.500`} boxSize={5} />
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              {label}
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold" color="gray.800">
            {value}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box w="100%" maxW="800px">
      <VStack spacing={6} align="stretch">
        {/* Status Card */}
        <Card
          bg={prediction === 'healthy' ? 'green.50' : 'orange.50'}
          borderColor={getStatusColor(prediction)}
          borderWidth="2px"
          shadow="lg"
        >
          <CardBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="100%">
                <HStack>
                  <Icon
                    as={prediction === 'healthy' ? FiCheckCircle : FiAlertCircle}
                    boxSize={8}
                    color={`${getStatusColor(prediction)}.500`}
                  />
                  <Heading size="lg" color="gray.800">
                    {prediction === 'healthy' ? 'Plant is Healthy!' : `${prediction} Deficiency Detected`}
                  </Heading>
                </HStack>
                <Badge
                  colorScheme={getSeverityColor(recommendation.severity)}
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {Math.round(confidence * 100)}% Confidence
                </Badge>
              </HStack>
              
              <Progress
                value={confidence * 100}
                colorScheme={getStatusColor(prediction)}
                size="sm"
                w="100%"
                borderRadius="full"
              />
            </VStack>
          </CardBody>
        </Card>

        {/* Symptoms Alert */}
        {prediction !== 'healthy' && (
          <Alert
            status="warning"
            variant="left-accent"
            borderRadius="lg"
            bg="orange.50"
          >
            <AlertIcon />
            <Box>
              <AlertTitle>Symptoms</AlertTitle>
              <AlertDescription>{recommendation.symptoms}</AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Recommendations */}
        <Card shadow="lg">
          <CardHeader bg="brand.500" color="white" borderTopRadius="lg">
            <Heading size="md">
              {prediction === 'healthy' ? 'Maintenance Tips' : 'Treatment Recommendations'}
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              {/* Fertilizer Info */}
              <Box>
                <HStack spacing={3} mb={3}>
                  <Icon as={GiChemicalDrop} boxSize={6} color="brand.500" />
                  <Heading size="sm" color="gray.700">
                    Organic Fertilizer
                  </Heading>
                </HStack>
                <Text fontSize="lg" fontWeight="semibold" color="gray.800" ml={9}>
                  {recommendation.organic_fertilizer}
                </Text>
              </Box>

              <Divider />

              {/* Application Details */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <InfoCard
                    icon={FiPackage}
                    label="Form"
                    value={recommendation.form}
                    colorScheme="purple"
                  />
                </GridItem>
                <GridItem>
                  <InfoCard
                    icon={GiPlantRoots}
                    label="Dosage per Plant"
                    value={recommendation.dosage_per_plant}
                    colorScheme="blue"
                  />
                </GridItem>
              </Grid>

              <Divider />

              {/* Environmental Requirements */}
              <Box>
                <Heading size="sm" color="gray.700" mb={4}>
                  Environmental Requirements
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <InfoCard
                      icon={FiSun}
                      label="Sunlight"
                      value={recommendation.sunlight_requirement}
                      colorScheme="yellow"
                    />
                  </GridItem>
                  <GridItem>
                    <InfoCard
                      icon={FiDroplet}
                      label="Humidity"
                      value={recommendation.humidity_requirement}
                      colorScheme="cyan"
                    />
                  </GridItem>
                </Grid>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <HStack spacing={4} justify="center" pt={4}>
          <Button
            leftIcon={<FiRefreshCw />}
            colorScheme="brand"
            size="lg"
            onClick={onReset}
            px={8}
          >
            Analyze Another Plant
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ResultDisplay;
