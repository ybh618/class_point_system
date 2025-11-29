# Design Document: Student Score Trend Page

## Overview

本设计文档描述学生分数趋势子页面的技术实现方案。该功能为现有的排名统计页面添加一个子页面，用于展示单个学生的分数变化趋势，并与班级统计数据（平均分、四分位数）进行对比。

系统采用 Cloudflare Workers + D1 数据库架构，前端使用 Nunjucks 模板渲染，图表使用 Chart.js 库实现。

## Architecture

```mermaid
graph TB
    subgraph Frontend
        A[Rankings Page] -->|Click Student Name| B[Student Trend Page]
        B --> C[Chart.js Line Chart]
        B --> D[Date Filter Form]
    end
    
    subgraph Backend
        E[/rankings/:studentId/trend] --> F[Trend Route Handler]
        F --> G[Fetch Student Data]
        F --> H[Fetch Class Statistics]
        G --> I[(D1 Database)]
        H --> I
    end
    
    B -->|HTTP GET| E
    F -->|JSON/HTML| B
```

## Components and Interfaces

### 1. Route Handler

新增路由 `GET /rankings/:studentId/trend`，处理学生趋势页面请求。

```typescript
// src/routes/rankings.ts (扩展)
interface TrendDataPoint {
  date: string           // ISO date string (YYYY-MM-DD)
  personalPoints: number // 个人累计积分
  classAverage: number   // 班级平均累计积分
  q1: number            // 下四分位数
  median: number        // 中位数
  q3: number            // 上四分位数
}

interface StudentTrendContext {
  student: StudentView
  trendData: TrendDataPoint[]
  startDate?: string
  endDate?: string
}
```

### 2. Data Query Functions

新增数据查询函数用于获取趋势数据：

```typescript
// src/lib/trend_queries.ts
interface DailyPointsRow {
  date: string
  student_id: number
  daily_points: number
}

// 获取班级所有学生的每日积分记录
async function fetchClassDailyPoints(
  db: D1Database, 
  className: string,
  startDate?: string,
  endDate?: string
): Promise<DailyPointsRow[]>

// 计算累计积分和统计数据
function calculateTrendData(
  dailyPoints: DailyPointsRow[],
  targetStudentId: number,
  allStudentIds: number[]
): TrendDataPoint[]

// 计算四分位数
function calculateQuartiles(values: number[]): { q1: number; median: number; q3: number }
```

### 3. Template Component

新增 Nunjucks 模板 `templates/student_trend.html`：

- 学生基本信息卡片
- 日期筛选表单
- Chart.js 折线图容器
- 返回排名页面的导航

### 4. Chart Configuration

使用 Chart.js 配置折线图：

```javascript
const chartConfig = {
  type: 'line',
  data: {
    labels: dates,
    datasets: [
      { label: '个人累计积分', data: personalPoints, borderColor: '#0d6efd' },
      { label: '班级平均分', data: classAverage, borderColor: '#198754' },
      { label: '上四分位数(Q3)', data: q3, borderColor: '#ffc107', borderDash: [5, 5] },
      { label: '中位数', data: median, borderColor: '#6c757d', borderDash: [5, 5] },
      { label: '下四分位数(Q1)', data: q1, borderColor: '#dc3545', borderDash: [5, 5] }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'top' }, tooltip: { mode: 'index' } }
  }
}
```

## Data Models

### Existing Models (Referenced)

```typescript
// 学生表 - students
interface Student {
  id: number
  student_id: string
  name: string
  class_name: string
  group_id: number | null
  created_at: string
}

// 积分记录表 - points_records
interface PointsRecord {
  id: number
  student_id: number
  points: number
  reason: string | null
  category: string
  operator: string | null
  created_at: string
}
```

### New Data Structures

```typescript
// 趋势数据点
interface TrendDataPoint {
  date: string           // 日期 (YYYY-MM-DD)
  personalPoints: number // 个人累计积分
  classAverage: number   // 班级平均累计积分
  q1: number            // 下四分位数
  median: number        // 中位数
  q3: number            // 上四分位数
}

// 每日积分汇总
interface DailyPointsSummary {
  date: string
  studentId: number
  cumulativePoints: number
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the acceptance criteria analysis, the following properties must hold:

### Property 1: Cumulative Points Calculation Correctness

*For any* student with a sequence of points records ordered by date, the cumulative points at each date should equal the sum of all points from records on or before that date.

Formally: For date D, `cumulativePoints(D) = Σ points(r) for all records r where r.date <= D`

**Validates: Requirements 2.2**

### Property 2: Class Average Calculation Correctness

*For any* class with N students at a given date, the class average cumulative points should equal the sum of all students' cumulative points divided by N.

Formally: `classAverage(D) = (Σ cumulativePoints(s, D) for all students s in class) / N`

**Validates: Requirements 3.2**

### Property 3: Quartile Ordering Invariant

*For any* set of cumulative points values at a given date, the quartile values must satisfy the ordering: Q1 ≤ Median ≤ Q3.

Additionally, Q1 should be at the 25th percentile, Median at the 50th percentile, and Q3 at the 75th percentile of the sorted values.

**Validates: Requirements 4.4**

### Property 4: Date Range Filter Correctness

*For any* trend data and date range [startDate, endDate], the filtered result should contain only data points where the date is within the inclusive range.

Formally: For all points p in filtered result, `startDate <= p.date <= endDate`

**Validates: Requirements 6.2**

### Property 5: Student Information Completeness

*For any* valid student, the rendered trend page should contain the student's name, student ID, and class name.

**Validates: Requirements 1.2**

## Error Handling

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Student ID not found | Return 404 page with message "学生不存在" |
| No points records | Display empty state with message "暂无积分记录" |
| Invalid date range (start > end) | Ignore filter and show all data |
| Database query failure | Return 500 error with generic message |
| Class has no other students | Show only personal trend line, average equals personal |

## Testing Strategy

### Property-Based Testing

使用 `fast-check` 库进行属性测试，验证核心计算逻辑的正确性。

**测试配置：**
- 每个属性测试运行至少 100 次迭代
- 使用 `fc.assert` 进行断言
- 测试文件位于 `tests/` 目录

**属性测试覆盖：**

1. **累计积分计算测试** - 生成随机积分记录序列，验证累计计算正确性
2. **班级平均分测试** - 生成随机班级学生数据，验证平均值计算
3. **四分位数测试** - 生成随机数值数组，验证 Q1 ≤ Median ≤ Q3 且计算正确
4. **日期筛选测试** - 生成随机日期范围和数据点，验证筛选结果

**测试标注格式：**
```typescript
// **Feature: student-score-trend, Property 1: Cumulative Points Calculation Correctness**
// **Validates: Requirements 2.2**
```

### Unit Testing

使用 Vitest 进行单元测试：

1. **路由测试** - 验证 `/rankings/:studentId/trend` 路由返回正确响应
2. **边界条件测试** - 空记录、单学生班级、无效日期范围
3. **数据格式测试** - 验证 API 返回的数据结构符合接口定义

### Integration Testing

1. **端到端流程** - 从排名页面点击到趋势页面的完整流程
2. **数据库集成** - 验证 D1 查询返回正确数据
