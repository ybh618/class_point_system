function refreshData() {
  window.location.reload()
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function avatarUrl(studentId, studentName) {
  const params = new URLSearchParams({ name: studentName || String(studentId) })
  return `/avatar/${encodeURIComponent(studentId)}.svg?${params.toString()}`
}

function renderProgressStats(stats) {
  return `
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">
              <i class="bi bi-bar-chart-fill"></i> 进步榜统计
            </h5>
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-3 mb-3">
                <div class="p-3 bg-success text-white rounded">
                  <div class="h4 mb-0">${stats.improved_count}</div>
                  <small>进步学生数</small>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="p-3 bg-danger text-white rounded">
                  <div class="h4 mb-0">${stats.declined_count}</div>
                  <small>退步学生数</small>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="p-3 bg-secondary text-white rounded">
                  <div class="h4 mb-0">${stats.unchanged_count}</div>
                  <small>排名不变</small>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="p-3 bg-primary text-white rounded">
                  <div class="h4 mb-0">${stats.max_improvement}</div>
                  <small>最大进步名次</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderProgressTable(progressRanking, progressAStart, progressAEnd, progressBStart, progressBEnd) {
  if (!progressRanking || progressRanking.length === 0) {
    return `
      <div class="text-center py-5">
        <i class="bi bi-emoji-frown text-muted" style="font-size: 3rem;"></i>
        <p class="text-muted">暂无进步数据</p>
      </div>
    `
  }

  const rowsHtml = progressRanking.map((item, index) => {
    let rowClass = ''
    if (index < 3 && item.rank_change > 0) {
      rowClass = 'table-success'
    } else if (item.rank_change < 0) {
      rowClass = 'table-danger'
    }

    let rankBadge = `<span class="badge bg-secondary">${index + 1}</span>`
    if (index === 0 && item.rank_change > 0) {
      rankBadge = '<i class="bi bi-award-fill text-warning fs-4"></i>'
    } else if (index === 1 && item.rank_change > 0) {
      rankBadge = '<i class="bi bi-award-fill text-secondary fs-4"></i>'
    } else if (index === 2 && item.rank_change > 0) {
      rankBadge = '<i class="bi bi-award-fill fs-4" style="color: #CD7F32;"></i>'
    }

    let changeBadge = '<span class="badge bg-secondary fs-6"><i class="bi bi-dash"></i> 0</span>'
    if (item.rank_change > 0) {
      changeBadge = `<span class="badge bg-success fs-6"><i class="bi bi-arrow-up"></i> +${item.rank_change}</span>`
    } else if (item.rank_change < 0) {
      changeBadge = `<span class="badge bg-danger fs-6"><i class="bi bi-arrow-down"></i> ${item.rank_change}</span>`
    }

    const groupBadge = item.student.group
      ? `<span class="badge" style="background-color: ${item.student.group.color};">${item.student.group.name}</span>`
      : '<span class="text-muted">无</span>'

    return `
      <tr class="${rowClass}">
        <td>${rankBadge}</td>
        <td>
          <div class="d-flex align-items-center">
            <img src="${avatarUrl(item.student.id, item.student.name)}" alt="${item.student.name}" class="avatar me-2" loading="lazy" decoding="async">
            <div>
              <a href="/student/${item.student.id}/trend" class="text-decoration-none">
                <strong>${item.student.name}</strong>
              </a>
            </div>
          </div>
        </td>
        <td>${item.student.class_name}</td>
        <td>${groupBadge}</td>
        <td><span class="badge bg-secondary">第${item.rank_a}名</span></td>
        <td><span class="badge bg-primary">第${item.rank_b}名</span></td>
        <td>${changeBadge}</td>
        <td><span class="badge bg-outline-secondary">${item.points_a}分</span></td>
        <td><span class="badge bg-info">${item.points_b}分</span></td>
      </tr>
    `
  }).join('')

  return `
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-graph-up-arrow text-success"></i> 学生进步排名
            </h5>
            <span class="badge bg-info">
              A区间: ${progressAStart} ~ ${progressAEnd} |
              B区间: ${progressBStart} ~ ${progressBEnd}
            </span>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead class="table-light">
                  <tr>
                    <th width="80">进步排名</th>
                    <th>学生信息</th>
                    <th>班级</th>
                    <th width="100">小组</th>
                    <th width="100">A区间排名</th>
                    <th width="100">B区间排名</th>
                    <th width="120">排名变化</th>
                    <th width="100">A区间积分</th>
                    <th width="100">B区间积分</th>
                  </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

async function loadProgressRanking() {
  const progressAStart = document.getElementById('progress_a_start')?.value || ''
  const progressAEnd = document.getElementById('progress_a_end')?.value || ''
  const progressBStart = document.getElementById('progress_b_start')?.value || ''
  const progressBEnd = document.getElementById('progress_b_end')?.value || ''
  const progressResults = document.getElementById('progressResults')
  const submitBtn = document.getElementById('progressSubmitBtn')

  if (!progressResults || !submitBtn) {
    return
  }

  if (!progressAStart || !progressAEnd || !progressBStart || !progressBEnd) {
    progressResults.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-calendar-range text-muted" style="font-size: 3rem;"></i>
        <p class="text-muted">请选择A区间和B区间的时间范围来计算进步榜</p>
      </div>
    `
    return
  }

  submitBtn.disabled = true
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> 加载中...'
  progressResults.innerHTML = ''

  try {
    const params = new URLSearchParams({
      progress_a_start: progressAStart,
      progress_a_end: progressAEnd,
      progress_b_start: progressBStart,
      progress_b_end: progressBEnd,
    })

    const response = await fetch(`/api/progress-ranking?${params.toString()}`)
    if (!response.ok) {
      throw new Error('request failed')
    }

    const data = await response.json()
    progressResults.innerHTML = renderProgressStats(data.stats)
      + renderProgressTable(
        data.progress_ranking,
        data.progress_a_start,
        data.progress_a_end,
        data.progress_b_start,
        data.progress_b_end
      )

    if (data.progress_ranking?.length) {
      const progressTab = document.getElementById('progress-tab')
      if (progressTab) {
        new bootstrap.Tab(progressTab).show()
      }
    }
  } catch (error) {
    console.error('load progress ranking failed', error)
    progressResults.innerHTML = `
      <div class="alert alert-danger">
        <i class="bi bi-exclamation-triangle"></i> 加载失败，请重试
      </div>
    `
  } finally {
    submitBtn.disabled = false
    submitBtn.innerHTML = '<i class="bi bi-search"></i> 计算进步榜'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date()
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(today.getMonth() - 1)

  const startDate = document.getElementById('start_date')
  const endDate = document.getElementById('end_date')
  if (startDate && !startDate.value) {
    startDate.value = formatDate(oneMonthAgo)
  }
  if (endDate && !endDate.value) {
    endDate.value = formatDate(today)
  }

  const progressForm = document.getElementById('progressForm')
  if (progressForm) {
    progressForm.addEventListener('submit', (event) => {
      event.preventDefault()
      loadProgressRanking()
    })

    progressForm.querySelectorAll('input[type="date"]').forEach((input) => {
      input.addEventListener('change', () => {
        const aStart = document.getElementById('progress_a_start')?.value
        const aEnd = document.getElementById('progress_a_end')?.value
        const bStart = document.getElementById('progress_b_start')?.value
        const bEnd = document.getElementById('progress_b_end')?.value
        if (aStart && aEnd && bStart && bEnd) {
          loadProgressRanking()
        }
      })
    })

    const aStart = document.getElementById('progress_a_start')?.value
    const aEnd = document.getElementById('progress_a_end')?.value
    const bStart = document.getElementById('progress_b_start')?.value
    const bEnd = document.getElementById('progress_b_end')?.value
    if (aStart && aEnd && bStart && bEnd) {
      loadProgressRanking()
    }
  }

  document.querySelectorAll('#rankingTabs button').forEach((tab) => {
    tab.addEventListener('shown.bs.tab', function () {
      const target = document.querySelector(this.dataset.bsTarget)
      target?.classList.add('fade-in')
    })
  })
})

window.refreshData = refreshData
