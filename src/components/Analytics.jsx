import { useQuery } from '@tanstack/react-query'
import React from 'react'
import analyticsService from '../services/Analytics'

const Analytics = () => {
    let {data: userRegisterationAnalytics} = useQuery({
      queryKey: ["fetchUserRegisterationsAnalytics"],
      queryFn: async function() {
        try {
          let res = await analyticsService.getUserRegisterationAnalytics()
          return res.data
        } catch (error) {
          console.log(error?.response?.data?.message)
          return false
        }
      }
    })
  
    let {data: userRoleAnalytics} = useQuery({
      queryKey: ["fetchUserRoleAnalytics"],
      queryFn: async function() {
        try {
          let res = await analyticsService.getUserRolesAnalytics()

          return res.data
        } catch (error) {
          console.log(error?.response?.data?.message)
          return false
        }
      }
    })

    let {data: courseEnrollmentAnalytics} = useQuery({
      queryKey: ["fetchCourseEnrollments"],
      queryFn: async function() {
        try {
          let res = await analyticsService.getCourseEnrollmentAnalytics()

          return res.data
        } catch (error) {
          console.log(error?.response?.data?.message)
          return false
        }
      }
    })

    let {data: courseRatingsAnalytics} = useQuery({
      queryKey: ["fetchCourseRatingAnalytics"],
      queryFn: async function() {
        try {
          let res = await analyticsService.getCourseRatingsAnalytics()

          return res.data
        } catch (error) {
          console.log(error?.response?.data?.message)
          return false
        }
      }
    })

    let {data: orderRevenueAnalytics} = useQuery({
      queryKey: ["fetchOrderRevenue"],
      queryFn: async function() {
        try {
          let res = await analyticsService.getOrderRevenue()

          return res.data
        } catch (error) {
          console.log(error?.response?.data?.message)

          return false
        }
      }
    })

    

    return (
      <div>Analytics</div>
    )
}

export default Analytics