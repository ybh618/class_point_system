document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name')
  const classInput = document.getElementById('class_name')
  const colorInput = document.getElementById('color')
  const preview = document.getElementById('preview')
  const previewName = document.getElementById('previewName')
  const previewClass = document.getElementById('previewClass')
  const previewIcon = preview?.querySelector('i')

  if (!nameInput || !classInput || !colorInput || !preview || !previewName || !previewClass || !previewIcon) {
    return
  }

  const updatePreview = () => {
    const name = nameInput.value || '小组名称'
    const className = classInput.value || '班级名称'
    const color = colorInput.value
    previewName.textContent = name
    previewClass.textContent = className
    preview.style.backgroundColor = `${color}20`
    preview.style.borderLeftColor = color
    previewIcon.style.color = color
  }

  nameInput.addEventListener('input', updatePreview)
  classInput.addEventListener('input', updatePreview)
  colorInput.addEventListener('change', updatePreview)

  window.setColor = (color) => {
    colorInput.value = color
    colorInput.dispatchEvent(new Event('change'))
  }
})
