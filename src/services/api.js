import axios from 'axios';

const API_URL = 'https://6d3f2w70e4.execute-api.ap-south-1.amazonaws.com/prod/telemetry';

export const fetchTelemetryData = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 5000,
      headers: {
        'Accept': 'application/json'
      }
    });

    // Return exact data from API Gateway / DynamoDB database
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('API Gateway fetch error:', error);
    return [];
  }
};
