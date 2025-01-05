// script.js

// Form ve liste elemanlarını seçiyoruz
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Form gönderildiğinde çalışır
taskForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTask(taskText); // Yeni görev ekler
        taskInput.value = ""; // Giriş alanını temizler
    }
});

// Yeni görev ekleme fonksiyonu
function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Tamamla butonu
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // Sil butonu
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", function () {
        li.remove(); // Görevi listeden kaldırır
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
