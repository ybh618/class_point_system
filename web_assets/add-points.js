document.addEventListener('DOMContentLoaded', () => {
  const page = document.getElementById('addPointsPage')
  if (!page) {
    return
  }

  const submitUrl = page.dataset.submitUrl || '/points/add'
  const selectedStudents = new Set()
  let currentFilter = 'all'
  let selectedLetter = null

  function getMobileOpsModal() {
    const element = document.getElementById('mobileOpsModal')
    return element ? bootstrap.Modal.getOrCreateInstance(element) : null
  }

  function getFirstLetter(name) {
    const normalized = (name || '').trim()
    if (!normalized) {
      return '#'
    }
    const first = normalized.charAt(0)
    return /[A-Za-z]/.test(first) ? first.toUpperCase() : '#'
  }

  function getSelectedStudentsArray() {
    return Array.from(selectedStudents)
  }

  function updateSelectedInfo() {
    const count = selectedStudents.size
    const selectedCount = document.getElementById('selectedCount')
    const mobileSelectedCount = document.getElementById('mobileSelectedCount')
    const modalSelectedCount = document.getElementById('modalSelectedCountDisp')

    if (selectedCount) {
      selectedCount.textContent = String(count)
    }
    if (mobileSelectedCount) {
      mobileSelectedCount.textContent = String(count)
    }
    if (modalSelectedCount) {
      modalSelectedCount.textContent = String(count)
    }
  }

  function syncSelection(card, checked) {
    const checkbox = card.querySelector('.student-checkbox')
    if (!checkbox) {
      return
    }
    checkbox.checked = checked
    if (checked) {
      selectedStudents.add(checkbox.value)
      card.classList.add('selected')
    } else {
      selectedStudents.delete(checkbox.value)
      card.classList.remove('selected')
    }
  }

  function applyLetterFilter() {
    const cards = document.querySelectorAll('.student-card-wrapper')
    const sections = document.querySelectorAll('.group-section')

    cards.forEach((card) => {
      const firstLetter = getFirstLetter(card.dataset.studentName || '')
      const matchLetter = selectedLetter === null || firstLetter === selectedLetter
      const groupId = card.dataset.groupId || ''
      const matchGroup = currentFilter === 'all'
        || (currentFilter === 'grouped' && groupId && groupId !== 'ungrouped')
        || (currentFilter === 'ungrouped' && (!groupId || groupId === 'ungrouped'))

      card.style.display = matchLetter && matchGroup ? '' : 'none'
    })

    sections.forEach((section) => {
      const visibleCount = section.querySelectorAll('.student-card-wrapper:not([style*="display: none"])').length
      section.style.display = visibleCount > 0 ? '' : 'none'
    })
  }

  function showNotification(message, type = 'success') {
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
    window.setTimeout(() => notification.remove(), 3000)
  }

  function updateStudentPoints(studentId, newPoints) {
    const wrapper = document.querySelector(`[data-student-id="${studentId}"]`)
    if (!wrapper) {
      return
    }
    const pointsValue = wrapper.querySelector('.points-value')
    if (pointsValue) {
      pointsValue.textContent = String(newPoints)
    }
  }

  function addPointsAnimation(studentId, points) {
    const wrapper = document.querySelector(`[data-student-id="${studentId}"]`)
    const pointsValue = wrapper?.querySelector('.points-value')
    if (!pointsValue) {
      return
    }
    const animationClass = points > 0 ? 'points-animation' : 'points-negative-animation'
    pointsValue.classList.add(animationClass)
    window.setTimeout(() => {
      pointsValue.classList.remove('points-animation', 'points-negative-animation')
    }, 600)
  }

  function submitPoints(studentId, points, category, reason, operator = '', callback) {
    const formData = new FormData()
    formData.append('student_id', studentId)
    formData.append('points', String(points))
    formData.append('category', category)
    formData.append('reason', reason)
    if (operator) {
      formData.append('operator', operator)
    }

    fetch(submitUrl, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateStudentPoints(studentId, data.new_total_points)
          addPointsAnimation(studentId, points)
        } else {
          showNotification(data.message || '录入失败', 'error')
        }
        if (callback) {
          callback(Boolean(data.success))
        }
      })
      .catch((error) => {
        console.error('submit points failed', error)
        showNotification('网络错误，请重试', 'error')
        if (callback) {
          callback(false)
        }
      })
  }

  function clearSelections() {
    document.querySelectorAll('.student-card').forEach((card) => syncSelection(card, false))
    updateSelectedInfo()
  }

  function batchSubmitPoints(studentIds, actualPoints, category, reason, isAdd) {
    let completed = 0
    studentIds.forEach((studentId) => {
      submitPoints(studentId, actualPoints, category, reason, '', () => {
        completed += 1
        if (completed === studentIds.length) {
          clearSelections()
          showNotification(`成功为${studentIds.length}名学生${isAdd ? '加分' : '扣分'} ${Math.abs(actualPoints)}分`)
        }
      })
    })
  }

  function applyMobileQuickOperation(isAdd) {
    const points = Number.parseInt(document.getElementById('mobileCustomPoints')?.value || '0', 10) || 0
    const category = document.getElementById('mobileQuickCategory')?.value || '自定义'
    const reason = document.getElementById('mobileQuickReason')?.value || (isAdd ? '自定义加分' : '自定义扣分')

    if (points === 0) {
      showNotification('请先设定积分值', 'error')
      return
    }

    if (selectedStudents.size === 0) {
      showNotification('请先选择学生', 'error')
      return
    }

    getMobileOpsModal()?.hide()
    batchSubmitPoints(getSelectedStudentsArray(), isAdd ? Math.abs(points) : -Math.abs(points), category, reason, isAdd)
  }

  document.getElementById('setCustomPoints')?.addEventListener('click', () => {
    const points = Number.parseInt(document.getElementById('customPointsValue')?.value || '0', 10) || 0
    if (points !== 0) {
      showNotification(`已设定积分值：${points > 0 ? '+' : ''}${points}分`)
    }
  })

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter || 'all'
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'))
      button.classList.add('active')
      applyLetterFilter()
    })
  })

  document.getElementById('selectAllBtn')?.addEventListener('click', () => {
    document.querySelectorAll('.student-card-wrapper:not([style*="display: none"]) .student-card').forEach((card) => {
      syncSelection(card, true)
    })
    updateSelectedInfo()
  })

  document.getElementById('clearAllBtn')?.addEventListener('click', clearSelections)

  const alphabetIndex = document.getElementById('alphabetIndex')
  alphabetIndex?.querySelectorAll('.alphabet-letter').forEach((button) => {
    button.addEventListener('click', () => {
      const letter = button.dataset.letter || null
      selectedLetter = selectedLetter === letter ? null : letter
      alphabetIndex.querySelectorAll('.alphabet-letter').forEach((item) => {
        item.classList.toggle('active', item.dataset.letter === selectedLetter)
      })
      applyLetterFilter()
    })
  })

  document.getElementById('mobileQuickAddBtn')?.addEventListener('click', () => applyMobileQuickOperation(true))
  document.getElementById('mobileQuickMinusBtn')?.addEventListener('click', () => applyMobileQuickOperation(false))

  document.getElementById('quickAddBtn')?.addEventListener('click', () => {
    const points = Number.parseInt(document.getElementById('customPointsValue')?.value || '0', 10) || 0
    const category = document.getElementById('quickCategory')?.value || '自定义'
    const reason = document.getElementById('quickReason')?.value || '自定义加分'
    if (points === 0 || selectedStudents.size === 0) {
      showNotification(points === 0 ? '请设定积分值' : '请先选择学生', 'error')
      return
    }
    batchSubmitPoints(getSelectedStudentsArray(), Math.abs(points), category, reason, true)
  })

  document.getElementById('quickMinusBtn')?.addEventListener('click', () => {
    const points = Number.parseInt(document.getElementById('customPointsValue')?.value || '0', 10) || 0
    const category = document.getElementById('quickCategory')?.value || '自定义'
    const reason = document.getElementById('quickReason')?.value || '自定义扣分'
    if (points === 0 || selectedStudents.size === 0) {
      showNotification(points === 0 ? '请设定积分值' : '请先选择学生', 'error')
      return
    }
    batchSubmitPoints(getSelectedStudentsArray(), -Math.abs(points), category, reason, false)
  })

  page.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) {
      return
    }

    const groupSelectButton = target.closest('.group-select-all')
    if (groupSelectButton instanceof HTMLElement) {
      const groupId = groupSelectButton.dataset.groupId
      const selector = groupId === 'ungrouped'
        ? '.student-card-wrapper[data-group-id=""] .student-card'
        : `.student-card-wrapper[data-group-id="${groupId}"] .student-card`
      document.querySelectorAll(selector).forEach((card) => syncSelection(card, true))
      updateSelectedInfo()
      return
    }

    const card = target.closest('.student-card')
    if (!(card instanceof HTMLElement) || !page.contains(card)) {
      return
    }
    if (target.closest('.student-checkbox')) {
      return
    }
    const checkbox = card.querySelector('.student-checkbox')
    if (!checkbox) {
      return
    }
    syncSelection(card, !checkbox.checked)
    updateSelectedInfo()
  })
})
