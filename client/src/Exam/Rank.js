// rankStudents.js
import studentId from "../config";
// Function to fetch data and rank students by section, then find a specific student by ID
const id = studentId;
export async function fetchAndRankStudentBySection(id) {
    try {
      const response = await fetch('http://localhost:5000/api/examresults/getExamResultByClassAndSection/class/10th/section/Rose');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Extract the first exam (assuming there's only one in the response)
      const exam = data[0];
  
      // Calculate total scores for each student
      exam.students.forEach(student => {
        student.totalScore = student.scores.reduce((sum, score) => sum + score.score, 0);
      });
  
      // Sort students by totalScore in descending order
      exam.students.sort((a, b) => b.totalScore - a.totalScore);
  
      // Assign ranks
      exam.students.forEach((student, index) => {
        student.rank = index + 1;
      });
  
      // Find and return the specific student by ID
      const student = exam.students.find(student => student.studentId === studentId);
      if (student) {
        return {
          studentName: student.studentName,
          rank: student.rank
        };
      } else {
        return null; // Student not found
      }
  
    } catch (error) {
      console.error('Error:', error);
      return null; // or {} if you prefer
    }
  }
  
  // Function to fetch data and rank students by class, then find a specific student by ID
  export async function fetchAndRankStudentByClass(id) {
    try {
      const response = await fetch('http://localhost:5000/api/examresults/getExamResultByClass/class/10th');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Aggregate students by class
      const classes = {};
  
      data.forEach(exam => {
        exam.students.forEach(student => {
          const { className } = exam;
          if (!classes[className]) {
            classes[className] = [];
          }
  
          // Calculate total score for each student
          student.totalScore = student.scores.reduce((sum, score) => sum + score.score, 0);
  
          // Add student to the class
          classes[className].push(student);
        });
      });
  
      // Find and return the specific student by ID for each class
      const classRanks = {};
  
      Object.keys(classes).forEach(className => {
        const students = classes[className];
  
        // Sort students by totalScore in descending order
        students.sort((a, b) => b.totalScore - a.totalScore);
  
        // Assign ranks
        students.forEach((student, index) => {
          student.rank = index + 1;
        });
  
        // Find and return the specific student by ID
        const student = students.find(student => student.studentId === studentId);
        if (student) {
          classRanks[className] = {
            studentName: student.studentName,
            rank: student.rank
          };
        }
      });
  
      return classRanks;
  
    } catch (error) {
      console.error('Error:', error);
      return {}; // or null if you prefer
    }
  }
  