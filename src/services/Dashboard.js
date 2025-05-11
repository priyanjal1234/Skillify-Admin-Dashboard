import api from "./api";

class DashboardService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://skillify-lms-backend.onrender.com/api/admin";
  }

  async getDashboardDetails() {
    try {
      return await this.api.get(`${this.baseUrl}/get-dashboard-details`, {
        withCredentials: true,
      });
    } catch (error) {
        throw error
    }
  }
}

let dashboardService = new DashboardService()

export default dashboardService
