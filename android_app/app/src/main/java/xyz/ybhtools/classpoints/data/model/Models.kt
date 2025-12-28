package xyz.ybhtools.classpoints.data.model

data class Student(
    val id: Int,
    val name: String,
    val student_id: String,
    val class_name: String,
    val total_points: Int = 0,
    val week_points: Int = 0,
    val group_id: Int? = null,
    val group: GroupInfo? = null
)

data class GroupInfo(
    val id: Int,
    val name: String,
    val color: String
)

data class Group(
    val id: Int,
    val name: String,
    val color: String,
    val students: List<Student> = emptyList()
)

data class Category(
    val name: String,
    val default_points: Int
)

data class ApiResponse<T>(
    val success: Boolean,
    val data: T?,
    val message: String? = null
)

data class AddPointsRequest(
    val student_id: Int,
    val points: Int,
    val category: String,
    val reason: String? = null,
    val operator: String? = "Android App"
)
