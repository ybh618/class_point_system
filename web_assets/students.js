document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.getElementById('quickAddModal')
  if (!modalElement) {
    return
  }

  const modal = new bootstrap.Modal(modalElement)
  const studentIdInput = document.getElementById('quickStudentId')
  const studentNameInput = document.getElementById('quickStudentName')

  window.quickAddPoints = (studentId, studentName) => {
    if (studentIdInput) {
      studentIdInput.value = String(studentId)
    }
    if (studentNameInput) {
      studentNameInput.value = studentName
    }
    modal.show()
  }
})
