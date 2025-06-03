import api from "./api";

class InstructorService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://skillify-backend-7pex.onrender.com/api/admin";
  }

  async getInstructorDetails(page = 1, limit = 5) {
    try {
      return await this.api.get(
        `${this.baseUrl}/get-instructor-details?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteInstructor(instructorId) {
    try {
      return await this.api.delete(
        `${this.baseUrl}/delete-instructor/${instructorId}`
      ,{withCredentials: true});
    } catch (error) {
      throw error;
    }
  }
}

let instructorService = new InstructorService();

export default instructorService;
