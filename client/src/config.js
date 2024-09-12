import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is installed

// Function to get the token from localStorage and decode it
export const getStudentIdFromToken = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Token is not found, handle this case as needed
    console.warn('No token found in localStorage');
    return null; // Or handle this as needed
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    return decodedToken.userId; // Extract studentId from the decoded token
  } catch (error) {
    console.error('Error decoding token:', error);
    // Handle the error accordingly, maybe return null or redirect to login
    return null; // Or handle this as needed
  }
};

// Example usage
const studentId = getStudentIdFromToken();
export default studentId;
