import api from "./api";

class StudentService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://skillify-backend-7pex.onrender.com/api/admin";
  }

  async getStudentDetails(page = 1, limit = 5) {
    try {
      return await this.api.get(
        `${this.baseUrl}/get-student-details?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(studentId) {
    try {
      return await this.api.delete(
        `${this.baseUrl}/delete-student/${studentId}`,
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

let studentService = new StudentService();

export default studentService;
