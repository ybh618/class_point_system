document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.getElementById('recordDetailModal')
  const contentElement = document.getElementById('recordDetailContent')
  if (!modalElement || !contentElement) {
    return
  }

  const modal = new bootstrap.Modal(modalElement)

  window.showRecordDetail = async (recordId) => {
    try {
      const response = await fetch(`/api/record/${recordId}`)
      const record = await response.json()
      const pointsClass = record.points >= 0 ? 'points-positive' : 'points-negative'
      const pointsSign = record.points >= 0 ? '+' : ''

      contentElement.innerHTML = `
        <div class="row">
          <div class="col-sm-4"><strong>学生姓名：</strong></div>
          <div class="col-sm-8">${record.student_name}</div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-4"><strong>班级：</strong></div>
          <div class="col-sm-8">${record.class_name}</div>
        </div>
        <hr>
        <div class="row mt-2">
          <div class="col-sm-4"><strong>积分：</strong></div>
          <div class="col-sm-8"><span class="${pointsClass}">${pointsSign}${record.points}</span></div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-4"><strong>类别：</strong></div>
          <div class="col-sm-8">${record.category}</div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-4"><strong>事由：</strong></div>
          <div class="col-sm-8">${record.reason}</div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-4"><strong>操作人：</strong></div>
          <div class="col-sm-8">${record.operator}</div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-4"><strong>记录时间：</strong></div>
          <div class="col-sm-8">${record.created_at}</div>
        </div>
      `

      modal.show()
    } catch (error) {
      console.error('load record detail failed', error)
      window.alert('获取记录详情失败，请稍后重试')
    }
  }
})
