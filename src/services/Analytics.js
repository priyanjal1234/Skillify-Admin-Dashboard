import api from "./api";

class AnalyticsService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://skillify-backend-7pex.onrender.com/api/admin";
  }

  async getUserRegisterationAnalytics(startDate, endDate) {
    try {
      return await this.api.get(
        `${this.baseUrl}/analytics/users/registrations?startDate=${new Date(
          startDate
        )}&endDate=${new Date(endDate)}`,
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserRolesAnalytics() {
    try {
      return await this.api.get(`${this.baseUrl}/analytics/user/roles`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getCourseEnrollmentAnalytics() {
    try {
      return await this.api.get(
        `${this.baseUrl}/analytics/course/enrollments`,
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getCourseRatingsAnalytics() {
    try {
      return await this.api.get(`${this.baseUrl}/analytics/course/ratings`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getOrderRevenue(startDate, endDate) {
    try {
      return await this.api.get(
        `${this.baseUrl}/analytics/orders/revenue?startDate=${new Date(
          startDate
        )}&endDate=${new Date(endDate)}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

let analyticsService = new AnalyticsService();

export default analyticsService;
