package xyz.ybhtools.classpoints.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import xyz.ybhtools.classpoints.data.model.*
import xyz.ybhtools.classpoints.data.api.ClassPointsApi
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen() {
    val scope = rememberCoroutineScope()
    var students by remember { mutableStateOf<List<Student>>(emptyList()) }
    var categories by remember { mutableStateOf<List<Category>>(emptyList()) }
    var searchQuery by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(true) }
    var showAddPointsDialog by remember { mutableStateOf<Student?>(null) }

    val api = remember {
        Retrofit.Builder()
            .baseUrl(ClassPointsApi.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ClassPointsApi::class.java)
    }

    // 初始化加载数据
    LaunchedEffect(Unit) {
        try {
            val studentResponse = api.getStudents()
            if (studentResponse.success) {
                students = studentResponse.data ?: emptyList()
            }
            val categoryResponse = api.getCategories()
            if (categoryResponse.success) {
                categories = categoryResponse.data ?: emptyList()
            }
        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            isLoading = false
        }
    }

    val filteredStudents = students.filter {
        it.name.contains(searchQuery, ignoreCase = true) || 
        it.student_id.contains(searchQuery, ignoreCase = true)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("班级积分系统") },
                actions = {
                    OutlinedTextField(
                        value = searchQuery,
                        onValueChange = { searchQuery = it },
                        placeholder = { Text("搜索学生...") },
                        modifier = Modifier.width(150.dp).padding(4.dp),
                        singleLine = true,
                        leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) }
                    )
                }
            )
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding).fillMaxSize()) {
            if (isLoading) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            } else {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(filteredStudents) { student ->
                        StudentItem(student = student) {
                            showAddPointsDialog = student
                        }
                    }
                }
            }
        }
    }

    // 加分对话框
    showAddPointsDialog?.let { student ->
        AddPointsDialog(
            student = student,
            categories = categories,
            onDismiss = { showAddPointsDialog = null },
            onConfirm = { points, category ->
                scope.launch {
                    try {
                        val response = api.addPoints(
                            AddPointsRequest(
                                student_id = student.id,
                                points = points,
                                category = category
                            )
                        )
                        if (response.success) {
                            // 刷新数据（简化逻辑：直接再次请求）
                            val updated = api.getStudents()
                            if (updated.success) students = updated.data ?: emptyList()
                        }
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                    showAddPointsDialog = null
                }
            }
        )
    }
}

@Composable
fun StudentItem(student: Student, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(text = student.name, style = MaterialTheme.typography.titleMedium)
                Text(text = "学号: ${student.student_id}", style = MaterialTheme.typography.bodySmall)
                student.group?.let {
                    Text(
                        text = it.name,
                        color = Color(android.graphics.Color.parseColor(it.color)),
                        style = MaterialTheme.typography.labelSmall
                    )
                }
            }
            Text(
                text = "${student.total_points}",
                style = MaterialTheme.typography.headlineSmall,
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}

@Composable
fun AddPointsDialog(
    student: Student,
    categories: List<Category>,
    onDismiss: () -> Unit,
    onConfirm: (Int, String) -> Unit
) {
    var selectedCategory by remember { mutableStateOf(categories.firstOrNull()?.name ?: "") }
    var points by remember { mutableStateOf(categories.firstOrNull()?.default_points?.toString() ?: "0") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("为 ${student.name} 记分") },
        text = {
            Column {
                Text("选择类别:")
                categories.forEach { category ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { 
                                selectedCategory = category.name
                                points = category.default_points.toString()
                            }
                            .padding(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = selectedCategory == category.name,
                            onClick = null
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(category.name)
                    }
                }
                Spacer(modifier = Modifier.height(16.dp))
                OutlinedTextField(
                    value = points,
                    onValueChange = { points = it },
                    label = { Text("分数 (正加负减)") },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(onClick = { onConfirm(points.toIntOrNull() ?: 0, selectedCategory) }) {
                Text("确定")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("取消")
            }
        }
    )
}
