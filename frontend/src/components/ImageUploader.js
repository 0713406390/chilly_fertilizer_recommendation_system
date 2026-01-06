import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  VStack,
  Image,
  Text,
  useToast,
  Card,
  CardBody,
  Spinner,
  Icon,
} from '@chakra-ui/react';
import { FiUpload, FiImage } from 'react-icons/fi';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const ImageUploader = ({ onPrediction, loading, setLoading }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an image file',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast({
        title: 'No image selected',
        description: 'Please select an image first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        onPrediction(response.data);
        toast({
          title: 'Analysis Complete',
          description: 'Plant analysis successful!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to analyze image. Please make sure the backend is running.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card maxW="600px" w="100%" shadow="lg">
      <CardBody>
        <VStack spacing={6}>
          <Box
            w="100%"
            h="400px"
            border="2px dashed"
            borderColor={preview ? 'brand.500' : 'gray.300'}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={preview ? 'white' : 'gray.50'}
            cursor="pointer"
            onClick={() => fileInputRef.current?.click()}
            transition="all 0.3s"
            _hover={{
              borderColor: 'brand.500',
              bg: 'gray.100',
            }}
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                maxH="100%"
                maxW="100%"
                objectFit="contain"
                borderRadius="md"
              />
            ) : (
              <VStack spacing={4}>
                <Icon as={FiImage} boxSize={16} color="gray.400" />
                <Text color="gray.500" fontSize="lg">
                  Click to upload plant image
                </Text>
                <Text color="gray.400" fontSize="sm">
                  or drag and drop
                </Text>
              </VStack>
            )}
          </Box>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />

          <VStack w="100%" spacing={3}>
            {preview && (
              <>
                <Button
                  leftIcon={loading ? <Spinner size="sm" /> : <FiUpload />}
                  colorScheme="brand"
                  size="lg"
                  w="100%"
                  onClick={handleUpload}
                  isLoading={loading}
                  loadingText="Analyzing..."
                >
                  Analyze Plant
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  w="100%"
                  onClick={handleReset}
                  isDisabled={loading}
                >
                  Choose Different Image
                </Button>
              </>
            )}
            {!preview && (
              <Button
                leftIcon={<FiImage />}
                colorScheme="brand"
                size="lg"
                w="100%"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image
              </Button>
            )}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ImageUploader;
