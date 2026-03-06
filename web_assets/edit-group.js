document.addEventListener('DOMContentLoaded', () => {
  const colorInput = document.getElementById('color')
  const modalElement = document.getElementById('addStudentModal')
  const selectAll = document.getElementById('selectAll')
  const selectedCount = document.getElementById('selectedCount')
  const addSelectedBtn = document.getElementById('addSelectedBtn')
  const checkboxes = Array.from(document.querySelectorAll('.student-checkbox'))
  const modal = modalElement ? new bootstrap.Modal(modalElement) : null

  const updateSelectedCount = () => {
    const count = checkboxes.filter((checkbox) => checkbox.checked).length
    if (selectedCount) {
      selectedCount.textContent = String(count)
    }
    if (addSelectedBtn) {
      addSelectedBtn.disabled = count === 0
    }
  }

  const toggleSelectAll = () => {
    const checked = Boolean(selectAll?.checked)
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked
    })
    updateSelectedCount()
  }

  if (selectAll) {
    selectAll.addEventListener('change', toggleSelectAll)
  }
  checkboxes.forEach((checkbox) => checkbox.addEventListener('change', updateSelectedCount))
  updateSelectedCount()

  window.setColor = (color) => {
    if (colorInput) {
      colorInput.value = color
    }
  }

  window.showAddStudentModal = () => {
    modal?.show()
  }
})
