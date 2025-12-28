package xyz.ybhtools.classpoints.data.api

import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import xyz.ybhtools.classpoints.data.model.*

interface ClassPointsApi {
    @GET("api/v1/students")
    suspend fun getStudents(): ApiResponse<List<Student>>

    @GET("api/v1/groups")
    suspend fun getGroups(): ApiResponse<List<Group>>

    @GET("api/v1/categories")
    suspend fun getCategories(): ApiResponse<List<Category>>

    @POST("api/v1/points/add")
    suspend fun addPoints(@Body request: AddPointsRequest): ApiResponse<Unit>

    companion object {
        const val BASE_URL = "https://class.ybhtools.xyz/"
    }
}
