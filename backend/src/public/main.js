window.onload = function () {
    console.log('Script đang chạy...');
  fetch('/messages')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('messageList');
      list.innerHTML = '';

      data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${item.name}</strong>: ${item.message}`;
        list.appendChild(div);
      });
    })
    .catch(err => console.error('Lỗi khi tải tin nhắn:', err));
};

// Xử lý nút Sửa
document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('.message-item');
    const editForm = container.querySelector('.edit-form');
    const messageText = container.querySelector('.message-text');

    editForm.style.display = 'block';
    messageText.style.display = 'none';
    button.style.display = 'none';
  });
});

// Xử lý nút Hủy
document.querySelectorAll('.cancel-btn').forEach(button => {
  button.addEventListener('click', () => {
    const form = button.closest('.edit-form');
    const container = button.closest('.message-item');
    const messageText = container.querySelector('.message-text');
    const editBtn = container.querySelector('.edit-btn');

    form.style.display = 'none';
    messageText.style.display = 'inline';
    editBtn.style.display = 'inline';
  });
});
