document.addEventListener('DOMContentLoaded', () => {
  const page = document.getElementById('importPointsPage')
  const form = document.getElementById('importForm')
  const submitBtn = document.getElementById('submitBtn')
  const importStatus = document.getElementById('importStatus')
  const importProgress = document.getElementById('importProgress')
  const totalCount = document.getElementById('totalCount')
  const successCount = document.getElementById('successCount')
  const failedCount = document.getElementById('failedCount')
  const importResults = document.getElementById('importResults')
  const resultsTable = document.getElementById('resultsTable')

  if (!page || !(form instanceof HTMLFormElement) || !submitBtn) {
    return
  }

  const submitUrl = page.dataset.submitUrl || '/points/import'

  const showNotification = (message, type = 'success') => {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger'
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'
    const notification = document.createElement('div')
    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`
    notification.style.zIndex = '9999'
    notification.innerHTML = `
      <i class="bi ${icon}"></i> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `
    document.body.appendChild(notification)
    window.setTimeout(() => notification.remove(), 5000)
  }

  const renderFailedTable = (failedRecords) => {
    const rows = failedRecords.map((record) => `
      <tr>
        <td>${record.name}</td>
        <td>${record.points}</td>
        <td class="text-danger">${record.error}</td>
      </tr>
    `).join('')

    return `
      <h6 class="text-danger">失败记录（${failedRecords.length}条）：</h6>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
          <thead class="table-light">
            <tr>
              <th>姓名</th>
              <th>分数</th>
              <th>失败原因</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(form)

    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> 导入中...'

    if (importStatus) {
      importStatus.textContent = '正在导入...'
      importStatus.className = 'text-warning'
    }
    if (importProgress) {
      importProgress.style.width = '0%'
    }
    if (totalCount) {
      totalCount.textContent = '0'
    }
    if (successCount) {
      successCount.textContent = '0'
    }
    if (failedCount) {
      failedCount.textContent = '0'
    }
    if (importResults) {
      importResults.style.display = 'none'
    }

    try {
      const response = await fetch(submitUrl, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || '导入失败，请检查文件格式')
      }

      const total = data.total_records || 0
      const success = data.success_count || 0
      const failed = data.failed_count || 0
      const progress = total > 0 ? Math.round((success / total) * 100) : 100

      if (totalCount) {
        totalCount.textContent = String(total)
      }
      if (successCount) {
        successCount.textContent = String(success)
      }
      if (failedCount) {
        failedCount.textContent = String(failed)
      }
      if (importProgress) {
        importProgress.style.width = `${progress}%`
      }

      if (data.failed_records?.length) {
        if (importStatus) {
          importStatus.textContent = '导入完成（有部分失败）'
          importStatus.className = 'text-warning'
        }
        if (resultsTable) {
          resultsTable.innerHTML = renderFailedTable(data.failed_records)
        }
        if (importResults) {
          importResults.style.display = 'block'
        }
      } else {
        if (importStatus) {
          importStatus.textContent = '导入成功'
          importStatus.className = 'text-success'
        }
        if (importProgress) {
          importProgress.style.width = '100%'
        }
      }

      showNotification(`导入完成！成功 ${success} 条，失败 ${failed} 条`)
    } catch (error) {
      console.error('import points failed', error)
      if (importStatus) {
        importStatus.textContent = '导入失败'
        importStatus.className = 'text-danger'
      }
      showNotification(error instanceof Error ? error.message : '网络错误，请重试', 'error')
    } finally {
      submitBtn.disabled = false
      submitBtn.innerHTML = '<i class="bi bi-upload"></i> 开始导入'
    }
  })
})
